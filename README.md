### ChatWithPDF
ChatWithPDF is an innovative web application designed to facilitate seamless interactions with PDF documents. Leveraging state-of-the-art technologies, it allows users to query and extract information from PDFs efficiently. The project is built on the concept of Retrieval-Augmented Generation (RAG), ensuring accurate and contextually relevant responses.

### Features
Query PDFs: Ask questions and get precise answers from your PDF documents.  
Authentication: Secure user login and registration using Kinle Auth.  
Database Management: Efficient data handling with DrizzleORM and Neon DB.  
Cloud Storage: Robust and scalable storage solutions powered by AWS.  
Vector Database: Enhanced search and retrieval capabilities with Pinecone DB.  
AI Integration: Natural language understanding and generation through Open AI.  



### Technologies Used
Next.js: React framework for building server-side rendering and static web applications.  
Kinle Auth: Authentication solution for secure user management.  
DrizzleORM: Type-safe ORM for Node.js and TypeScript.  
Neon DB: Scalable and high-performance database solution.  
AWS: Cloud storage and computing services for data and application hosting.  
Pinecone DB: Vector database for efficient similarity search and retrieval.  
LangChain: Loading and reading loaded PDFs.  
Open AI: AI-powered natural language processing and generation.  
Vercel SDK: Tools and services for optimal deployment and performance.  

### Getting Started

# Prerequisites
Node.js (v14 or higher)
npm or yarn
AWS account
Open AI API key
Vercel account

### Installation

Clone the repository:

```git clone https://github.com/your-username/chatwithpdf.git
cd chatwithpdf

Install dependencies:
npm install
# or
yarn install 
```
# Set up environment variables:
Create a .env file in the root directory and add the following variables:

env
```
NEXT_PUBLIC_KINLE_AUTH_API_KEY=your_kinle_auth_api_key
NEXT_PUBLIC_NEON_DB_URL=your_neon_db_url
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
NEXT_PUBLIC_PINECONE_API_KEY=your_pinecone_api_key
OPENAI_API_KEY=your_openai_api_key 
```

### Run the development server:

```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 with your browser to see the result.

### Deployment

Deploy your project on Vercel with a single command:

`vercel`

### License
This project is licensed under the MIT License. See the LICENSE file for details.


