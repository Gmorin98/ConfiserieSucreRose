import { Resend } from 'resend';
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const postContactBarBonbons = async (req, res) => {
  const { prenom, nom, email, telephone, date, evenement, extraInfo } = req.body;

  const htmlContent = `
    <p>Prénom: ${prenom}</p>
    <p>Nom: ${nom}</p>
    <p>Courriel: ${email}</p>
    <p>Téléphone: ${telephone}</p>
    <p>Date: ${date}</p>
    <p>Évènement: ${evenement.join(", ")}</p>
    <p>Informations supplémentaires: ${extraInfo}</p>
  `;

  const textContent = `
    Prénom: ${prenom}
    Nom: ${nom}
    Courriel: ${email}
    Téléphone: ${telephone}
    Date: ${date}
    Évènement: ${evenement.join(", ")}
    Informations supplémentaires: ${extraInfo}
  `;
  
  try {
    const result = await resend.emails.send({
      from: 'no-reply@confiseriesucrerose.ca',
      to: `confiseriesucrerose@gmail.com`,
      subject: 'Contact pour Bar à Bonbons',
      html: htmlContent,
      text: textContent
    });

    console.log("Email sent successfully:", result);
    res.status(200).json({ status: 200, message: "Email sent successfully!", result });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: 500, message: "Failed to send email.", error });
  }
};

module.exports = postContactBarBonbons;