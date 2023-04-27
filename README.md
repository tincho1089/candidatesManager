# EmiLabs

## Application Demo

This project is a POC, which consists of creating an interface so that recruiters can manage the information of the candidates applied for a job.
The application allows you to dynamically select the columns that you want to see from the applicants so that recruiters only see the columns that are of interest to them.
All candidates are in an approved or rejected status. The reason field of each applicant defines that status. If there is a value in that field, it means that the candidate was rejected, otherwise it is approved.
Regarding the technologies used, The frontend uses React JS + Typescript with Vite. Vitest was also used for testing.
The backend uses node + express as the base for the GraphQL configuration.
MongoDB is used as the database and an instance is created through Docker.
When starting the server for the first time, the candidate information is obtained from the testData.ts file and stored in the Mongo database. From there, all manipulations are done directly against the database.

![Demo](/images/demo.gif?raw=true "Demo")


## Local execution with Docker
 The command will build the API developed in Node, will create a MongoDB instance and will build the frontend project developed in React JS with Vite.
`docker-compose stop && docker-compose up --build -d --remove-orphans`

![Docker Services](/images/docker.png?raw=true "Docker Services")

This is the final result of the services that you should see if everything works as expected.

## Application access
To access the application you can do it through: `http://localhost:5173`

![Application](/images/app.png?raw=true "Application")


## Database Access
To MongoDB database can be accessed through the extension MongoDB for VScode:

![db extension](/images/mongoextension.png?raw=true "db extension")

The connection string should be for this case `mongodb://localhost:27017/`. After we stablish the connection, we should have access to the database:

![db access](/images/mongodb.png?raw=true "db access")


## Testing
To execute the tests locally, we need to install the libraries dependencies for the service with `npm i`. After that we can run the command:
`npm run test`

The tests are working with Vitest and Testing Library 

![tests](/images/testFront.png?raw=true "tests")

NOTE: Application tested in Windows OS.
