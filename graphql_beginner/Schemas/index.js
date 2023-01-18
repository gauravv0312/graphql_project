const graphql = require("graphql");

const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql

 const UserType = require('./TypeDefs/UserType');
 const userData = require("../MOCK_DATA.json");

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

module.exports= new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});