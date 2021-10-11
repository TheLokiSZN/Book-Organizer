const {AuthenticationError} = require('apollo-server-express')
const {User} = require('../models')
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password')
                return userData
            }
            throw new AuthenticationError('You are not logged in')
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        },
        login: async(parent, { email, password }) => {
            const user = await user.findOne({email})
            if (!user) {
                throw new AuthenticationError('Incorrect user')
            }
            const correctPassword = await User.isCorrectPassword(password)
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect password')
            }
            const token = signToken(user)
            return { token, user }
        },
        saveBook: async(parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in')
        },
        removeBook : async(parent, {bookData}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers;