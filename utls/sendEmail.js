
const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: 'a.kiran.boyle@gmail.com',
                pass: process.env.PASSWORD,
            },
            secure: true,
        });

        await transporter.sendMail({
            from: 'a.kiran.boyle@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });
        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return error;
    }
};