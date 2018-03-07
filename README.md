# Simple Product Catalogue

A very simple and minimal tangible product and simple service catalogue. A pet project - mainly for educational purposes (node ecosystem).
Minimal set of features:
- simple product structure
  * tangible and simple (manual) service products,
  * price lists and price list items
- API for providing downstream systems with catalogue definitions  

## Running instruction
First You need to download node. Then You are able to execute:
    npm install

Once You have all your dependencies in node_modules you can build backend:
    npm run build
or
    npm run build-web
or        
    npm run build-all

and then run the app:     
    npm start

Your app should now be running on localhost:3500.

## Configuration

Create **.env** file in root directory

With following content:

APP_NAME=SPC
API_VERSION=v1
APPLICATION_SECRET=<your secret goes here>
PORT=<3500 or different>
MONGODB_URI=mongodb://<your mongodb connection string goes here>

## Run Test.

Run test using
<code>npm test</code> command.
