const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;

        const usernameCheck =
            await User.findOne({username})

        if (usernameCheck) {
            return res.json({msg: "Username already in use.", status: false})
        }

        const emailCheck =
            await User.findOne({email})

        if (emailCheck) {
            return res.json({msg: "E-Mail address already in use.", status: false})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user =
            await User.create({
                email,
                username,
                password: hashedPassword,
            });

        delete user.password;

        return res.json({user, status: true})

    } catch (ex) {
        next(ex);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if (!user) {
            console.log("Login: unknown email " + email)
            return res.json({msg: "Incorrect Username or Password", status: false});
        }
        console.log("Login: email found! " + email)

        const hasValidPassword = await bcrypt.compare(password, user.password);

        if (!hasValidPassword) {
            return res.json({msg: "Incorrect Username or Password", status: false});
        }

        delete user.password;
        return res.json({status: true, user});

    } catch (ex) {
        next(ex);
    }
};

module.exports.updateAvatar = async (req, res, next) => {
    try {

        const userId = req.params.id;
        const avatarImage = req.body.image;

        console.log("updateAvatar: " + userId)
        console.log("updateAvatar: " + JSON.stringify(avatarImage).slice(-10))

        const userData = await User.findByIdAndUpdate(userId, {
            hasAvatarImage: true,
            avatarImage
        })

        return res.json({
            isSet: userData?.hasAvatarImage || false,
            image: userData?.avatarImage || ""
        });

    } catch (ex) {
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const skipCurrentUserId = req.params.id;
        console.log("Looking up contacts. Skipping current user: " + skipCurrentUserId)

        const users = await User.find(
            {
                _id: {$ne: skipCurrentUserId} // skip the current user
            }
        ).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);
        return res.json(users)
    } catch (ex) {
        next(ex);
    }
};