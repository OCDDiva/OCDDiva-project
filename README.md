# OCD Diva Organize, Clean, and Declutter

## About The Project 

The OCD Diva application aims to provide an interactive and immersive form for new and old customers to OCD Diva, enabling them to provide detailed information about the services they are interested in. The application includes a multi-step form that guides users through the registration process and collects information such as name, address, service details, photos of the space, and other relevant specifications. Customer inquiries are stored in a database and can be accessed through an Admin view.

## Need for the Application

The OCD Diva application addresses the need for a more organized and comprehensive approach to customer inquiries and service requests. By providing a structured form, the application ensures that customers provide all the necessary information upfront, reducing the need for back-and-forth communication and minimizing potential misunderstandings.

The application's Admin view empowers OCD Diva and its employees by offering a centralized platform to manage customer inquiries, track their progress, and assign services to specific employees. This streamlined process enhances efficiency and allows OCD Diva to provide prompt and personalized service to its customers.

Overall, the OCD Diva application significantly improves the customer experience by simplifying the service request process, enhancing communication between customers and OCD Diva, and providing effective tools for inquiry management.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Technology

- [![React][react.js]][react-url]
- [![Redux][redux.js]][redux-url]
- [![Redux-Saga][redux-saga.js]][redux-saga-url]
- [![PostgreSQL][postgresql]][postgresql-url]
- [![Material-UI][material-ui]][material-ui-url]
- [![Express][express.js]][express-url]
- [![Node][node.js]][node-url]
- [![React-Router][react-router]][react-router-url]
- [![Heroku][heroku]][heroku-url]
- [![NPM][npm]][npm-url]


## Create database and table

Create a new database called `ocd_diva`. If you would like to name your database something else, you will need to change `ocd_diva` to the name of your new database name in `server/modules/pool.js`. You will get started by creating your first `users` table: After this you will create the rest of the tables from top to bottom. 


## Development Setup Instructions

- Run `npm install`
- You will need to sign up for AWS and create an s3 bucket named "examplebucket" and IAM user. 
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret

  AWS_ACCESS_KEY_ID=EnterYourAccessKeyID

  AWS_SECRET_ACCESS_KEY=EnterYourSecretAccessKey

  AWS_REGION=EnterYourRegion

  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5042`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Acknowledgement

Creator:
- Kalia McKinley

Developers:
- Everett Butler
- Leigh Stephenson
- Miguel Torres
- Stephen Vertucci
- Seth Woodson
- Sam Gossie


## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2 -->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[postgresql]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[redux-saga.js]: https://img.shields.io/badge/Redux%20saga-86D46B?style=for-the-badge&logo=redux%20saga&logoColor=999999
[redux-saga-url]: https://redux-saga.js.org/
[material-ui]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[material-ui-url]: https://mui.com/
[heroku]: https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white
[heroku-url]: https://heroku.com
[node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com
[react-router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://react-router.js.org/
