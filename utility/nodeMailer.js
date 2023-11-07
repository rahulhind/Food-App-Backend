const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
  // Create the transporter outside the sendMail function
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
      auth: {
        //Get your email and password from Google->Security->App Password
      user: "abc@gmail.com",
      pass: "xyz",
    },
    //debug: true,
  });

  var Osubject, Ohtml;
  // console.log(data.email);
  if (str == "signup") {
    Osubject = `Welcome to the Eras Tour`;
    Ohtml = `
        <h1>Taylor Swift</h1>
        <h3>Hope you have a good time!</h3>
       <h5>Name- ${data.name}</h5>
        <h5>Date- 9-11-23</h5>
        <h5>Venue- INOX,Bhubaneswar</h5>`;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
        <h1>Eras Tour</h1>
       <h3> Here is your reset password link!</h3>
        ${data.resetPasswordLink}`;
  }

  try {
    // console.log("Email coming ", data.email);
    const info = await transporter.sendMail({
      from: '"Taylor Swift Nation✨" <abc@gmail.com>',
      to: data.email, // Pass the recipient's email from the data object
      subject: Osubject,
      html: Ohtml,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending mail: ", err);
  }
};
