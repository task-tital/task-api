// importar el modelo y las operaciones del servicio.

const { Tasks } = require('task-services/src/models/task');
const { insertPg, selectAllPg, selectFilterPg, selectPg, updatePg, deletePg, InputConstructor, ConditionConstructor } = require('task-services/src/operations/pgOperations');
const {Request, ResponseToolkit, ResponseObject} = require('@hapi/hapi');
const { validarEntradaInsert, validarEntradaSelect, validarEntradaUpdate, validarEntradaDelete } = require('./validarEntradas');


/**
 * 
 * @param {function} callback 
 * @param {Error} error
 */
const controllerError = (callback, error) => {
    console.error('clase: TasksController - error en ' + callback + '(): ' + error.message);
}

/**
 * 
 * @param {Request} request
 * @param {function} callback Funcion que se lanza para comprobar que el request tiene los valores correctos. 
 * Debe lanzar un error con un mensaje del parametro que falla y devolver la entrada correcta.
 * @throws TypeError
 */
const validarEntrada = (request, callback) => {
    try {
        return callback(request);
    } catch(error) {
        throw new TypeError(error.message);
    }
}

class TasksController {
    constructor(modelo = Tasks) {
        this.modelo = Tasks;
    }

    /**
     * @param {Request} request - Objeto peticion.
     * @param {ResponseToolkit} response - Objeto respuesta.
     * @returns {ResponseObject} La respuesta que se devuelve.
     */
    async insert(request, response) {
        try {
            const data = validarEntrada(request, validarEntradaInsert);
            console.log(data);
            const jsonSalida = await insertPg(this.modelo, data);
            return response.response(jsonSalida).code(200);
        } catch(error) {
            controllerError("insert", error);

            if(error instanceof TypeError) {
                return response.response('Error en INSERT, datos introducidos incorrectos: ' + error.message).code(400);
            } else {
                return response.response('Error en INSERT, fallo del servidor').code(500);
            }
        }
    }

    /**
     * @param {Request} request - Objeto peticion.
     * @param {ResponseToolkit} response - Objeto respuesta.
     * @returns {ResponseObject} La respuesta que se devuelve.
     */
    async selectAll(request, response) {
        try {
            const jsonSalida = await selectAllPg(this.modelo);
            return response.response(jsonSalida).code(200);
        } catch(error) {
            controllerError(this.selectAll, error);
            return response.response('Error en SELECT ALL, fallo del servidor').code(500);
        }
    }

    /**
     * @param {Request} request - Objeto peticion.
     * @param {ResponseToolkit} response - Objeto respuesta.
     * @returns {ResponseObject} La respuesta que se devuelve.
     */
    async select(request, response) {
        try {
            const [ attributes, conditions ] = validarEntrada(request, validarEntradaSelect);
            const jsonSalida = await selectPg(this.modelo, attributes, conditions);
            return response.response(jsonSalida).code(200);
        } catch(error) {
            controllerError(this.select, error);

            if(error instanceof TypeError) {
                return response.response('Error en SELECT, datos introducidos incorrectos: ' + error.message).code(400);
            } else {
                return response.response('Error en SELECT, fallo del servidor').code(500);
            }
        }
    }

    /**
     * @param {Request} request - Objeto peticion.
     * @param {ResponseToolkit} response - Objeto respuesta.
     * @returns {ResponseObject} La respuesta que se devuelve.
     */
    async update(request, response) {
        try {
            const [id, data] = validarEntrada(request, validarEntradaUpdate);
            const jsonSalida = await updatePg(this.modelo, data, id);
            return response.response(jsonSalida).code(200);
        } catch(error) {
            controllerError(this.update, error);

            if(error instanceof TypeError) {
                return response.response('Error en UPDATE, datos introducidos incorrectos: ' + error.message).code(400);
            } else {
                return response.response('Error en UPDATE, fallo del servidor').code(500);
            }
        }
    }

    /**
     * @param {Request} request - Objeto peticion.
     * @param {ResponseToolkit} response - Objeto respuesta.
     * @returns {ResponseObject} La respuesta que se devuelve.
     */
    async delete(request, response) {
        try {
            const id = validarEntrada(request, validarEntradaDelete);
            const jsonSalida = await deletePg(this.modelo, id);
            return response.response(jsonSalida).code(200);
        } catch(error) {
            controllerError(this.delete, error);

            if(error instanceof TypeError) {
                return response.response('Error en DELETE, datos introducidos incorrectos: ' + error.message).code(400);
            } else {
                return response.response('Error en DELETE, fallo del servidor').code(500);
            }
        }
    }
}

module.exports = TasksController;