const TasksController = require('../main/controller');
const {Request, ResponseToolkit, ResponseObject} = require('@hapi/hapi');

const ROUTE_ROOT = '/tasks';
const ROUTE_INSERT = ROUTE_ROOT + '/insert';
const ROUTE_SELECTALL = ROUTE_ROOT + '/selectAll';
const ROUTE_SELECT = ROUTE_ROOT + '/select';
const ROUTE_UPDATE = ROUTE_ROOT + '/update';
const ROUTE_DELETE = ROUTE_ROOT + '/delete';

tasksContr = new TasksController();

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, response) => {
            return response.response('servidor en working').code(200);
        }
    },
    {
        method: 'GET',
        path: ROUTE_ROOT,
        handler: (request, response) => {
            return response.response('servidor en funcionamiento').code(200);
        }
    },
    {
        method: 'GET',
        path: ROUTE_SELECTALL,
        handler: (request, response) => {
            return tasksContr.selectAll(request, response);
        }
    },
    {
        method: 'POST',
        path: ROUTE_SELECT,
        handler: (request, response) => {
            return tasksContr.select(request, response);
        }
    },
    {
        method: 'POST',
        path: ROUTE_INSERT,
        handler: tasksContr.insert
    },
    {
        method: 'PUT',
        path: ROUTE_UPDATE,
        handler: tasksContr.update
    },
    {
        method: 'PUT',
        path: ROUTE_DELETE,
        handler: tasksContr.delete
    }
];

module.exports = routes;