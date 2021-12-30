const authResolver = require('./authResolver')
const logbookResolver = require('./logbookResolver')
const pqrsResolver = require('./pqrsResolver')

const lodash = require('lodash')

const resolvers = lodash.merge(authResolver, logbookResolver, pqrsResolver)

module.exports = resolvers;