const Joi = require('@hapi/joi');
const DataTypes = require('sequelize');
// const operacionesOpValidas = require('task-services/src/operations/pgOperations');
const operacionesOpValidas = ["LIKE", "EQUALS", "GREATER", "LOWER", ""];

const validador = (modelo) => {
    const esquema = {};

    for(let campo in modelo) {
        let tipoCampo = modelo[campo].type;
        let esPrimarioCampo = modelo[campo].primaryKey;
        let permiteSerNulo = modelo[campo].allowNull;

        if(tipoCampo && !esPrimarioCampo && !permiteSerNulo) {
            if(tipoCampo === DataTypes.STRING) {
                esquema[campo] = Joi.string().trim().required();
            }
            if(tipoCampo === DataTypes.INTEGER) {
                esquema[campo] = Joi.number().integer().positive().required();
            }
        } else if(tipoCampo) {
            if(tipoCampo === DataTypes.UUID) {
                esquema[campo] = Joi.string().uuid().optional();
            }
            if(tipoCampo === DataTypes.TEXT) {
                esquema[campo] = Joi.string().optional();
            }
            if(tipoCampo === DataTypes.DATE) {
                esquema[campo] = Joi.date().optional();
            }
            if(tipoCampo === DataTypes.INTEGER) {
                esquema[campo] = Joi.number().integer().positive().optional();
            }
        }
    }

    return Joi.object(esquema);
}

const esquemaInsert = Joi.object({
    id: Joi.string().uuid().optional(),
    title: Joi.string().trim().required(),
    description: Joi.string().optional(),
    dateEnd: Joi.date().optional(),
    priority: Joi.number().integer().positive().optional()
});
const esquemaSelect = Joi.object({
    attributes: Joi.array().required(),
    conditions: Joi.object({
        id: Joi.object({
            tipoOperacion: Joi.string().uppercase().trim().valid(...operacionesOpValidas).required(),
            valor: Joi.string().uuid().required()
        }).optional(),
        title: Joi.object({
            tipoOperacion: Joi.string().uppercase().trim().valid(...operacionesOpValidas).required(),
            valor: Joi.string().trim().required()
        }).optional(),
        description: Joi.object({
            tipoOperacion: Joi.string().uppercase().trim().valid(...operacionesOpValidas).required(),
            valor: Joi.string().optional()
        }).optional(),
        dateEnd: Joi.object({
            tipoOperacion: Joi.string().uppercase().trim().valid(...operacionesOpValidas).required(),
            valor: Joi.date().optional()
        }).optional(),
        priority: Joi.object({
            tipoOperacion: Joi.string().uppercase().trim().valid(...operacionesOpValidas).required(),
            valor: Joi.number().integer().positive().optional()
        }).optional()
    }).required()
});
const esquemaUpdate = Joi.object({
    id: Joi.string().uuid().required(),
    valor: Joi.object({
        id: Joi.string().uuid().optional(),
        title: Joi.string().trim().optional(),
        description: Joi.string().optional(),
        dateEnd: Joi.date().optional(),
        priority: Joi.number().integer().positive().optional()
    }).required()
});
const esquemaDelete = Joi.object({
    id: Joi.string().uuid().required(),
});

module.exports = { esquemaInsert, esquemaSelect, esquemaUpdate, esquemaDelete, validador };