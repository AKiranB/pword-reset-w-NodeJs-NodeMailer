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

        const url = `${process.env.BASE_URL}auth/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, url, "please verify your account");




    } catch (error) {
        res.send('An error occured');
        console.log(error);
    }


});

router.get("/:id/verify/:token/", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send({ message: "Invalid link" });

        await User.findOneAndUpdate({ _id: user._id }, { verified: true })

        await token.remove();

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
