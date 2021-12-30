const { gql } = require('apollo-server');

const pqrsTypes = gql `
    
    type Pqrs{
        nombre:String!
        fecha:String!
        email:String!
        ventajas:String!
        negativo:String!
        terapias:String!
        sugerencia:String!
    }

    input PqrsCreate{
        nombre:String!
        fecha:String!
        email:String!
        ventajas:String!
        negativo:String!
        terapias:String!
        sugerencia:String!
    }

    input PqrsUpdate{
        nombre:String!
        ventajas:String!
        negativo:String!
        terapias:String!
        sugerencia:String!
    }

    extend type Query{
        pqrsDetail(username:String!):Pqrs! 
        pqrsAll:[Pqrs]
    } 

    extend type Mutation{
        pqrsCreate(PqrsInput:PqrsCreate!):Pqrs!
        pqrsUpdate(PqrsInput:PqrsUpdate!):Pqrs!
        pqrsDelete(username:String!):String
    }


`;

module.exports = pqrsTypes;