const auth = async (req) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
            auth.substring(7), process.env.SECRET
        )
        const currentUser = await User.findByPk(decodedToken.id, {
            attributes: {
                exclude: ['passwordHash']
            },
        })
        return { currentUser }
    }
}



module.exports = {
    auth
}