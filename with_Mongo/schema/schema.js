const graphql = require('graphql');
const Book = require('../model/book');
const Author = require('../model/author');



const {
   GraphQLObjectType, GraphQLString,
   GraphQLID, GraphQLInt,GraphQLSchema,
   GraphQLList,GraphQLNonNull
} = graphql;






const BookType = new GraphQLObjectType({
   name: 'Book',
   
   fields: () => ({
       id: { type: GraphQLID  },
       name: { type: GraphQLString },
       pages: { type: GraphQLInt },
       author: {
       type: AuthorType,
       resolve(parent, args) {
           return Author.findById(parent.authorID);
       }
   }
   })
});



const AuthorType = new GraphQLObjectType({
   name: 'Author',
   fields: () => ({
       id: { type: GraphQLID },
       name: { type: GraphQLString },
       age: { type: GraphQLInt },
       book:{
           type: new GraphQLList(BookType),
           resolve(parent,args){
               return Book.find({ authorID: parent.id });
           }
       }
   })
})



const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       book: {
           type: BookType,
           //argument passed by the user while making the query
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               //Here we define how to get data from database source



               //this will return the book with id passed in argument
               //by the user
               return Book.findById(args.id);
           }
       },
       books:{
           type: new GraphQLList(BookType),
           resolve(parent, args) {
               return Book.find({});
           }
       },
       author:{
           type: AuthorType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return Author.findById(args.id);
           }
       },
       authors:{
           type: new GraphQLList(AuthorType),
           resolve(parent, args) {
               return Author.find({});
           }
       }
   }
});

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
       addAuthor: {
           type: AuthorType,
           args: {
               //GraphQLNonNull make these fields required
               name: { type: new GraphQLNonNull(GraphQLString) },
               age: { type: new GraphQLNonNull(GraphQLInt) }
           },
           resolve(parent, args) {
               let author = new Author({
                   name: args.name,
                   age: args.age
               });
               return author.save();
           }
       },
       addBook:{
           type:BookType,
           args:{
               name: { type: new GraphQLNonNull(GraphQLString)},
               pages: { type: new GraphQLNonNull(GraphQLInt)},
               authorID: { type: new GraphQLNonNull(GraphQLID)}
           },
           resolve(parent,args){
               let book = new Book({
                   name:args.name,
                   pages:args.pages,
                   authorID:args.authorID
               })
               return book.save()
           }
       }
   }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});