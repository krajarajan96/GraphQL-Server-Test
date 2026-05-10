const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');
const app = express();

const sampleSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'GetBooks',
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => 'Hello, Raja! Welcome to GraphQL'
            }
        })
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => authors
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId);
            }
        }
    })
}); 

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id);
            }
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        // Define mutations here (e.g., addBook, updateBook, deleteBook)
        addBook: {
            type: BookType,
            description: 'Add a new book',
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const newBook = {
                    id: books.length + 1,
                    title: args.title,
                    authorId: args.authorId
                };
                books.push(newBook);
                return newBook;
            }
        },
        addAuthor: {    
            type: AuthorType,
            description: 'Add a new author',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const newAuthor = {
                    id: authors.length + 1,
                    name: args.name
                };
                authors.push(newAuthor);
                return newAuthor;
            }
        }
    })
});

const schema = new GraphQLSchema({
    // Query == GET
    query: RootQueryType,
    // Mutation == POST, PUT, DELETE
    mutation: RootMutationType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

const books = [
    { id: 1, title: 'The Great Gatsby', authorId: 1 },
    { id: 2, title: 'To Kill a Mockingbird', authorId: 2 },
    { id: 3, title: '1984', authorId: 3 },
    { id: 4, title: 'Pride and Prejudice', authorId: 4 },
    { id: 5, title: 'The Catcher in the Rye', authorId: 5 },
    { id: 6, title: 'The Lord of the Rings', authorId: 6 },
    { id: 7, title: 'The Hobbit', authorId: 6 },
];

const authors = [
    { id: 1, name: 'F. Scott Fitzgerald' },
    { id: 2, name: 'Harper Lee' },
    { id: 3, name: 'George Orwell' },
    { id: 4, name: 'Jane Austen' },
    { id: 5, name: 'J.D. Salinger' },
    { id: 6, name: 'J.R.R. Tolkien' },
];