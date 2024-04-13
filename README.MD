# Riktam test task assignment

> 

## About
This project is about chat rest apis 

## Getting Started

1. Make sure you have NodeJS and NPM and MongoDB installed.
2. Install your dependencies

    ```
    cd path/to/riktamtech-chat-assignment
    npm install
    ```
3. Run below command to create .env file and set the values.

    ```
     cp .env.example .env
     cp .jest.env.js.example .jest.env.js
    ```
4. Start your app

    ```
    npm start
    ```
5. Start in debug mode

    ```
    npm run dev
    ```
6. Run e2e test cases to test the flow 
    Note: 
    1. Test cases assumes there is not data in database.
    2. All the data will be reset after the test cases completed.

    ```
    npm test
    ```
7. Postman collection file is uploaded at root folder with name Postman_Collection