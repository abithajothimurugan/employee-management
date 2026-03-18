const express = require('express')
const routes = express.Router()

const { createEmployee,
    editEmployee,
    fetchAllEmployee,
    fetchSingleEmployee,
    deleteEmployee } = require('../Controller/employeeController')

const upload = require('../Middleware/profileUpload')


routes.post('/', upload.single("image"), createEmployee);

routes.put('/:id', upload.single("image"), editEmployee);

routes.get('/', fetchAllEmployee);

routes.get('/:id', fetchSingleEmployee);

routes.delete('/:id', deleteEmployee);


module.exports = routes