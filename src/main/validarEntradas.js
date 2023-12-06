const { Request } = require('@hapi/hapi');
const { esquemaInsert, esquemaSelect, esquemaUpdate, esquemaDelete } = require('./esquemaValidador');
const { InputConstructor, ConditionConstructor } = require('task-services/src/operations/pgOperations');


/**
 * @param {Request} request - Objeto peticion.
 * @returns {object} JSON parseado a partir de la peticion.
 * @throws TypeError.
 */
const getJsonData = (request) => {
    if(request.payload == null || request.payload == undefined) {
        throw new TypeError("the request is empty or undefined");
    } else {
        datos = request.payload;
    }
    return JSON.parse(request.payload);
}

/**
 * @param {Request} request - Objeto peticion.
 * @returns {InputConstructor} - Devuelve un objeto que contiene los valores necesarios para el insert().
 * @throws Error
 */
const validarEntradaInsert = (request) => {
    const jsonData = getJsonData(request);
    
    const { error, value } = esquemaInsert.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if(error) {
        throw new Error(error.message);
    } else {
        let inputConstructorImpl = new InputConstructor();
        inputConstructorImpl.setAttributesFromObject(value);

        return inputConstructorImpl;
    }
};

/**
 * @param {Request} request - Objeto peticion.
 * @returns {[string[], ConditionConstructor]} Devuelve una lista con los atributos y el ConditionConstructor que se requiere para el select.
 * @throws Error 
*/
const validarEntradaSelect = (request) => {
    const jsonData = getJsonData(request);

    const { error, value } = esquemaSelect.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if(error) {
        throw new Error(error.message);
    } else {
        let attributes = value['attributes'];
        let conditions = new ConditionConstructor();
        conditions.setCondicionesFromObject(value['conditions']);

        return [ attributes, conditions ];
    }
};

/**
 * @param {Request} request - Objeto peticion.
 * @returns {[string, InputConstructor]} Devuelve el id y el InputConstructor que se requieren para el update.
 * @throws Error 
*/
const validarEntradaUpdate = (request) => {
    const jsonData = getJsonData(request);

    const { error, value } = esquemaUpdate.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if(error) {
        throw new Error(error.message);
    } else {
        let inputConstructorImpl = new InputConstructor();
        inputConstructorImpl.setAttributesFromObject(value['valor']);

        return [value['id'], inputConstructorImpl];
    }
};

/**
 * @param {Request} request - Objeto peticion.
 * @returns {string} Devuelve el id del objeto a eliminar.
 * @throws Error 
*/
const validarEntradaDelete = (request) => {
    const jsonData = getJsonData(request);

    const { error, value } = esquemaDelete.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if(error) {
        throw new Error(error.message);
    } else {
        return value['id'];
    }
};

module.exports = { validarEntradaInsert, validarEntradaSelect, validarEntradaUpdate, validarEntradaDelete };