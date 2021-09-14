# PERN typescript starter kit Build with TypeORM, express, react, and node.

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. setup .env file to reflect your database info

#Scripts:

1. Run `npm run watch` this will watch your TS files for saves, on save will auto compile and check for errors. 
2. Run `npm run devstart` this will start your development environment, using nodemon to run your main file (index.js) in your distributable. It will first run the TS compiler, then run your js ones with nodemon.

run `npm run watch` and `npm run devstart` to auto compile and auto run your JS files.

3. Run `npm start` this will start and run the basic JS files, mainly use this for checking the site out, not for development.

