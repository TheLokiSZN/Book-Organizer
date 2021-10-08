const {gql} = require('apollo-server-express')
const typeDefs = gql `
type User {
    _id: ID!
    username: STRING!
    email: STRING
    bookCount: int
    saveBooks: [Book]
}
type Book {
    bookId: ID!
    authors: [String]
    description: STRING
    image: STRING
    link: STRING
    title: STRING! 
}
type Auth {
    token: ID!
    user: User
}
input BookInput {
    authors: [String]
    description: STRING
    bookId: STRING
    image: STRING
    link: STRING
    title: STRING!
}
type Query {
    me: User
}
type Mutation {
    login(email:STRING!, password:STRING!): Auth
    addUser(username:STRING!, email:STRING!, password:STRING!): Auth
    saveBook(bookData:BookInput!): User
    removeBook(bookId:ID!): User
}
`
module.exports = typeDefs