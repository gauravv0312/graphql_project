const express = require('express');
const app = express();
const PORT = 4000;
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const userData = require('./MOCK_DATA.json');


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type : GraphQLInt},
        first_name: {type : GraphQLString},
        last_name: {type : GraphQLString},
        email: {type : GraphQLString},
        gender: {type : GraphQLString}
    })
})
// RootQuery describes how users can use the graph and grab data and all the query to get all user and etc.
const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields:{
       getAllUsers:{
        type: new graphql.GraphQLList(UserType),
        args: { id:{type: GraphQLInt}},  // we passing the argument for get data by id
        resolve(parent,args){
            return userData
        }
       }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        createUser:{
            type:UserType,
            args:{
                first_name: {type : GraphQLString},
                last_name: {type : GraphQLString},
                email: {type : GraphQLString},
                gender: {type : GraphQLString},
            },
            resolve(parent,args){
                userData.push({id :userData.length+1,first_name:args.first_name,last_name:args.last_name,email:args.email,gender:args.gender})
                return args
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

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