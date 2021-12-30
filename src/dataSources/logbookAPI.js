const { RESTDataSource } = require('apollo-datasource-rest'); 
const serverConfig       = require('../server');

class LogbookAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.logbook_api_url;
    }

    async createLogbook(user){
        user = new Object(JSON.parse(JSON.stringify(user)));
        return await this.post('/bitacora/create/', user)
    }

    async logbookByUsername(username){
        return await this.get(`/bitacora/${username}/`)
    }

    
    async entriesByLogbook(logbook){
        return await this.get(`/entrada/${logbook}/`)
    }
    //Take care about this. It was recently added.
    async entryById(entryId){
        return await this.get(`/entrada/get/${entryId}/`)
    }
    
    async createEntry(entry){
        entry = new Object(JSON.parse(JSON.stringify(entry)));
        return await this.post('/entrada/create/', entry)
    }
    
    async updateEntry(entry){
        entry  = new Object(JSON.parse(JSON.stringify(entry)));
        let entryId = entry.id;
        return await this.put(`/entrada/update/${entryId}/`, entry)
    }

    async deleteEntry(entryId){
        return await this.delete(`/entrada/remove/${entryId}/`)
    }

}

module.exports = LogbookAPI;