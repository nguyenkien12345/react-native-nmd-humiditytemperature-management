const baseURL = 'https://thcntt3.onrender.com';

const crudAPI = {
    list: 'list',
    detail: 'detail',
    add: 'add-data',
    update: 'update',
    delete: 'delete'
};

const crud = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
};

const commonHeadersAPI = {
    'Content-type': 'application/json; charset=UTF-8'
};

exports = { baseURL, crudAPI, crud, commonHeadersAPI };
