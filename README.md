# Pre-requisites for running the project in local machine

1. Install node and node package manager
2. Install mysql and mysql workbench
3. Install Visual studio code 2019 or 2022

# Download the zip file in local macine OR git clone the git url in cmd

## Ddatabase setup
1. Open mysql workbench
2. Create new schema 'nutritiffdb'
3. Select nutritiffdb database
3. Import mysql script -> select `nutritiffdb.sql` file -> import
4. Run the whole script
5. Refresh the database

## Node setup
1. Open NutritiffBackendNodeJs folder in VS Code
2. open db.js file -> change mysql username, password according to your machine and save
3. Open terminal and follow the given commands
4. `npm install`
5. `node index.js`
6. Open postman or thunder client
7. Send the following `GET` request
8. http://localhost:9999/customer/tiffins
9. If proper response is received the you can go to setup the dot net backend
10. If received `error` in above `GET` request ->
        a. Run `npm i mysql2` in terminal
        b. In db.js file, change `const mysql = require('mysql')` to `const mysql = require('mysql2')`
        c. Save and again run `node index.js` and check the same `GET` request.

## DOT NET setup
1. Open the NutritiffBackendDotNet folder and double click on `NutritiffBackendDotNet.sln` file
2. From solution explorer, open `appsettings.json` file
3. Change the mysql Uid and password as per your mysql User Id and password in connection string
4. Run the program (Start without debugging)
5. This will open all the APIs in swagger. Now you can setup the frontend.

## React setup
1. Open the `nutritifffrontend-main` folder in VS code
2. Run the command `npm install` in terminal
3. Run the command `npm start` in terminal

### Enjoy our website in local machine
### Connnect with us @nutritiffdelivery@gmail.com