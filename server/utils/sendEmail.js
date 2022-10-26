const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			service: process.env.EMAIL_SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.EMAIL_SECURE),
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.APP_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL_HOST,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.error("username: ", process.env.EMAIL_USERNAME, "password: ", process.env.EMAIL_PASSWORD);
		console.log(error);
		return error;
	}
};