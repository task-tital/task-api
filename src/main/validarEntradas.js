const { Request } = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Tasks = require('task-services/src/models/task');
const { esquemaInsert, esquemaSelect, esquemaUpdate, esquemaDelete } = require('./esquemaValidador');


/**
 * 
 * @param {Request} request - Objeto peticion.
 * @returns {object} - Devuelve data, que es un objeto que contiene los valores necesarios para el insert().
 * @throws Error
 */
const validarEntradaInsert = (request) => {
    const jsonData = request.payload;
    
    const { error, value } = esquemaInsert.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });
    console.log(value);

    if(error) {
        throw new Error(error.message);
    } else {
        

        return value;
    }
};

/**
 * 
 * @param {Request} request - Objeto peticion.
 */
const validarEntradaSelect = (request) => {
    const jsonData = request.payload;

    const { error, value } = esquemaSelect.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if(error) {
        throw new Error(error.message);
    } else {
        return [ value['attributes'],  value['conditions'] ];
    }
};

/**
 * 
 * @param {Request} request - Objeto peticion.
 */
const validarEntradaUpdate = (request) => {
    const jsonData = request.payload;

    const { error, value } = esquemaUpdate.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if(error) {
        throw new Error(error.message);
    } else {
        return [value["id"], value["valor"]];
    }
};

/**
 * 
 * @param {Request} request - Objeto peticion.
 */
const validarEntradaDelete = (request) => {
    const jsonData = request.payload;

    const { error, value } = esquemaDelete.validate(jsonData, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    });

    if(error) {
        throw new Error(error.message);
    } else {
        return value;
    }
};

module.exports = { validarEntradaInsert, validarEntradaSelect, validarEntradaUpdate, validarEntradaDelete };