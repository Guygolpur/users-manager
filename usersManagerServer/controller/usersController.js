const Users = require('../models/users')

module.exports = {
    addNewUser(req, res) {
        let newUser = new Users(req.body);

        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user)
        })
    },

    getUsers(req, res) {
        Users.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user)
        })
    },

    getUserByID(req, res) {
        Users.findById(req.params.userID, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user)
        })
    },

    updateUser(req, res) {
        Users.findOneAndUpdate({ _id: req.params.userID }, req.body, { new: true, useFindAndModify: false }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user)
        })
    },

    deleteUser(req, res) {
        Users.remove({ _id: req.params.userID }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json({ msg: 'succesfllt deleted user' })
        })
    },

}