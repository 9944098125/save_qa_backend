const twilio = require("twilio");

// Your Twilio account SID and Auth Token
const accountSid = "AC32e407234f2a8478bb529dfba9a9b55c";
const authToken = "d34a5c15c7efb1bf0cddbf22cb3f8c12";

// Your Twilio phone number (the one you obtained from Twilio)
const twilioPhoneNumber = "7995643201";

// Create a Twilio client
const client = twilio(accountSid, authToken);

// Create a function to send an OTP to the provided phone number
async function sendOTP(phoneNumber) {
  try {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // SMS content
    const smsContent = `Your OTP for Souvenir login is: ${otp}`;

    // Send the SMS
    const message = await client.messages.create({
      body: smsContent,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log("OTP sent:", message.sid);
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Error sending OTP");
  }
}

module.exports = { sendOTP };
