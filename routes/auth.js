const express = require('express');
const { User, validate } = require('../models/User.model');
const bcrypt = require('bcrypt')
const Token = require('../models/Token.model')
const router = express.Router();
const crypto = require('crypto')
const sendEmail = require('../utls/sendEmail')


router.get('/signup', (req, res, next) => {
    res.json('hello')
})

router.post('/signup', async (req, res) => {
    try {
        const {
            error,
        } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { email, name, password } = req.body;

        if (name.length < 4) {
            return res.status(400).send({ message: 'email must be longer than 4 characters' })
        } else if (password.length < 4) {
            return res.status(400).send({ message: 'password must be longer than 4 characters' })
        };

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).send(({ message: 'A user with this email address already exists' }));
        };

        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({ email, name, password: hashedPassword });


        const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        })

        // const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        // await sendEmail(user.email, "Verify Email", url);


    } catch (error) {
        res.send('An error occured');
        console.log(error);
    }
});

module.exports = router;
