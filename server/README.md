# Restful API with NodeJS, Express.js and MongoDB

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Itsaadarsh/nodeJS-express-postgreSQL/blob/master/LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/Itsaadarsh/nodeJS-express-postgreSQL)

A REST API template that performs CRUD operations, User authentication, file uploading etc.

## Getting started

This project will run on **Express** server using **MongoDB** as database. Project is open for suggestions, bug reports and pull requests.

## Features

- Server Side Validation
- Sessionless Authentication (Tokens)
- JWT
- Protected Routes
- Types Support
- File Uploading
- Passward Hashing (bcrypt.js)
- Middleware

## Dependencies

- bcrypt
- body-parser
- express
- jsonwebtoken
- mongoose
- morgan
- multer
- typescript

## Dev Dependencies

- @types/express
- @types/jsonwebtoken
- @types/mongoose
- @types/morgan
- @types/bcrypt
- @types/multer
- concurrently
- nodemon

## How to run

### Running server locally

```
yarn install
yarn start
```

```
Make sure to also add your Mongo Atlas Admin Passward and you JWT Token Secret Key to a nodemon.json file (which you have to create).
{
    "env": {
        "MONGO_PWD": "YOUR_MONGO_PWD",
        "JWT_TOKEN": "YOUR_SECRET_KEY"
    }
}
```

Press `CTRL + C` to stop the process.

```
## Bugs or improvements

Every project needs improvements, Feel free to report any bugs or improvements. Pull requests are always welcomed.

## License

This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.
```

## Support & Feedbacks

- [LinkedIN](https://www.linkedin.com/in/itsaadarsh/ 'Linkedin') - Aadarsh S (itsaadarsh)
- [Twitter](https://www.twitter.com/itsaadarsh_ 'Twitter') - itsaadarsh\_
- [Instagram](https://www.instagram.com/itsaadarsh/ '@itsaadarsh') - itsaadarsh
- aadarsh-s@outlook.com
