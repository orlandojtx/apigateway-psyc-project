
const userResolver = {
    Query : {
        UserDetailById: async(_, {userId}, { dataSources, userIdToken}) => {
            console.log(userIdToken);
            console.log(userId);

            if (userId == userIdToken)
                return await dataSources.authAPI.getUser(userId); 
            else
                return null;
        }
    },
    Mutation : {
        SignUpUser: async(_, {userInput}, {dataSources}) => {
            const logbookInput = {
               username : userInput.username
            }
            await dataSources.logbookAPI.createLogbook(logbookInput);

            const authInput = {
                username: userInput.username,
                password: userInput.password,
                name: userInput.name,
                email: userInput.email
            }
            return await dataSources.authAPI.createUser(authInput);
        },
        LogIn: async(_, {credentials}, {dataSources} ) => {
             return await dataSources.authAPI.authRequest(credentials);
        },
        refreshToken: async(_, {token},{dataSources}) => {
            return await dataSources.authAPI.refreshToken(token);
        }
    }
}

module.exports = userResolver;