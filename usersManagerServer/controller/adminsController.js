const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admins = require('../models/admins');
const {validationResult} = require("express-validator");

module.exports = {

    async signUp (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        
        const { email = null, password = null } = req.body;
        try {
            const tmp = await Admins.findOne({ email });
            if (tmp) 
                return res.status(400).json({ msg: "User Already Exists" });
            
            const admin = new Admins({ email, password });
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
            await admin.save();
            
            jwt.sign( {admin: { id: admin.id }}, "randomString", 
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    },

    async logIn (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) 
            return res.status(400).json({ errors: errors.array() });
        
        const { email = null, password = null } = req.body;
        try {
            let admin = await Admins.findOne({ email });
            if (!admin)
                return res.status(400).json({ message: "User Not Exist" });

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch)
                return res.status(400).json({ message: "Incorrect Password !" });

            jwt.sign({ admin: { id: admin.id }}, "randomString", { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({token});
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "Server Error"});
        }
    },

};