module.exports.register = (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        console.log(req.body);

        const dummyUser = {
            username: 'John',
            email: 'J@Ohn'
        };

        return res.json({ status: true, dummyUser})

    } catch (ex) {
        next(ex);
    }
};