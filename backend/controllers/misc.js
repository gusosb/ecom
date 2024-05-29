const nodemailer = require("nodemailer");
const miscRouter = require("express").Router();

miscRouter.post("/email", async (request, response) => {
  const { email } = request.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.strato.com",
    port: 465,
    secure: true,
    auth: {
      user: "admin@evocorp.se",
      pass: "dfx*PAF*dqy9mkw-dca",
    },
  });

  const mailOptions = {
    from: "admin@evocorp.se",
    to: "gustav@evocorp.se",
    subject: "New evocorp.se contact request",
    text: `email provided: ${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return response.status(500).json();
    } else {
      console.log("Email sent: " + info.response);
      return response.status(201).json();
    }
  });
});

module.exports = miscRouter;
