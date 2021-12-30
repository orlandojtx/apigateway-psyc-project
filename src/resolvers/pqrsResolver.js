const pqrsResolver = {
    Query : {
        pqrsDetail: async(_, {username}, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (username == usernameToken)
                return await dataSources.pqrsAPI.pqrsByUsername(username);
            else
                return null;
        },
        pqrsAll: async(_, {dataSources}) => {
            return await dataSources.pqrsAPI.pqrsAll();
        }
    },
    Mutation : {
        pqrsCreate: async (_, {PqrsInput},{dataSources}) => {
            //I will provide the username or 'nombre' in the frontend. I wont need userIdToken
            return await dataSources.pqrsAPI.createPqrs(PqrsInput)
        },
        pqrsUpdate: async (_, {PqrsInput}, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (PqrsInput.nombre == usernameToken)
                return await dataSources.pqrsAPI.updatePqrs(PqrsInput)
            else
                return null
        },

        pqrsDelete: async (_, {username}, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (username == usernameToken)
                return await dataSources.pqrsAPI.deletePqrs(username)
            else    
                return null         
        } 
    }
}

module.exports = pqrsResolver;