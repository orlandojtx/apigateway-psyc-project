const { RESTDataSource } = require('apollo-datasource-rest'); 
const serverConfig       = require('../server');

class AuthAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.auth_api_url;
    }

    async createUser(user){
        user = new Object(JSON.parse(JSON.stringify(user)));
        return this.post('/user/', user);
    }

    async getUser(userId){
        return await this.get(`/user/${userId}/`)
    } 

    async authRequest(credentials){  //Login
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));//parseamos eso a un objeto javascript
        return await this.post('/login/', credentials)
    } 
    async refreshToken(token){
        token = new Object(JSON.parse(JSON.stringify(token)));
        return await this.post('/refresh/', token)
    }
    
};
module.exports = AuthAPI;