# easy-loan
The Easy Loan website is a simple loan management system that facilitates the loan application process for users. 
It allows customers to request loans by specifying the loan amount and term. After approval by admins, users can view their loans and submit weekly repayments. 
The system generates scheduled repayments for approved loans and updates the repayment status based on customer submissions.

# Getting Started
1. Clone the repository to your local machine:
   https://github.com/your_username/easy-loan.git
   
2. Change to the project directory:
   cd easy-loan
   
3. Configure your environment variables, such as database connection settings and secret keys in .env file and paste it in server folder
   
4. Install the necessary dependencies for both the backend and frontend (npm install)
   
5. Start the backend server:
   cd server
   npm start
   
6. Start the frontend:
   cd client
   npm start
   
7. Now access the application via web browser

Project Structure:-

backend: Backend code for the REST API.
controllers: Controllers for handling loan requests, approvals, repayments, etc.
models: Data models for loans, repayments, users, etc.
routes: API routes for loan-related operations.
middleware: Custom middleware for verifyTokens, etc.
index.js: Main backend server script.
.env: Configuration file for environment variables.
frontend: Frontend code for the user interface. which has Redux for state management and have assets, pages, components etc.
