const {ApolloError} = require('apollo-server');
const serverConfig = require('../server');
const fetch         = require('node-fetch');

//LLamado a los servicios de autenticación. Lo recibimos como parámetro de la función asíncrona
const authentication = async( {req} ) => {
    const token = req.headers.authorization || '';

    if (token == '') {
         return {userIdToken : null}
    }
    else {
        try{
            let requestOptions = { //Empiezo a armar mi petición
                method      : 'POST',
                headers     : {"Content-Type":"application/json"}, //Equivalente a decir que en el body enviaremos un json
                body        : JSON.stringify( {token} ), //Le saco toda la inforamción al JSON y lo paso a un diccioanrio
                redirect    : 'follow'
            }

            let response = await fetch(
                `${serverConfig.auth_api_url}/verifyToken/`, 
                requestOptions //Acá mando la petición que hice con anterioridad
            )//Espera la respuesta de algo asíncrono. Espere que le den respuesta y espere que le llegue y guardelo en el response

            if(response.status != 200) { // Si algo falló en la validación del token...
                console.log(response);
                throw new ApolloError(`Sesión fallida o inactiva - ${401}` + response.status, 401);
            }
            //Acá ya al final de todo devuelvo sólo el UserId del token, cuando ya está todo validado.
            return { userIdToken : (await response.json()).UserId} //Ojo con el await, porque si no, pailas, le responde sin lo otro terminar de haberse procesado
        
        } catch(error){ //Acá ya es para captar un error de APOLO, no del servicio web como tal. Un error
                        //propio de la ejecución del GraphQL o del Apolo.
            throw new ApolloError(`Hubo un error en la validación del token: ${500}: ${error}`, 500); 
            //Falta completar el código acá
        } 
    }
}
module.exports = authentication;