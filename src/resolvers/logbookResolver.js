const logbookResolver = {
    Query : {
        logbookDetailByUsername: async(_, {username}, {dataSources}) => {
            return await dataSources.logbookAPI.logbookByUsername(username);
        },
        entriesDetailByUsername: async(_, {username}, {dataSources}) => {
            return await dataSources.logbookAPI.entriesByLogbook(username);
        },
        entryDetailById: async(_, {entryId}, {dataSources, userIdToken}) => {
            //We need to proof that the user who wants to see his entry is owner of it.
            userLogbook = (await dataSources.logbookAPI.entryById(entryId)).bitacora;
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username;
            if (usernameToken == userLogbook)
                return await dataSources.logbookAPI.entryById(entryId);
            else
                return null;
        }
    },
    Mutation : {
        logbookCreate: async (_, {logbookCreateInput}, {dataSources}) => {
            return await dataSources.logbookAPI.createLogbook(logbookCreateInput);
        },
        entryCreate: async (_, {entryCreateInput}, {dataSources}) => {
            return await dataSources.logbookAPI.createEntry(entryCreateInput);
        },
        entryUpdate: async (_, {entryUpdateBody}, {dataSources}) => { //I removed the userIdToken from here
            let entryId = entryUpdateBody.id;
            userLogbook = (await dataSources.logbookAPI.entryById(entryId)).bitacora;
            //usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            if (entryUpdateBody.logbook == userLogbook) //entryUpdateBody.logbook we asign this logbook from the frontend user session
                return await dataSources.logbookAPI.updateEntry(entryUpdateBody)
            else    
                return null
        },
        entryDelete: async (_, {entryId}, {dataSources, userIdToken}) => {
            usernameToken = (await dataSources.authAPI.getUser(userIdToken)).username
            entryLogbook = (await dataSources.logbookAPI.entryById(entryId)).bitacora
            if (usernameToken == entryLogbook){
                return await dataSources.logbookAPI.deleteEntry(entryId);
            }
            else{
                return null
            }
        }
    }
}


module.exports = logbookResolver;