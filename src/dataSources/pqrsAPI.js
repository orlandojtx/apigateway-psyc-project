const { RESTDataSource } = require('apollo-datasource-rest'); 
const serverConfig       = require('../server');

class PqrsAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.pqrs_api_url; 
    }

    async createPqrs(pqrs){
        pqrs = new Object(JSON.parse(JSON.stringify(pqrs)));
        return await this.post('/nombre', pqrs)
    }
    async pqrsByUsername(username){
        return await this.get(`/nombre/${username}`)
    }
    async updatePqrs(pqrs){
        pqrs = new Object(JSON.parse(JSON.stringify(pqrs)));
        const pqrsUser = pqrs.nombre //OJO ACÁ CON ESTA LÍNEA DE CÓDIGO
        return await this.put(`/update/${pqrsUser}`, pqrs) 
    }
    async deletePqrs(username){
        return await this.delete(`/nombre/delete/${username}`)
    }
    async pqrsAll(){
        return await this.get('/all')
    }

};

module.exports = PqrsAPI;