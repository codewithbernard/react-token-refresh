# Express Auth
Simple NodeJS + Express + MongoDB auth server

## Project Structure
* _config_ - configuration variables
* _controllers_ - internal logic 
* _models_ - database structure
* _routes_  - API endpoints
* _services_ - 3rd party integration

## How to start
Starting by cloning the repository. You'll need a database. To let the app conenct to database. Create `.env` based on a `sample.env` and specify the database URI in it

When database prerequisities are met. Run following commands
```
npm install
npm run dev
```