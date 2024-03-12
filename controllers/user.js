//[Dependencies and Modules]
const bcrypt = require("bcrypt")

const User = require("../models/User.js");

const { verify } = require("../auth.js");



module.exports.getProfile = (req, res) => {
    const userId = req.user.id;

    User.findById(userId)
    .then(user => {
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Exclude sensitive information like password
        user.password = undefined;

        return res.status(200).send({ user });
    })
    .catch(err => {
        console.error("Error in fetching user profile", err)
        return res.status(500).send({ error: 'Failed to fetch user profile' })
    });
};

