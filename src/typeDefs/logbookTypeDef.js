const { gql } = require('apollo-server');

const logbookTypes = gql `

    input LogbookCreation{
        username:String!
    }

    type LogbookDetail{
        id_bitacora:String
        fecha_creacion:String!
    }

    input EntryCreation{
        logbook:String!
        date:String!
        physichologist:String!
        attendance: Boolean!
        description:String!
        satisfaction:Int!
    }

    type EntryDetail{
        id:Int!
        bitacora:String!
        fecha:String!
        psicologo:String!
        asistencia:Boolean!
        descripcion:String
        satisfaccion:Int
    }

    input EntryUpdateInput{
        id:Int!
        logbook:String!
        date:String!
        physichologist:String!
        attendance:Boolean!
        description:String!
        satisfaction:Int!       
    }

    extend type Query{
        logbookDetailByUsername(username:String!):[LogbookDetail]
        entriesDetailByUsername(username:String!):[EntryDetail]
        entryDetailById(entryId:Int!):EntryDetail
    }

    extend type Mutation{
        logbookCreate(logbookCreateInput:LogbookCreation!):String!
        entryCreate(entryCreateInput:EntryCreation!):String!
        entryUpdate(entryUpdateBody:EntryUpdateInput!):EntryDetail
        entryDelete(entryId:Int!):String
    }

`;

module.exports = logbookTypes;