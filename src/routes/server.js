const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (request, response) => {
            return 'El server funciona';
        }
    },
    {
        method: 'GET',
        path: '/tasks/{id}',
        handler: (request, response) => {
            return 'El server funciona';
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (request, response) => {
            return response.redirect('http://google.com');
        }
    },
    {
        method: 'PUT',
        path: '/tasks',
        handler: (request, response) => {
            return response.redirect('http://google.com');
        }
    },
    {
        method: 'PUT',
        path: '/tasks',
        handler: (request, response) => {
            return response.redirect('http://google.com');
        }
    }
];

module.exports = routes;