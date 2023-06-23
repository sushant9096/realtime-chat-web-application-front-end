This is open source project for the Realtime Chat Application using 
Node.js, Express, Socket.io, MySQL, Sequelize ORM.

## Setup Instructions
1. Install Node.js
2. Install Mysql (I recommend MariaDB with Xammp Server) database and create database names as rcwa
3. Clone repository
4. cd into backend folder
5. Download firebase service account json file and add it to backend folder
6. create .env file and add following variables (replace values with your own values)
```
FIREBASE_CREDENTIALS_PATH=filename      # firebase credentials path
APP_PORT=8000                   # app port
DB_HOST=localhost               # database connection host
DB_USER=root                    # database username
DB_PASS=secret@123              # database password
DB_NAME=express-sequelize-api   # database name
DB_DIALECT=mysql                # database dialect
DB_PORT=3306                    # database port
```
7. Install dependencies
8. Run backend with `npm run dev`
9. cd into frontend folder
10. Install dependencies
11. Run frontend with `npm start`
12. Open http://localhost:3000 in your browser to see the application

## Author
- [Sushant Zope](https://github.com/sushant9096)