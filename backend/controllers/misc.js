const miscRouter = require('express').Router();



miscRouter.post('/email', async (request, response) => {

    const { email } = request.body;



    response.status(201).json();
});



module.exports = miscRouter;