const express = require('express');
const app = express();
const PORT = 4000;
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const  schema = require('./Schemas/index')

//This route will be used as an endpoint to interact with Graphql, and All queries will go through this route
app.use('/graphql', graphqlHTTP({
    // directing express-graphql to use this schema to map out the graph
    schema,
    // directing to use graphiql which is interface to make graphql queries
    graphiql: true
}));
app.listen(PORT, () => {
    console.log(`server is leaning ${PORT}........`);
});