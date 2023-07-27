const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "this is my first mern project"
router.post('/createuser',
    body('email', 'invalid mail').isEmail(),

    body('name').isLength({ min: 5 }),
    body('password', 'invalid password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = bcrypt.genSaltSync(10);
        let secpassword = bcrypt.hashSync(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secpassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })

        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })


router.post('/loginuser',
    body('email', 'invalid mail').isEmail(),
    body('password', 'invalid password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct email" });
            }
            const pwdcompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdcompare) {
                return res.status(400).json({ errors: "Incorrect Password !" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken });

        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })
module.exports = router;