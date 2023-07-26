const nodemailer = require("nodemailer");

// Create a function to send the registration email
async function sendRegistrationEmail(email) {
  try {
    // Create a transporter using your email service credentials
    const transporter = nodemailer.createTransport({
      service: "Gmail", // service provider
      auth: {
        user: "srinivas72075@gmail.com", // Replace with your email address
        pass: "kbty hojp wbje opet", // Replace with your email password
      },
    });

    // Email content
    const mailOptions = {
      from: "srinivas72075@gmail.com", // Replace with your email address
      to: email,
      subject: "Welcome, you can Souvenir now...",
      html: `
       You have successfully registered
       with us ${email?.split("@")[0]}, login and 
       enjoy saving your question 
       and answers
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendRegistrationEmail };
