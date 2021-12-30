//Call all typedefs.

const authTypes = require('./authTypeDef')
const logbookTypes = require('./logbookTypeDef')
const pqrsTypes = require('./pqrsTypeDef')

const schemaArrays = [authTypes,pqrsTypes,logbookTypes]

module.exports     = schemaArrays