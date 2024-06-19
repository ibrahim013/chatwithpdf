import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from '@pinecone-database/doc-splitter'
import { getEmbeddings } from './embeddings';
import md5 from 'md5';
import { convertToAscii } from './utils';


const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

type PDFPage = {
    pageContent: string,
    metadata: {
        loc: {
            pageNumber: number
        }
    }
}
export async function loadS3IntoPineconeDB(fileKey: string) {
    console.log("downloading s3 into file system......")
    // 1. Download the pdf from server
    const file_name = await downloadFromS3(fileKey)
    if (!file_name) {
        throw new Error("could not download file from s3");
    }

    const loader = new PDFLoader(file_name)
    const pages = (await loader.load()) as PDFPage[]

    // 2. split and segment the pdf
    const documents = await Promise.all(pages.map(prepareDocument))

    // 3. vectorise and embed individual documents
    const vectors = await Promise.all(documents.flat().map(embedDocument))

    // 4. upload to pinecone db
    if (vectors) {
        const client = await pc
        const pineconeIndex = client.Index('chart-with-pdf')
        console.log('inserting doc into pinecone')
        const nameSpace = convertToAscii(fileKey)

        await pineconeIndex.namespace(nameSpace).upsert(vectors as Vector[])
    }


    return documents[0]

}


type Vector = {
    id: string,
    values: number[],
    metadata: {
        text: string,
        pageNumber: number
    }
}
async function embedDocument(doc: Document) {
    try {
        const embeddings = await getEmbeddings(doc.pageContent)
        const hash = md5(doc.pageContent)

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber
            }
        } as Vector
    } catch (error) {
        console.log(error)
    }
}


export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder()
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes))
}

async function prepareDocument(page: PDFPage) {
    let { pageContent, metadata } = page
    pageContent = pageContent.replace(/\n/g, "")
    const splitter = new RecursiveCharacterTextSplitter()
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
            }
        })
    ])
    return docs;
}