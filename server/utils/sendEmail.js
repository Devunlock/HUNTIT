const sendEmail = async (options) => {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
    if (!BREVO_API_KEY) {
      console.error("Brevo API key is not defined in environment variables");
      throw new Error("BMissing Email Api Key");
    }

    const data = {
      sender: {
        name: "HUNTIT SOLUTIONS",
        email: process.env.USER_EMAIL,
      },
      to: [{ email: options.email }],
      subject: options.subject,
      htmlContent: options.message,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Email sent successfully via Brevo", result.messageId);
    } else {
      console.error("Brevo API Key Error:", result);
      throw new Error(result.message || "Could not send emial via Brevo");
    }
  } catch (error) {
    onsole.error("Brevo Email Error:", result);
    throw new Error("Could not send emial via Brevo");
  }
};

export default sendEmail;
