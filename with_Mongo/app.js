const express = require('express');
 
 
const graphqlHTTP = require('express-graphql').graphqlHTTP;
 
const schema = require('./schema/schema')
  
const app = express();
 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/graphQL')
 
mongoose.connection.once('open', () => {
 
   console.log('connected to database');
 
});


app.use('/graphql', graphqlHTTP({
   schema,
   graphiql:true
 
}));

app.listen(3000, () => {
 
   console.log('Listening on port 3000');
 
});
