const {gql} = require('apollo-server-express')
const typeDefs = gql `
type User {
    _id: ID!
    username: STRING!
    email: STRING
    bookCount: int
    savedBooks: [Book]
}
type Book {
    _id: ID
    bookId: STRING
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
    saveBook(book:BookInput!): User
    removeBook(bookId:STRING!): User
}
`
module.exports = typeDefs