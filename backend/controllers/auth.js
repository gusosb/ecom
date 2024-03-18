const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const auth = async (req) => {
    console.log(req.headers);

    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const token = auth.substring(7);
        if (!token) return;
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const currentUser = await User.findByPk(decodedToken.id, {
            attributes: {
                exclude: ['passwordHash']
            },
        });

        return currentUser;
    }
}



module.exports = { auth };