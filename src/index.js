const { ApolloServer} = require ('apollo-server')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const authentication = require('./utils/authentication')

const LogbookAPI = require('./dataSources/logbookAPI')
const PqrsAPI = require('./dataSources/pqrsAPI')
const AuthAPI = require('./dataSources/authAPI')

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        logbookAPI: new LogbookAPI,
        pqrsAPI   : new PqrsAPI,
        authAPI   : new AuthAPI
    }),
    introspection : true,
    playground    : true
});

server.listen(process.env.PORT || 4000).then(({url}) => {
    console.log(`Server ready at ${url}`);
    }
);  