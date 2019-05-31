const { ApolloServer, gql } = require('apollo-server');

const resolvers = require('./resolver');

const typeDefs = gql`
type Course {
    id: Int 
    title: String
    author: String
    description: String
    topic: String
    url: String
}
type CategrySchema {
    Category_id: Int
    Category_Name: String
    active: Int    
}  
type Message {
    id: Int
    message:String  
}  
type Query {
    CourceAll:[CategrySchema],
    fetchOne(Category_id:Int!):CategrySchema,
    fetchData(Category_id:Int):CategrySchema
}
type Mutation {
    addCategory(Category_Name:String,active:Int!):CategrySchema,
    updateData(Category_id:Int,Category_Name:String,active:Int!):CategrySchema,
    deleteData(Category_id:Int):Message
}`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(8000,() => {
    console.log(`Server ready at 8000`);
});
