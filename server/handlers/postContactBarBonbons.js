const AWS = require('@aws-sdk/client-ses');
require("dotenv").config();

const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_SES_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const postContactBarBonbons= async (req, res) => {
  const { prenom, nom, email, telephone, date, evenement, extraInfo } = req.body;

  const params = {
    Source: 'confiseriesucrerose@gmail.com',
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <p>Prénom: ${prenom}</p>
            <p>Nom: ${nom}</p>
            <p>Courriel: ${email}</p>
            <p>Téléphone: ${telephone}</p>
            <p>Date: ${date}</p>
            <p>Évènement: ${evenement.join(", ")}</p>
            <p>Informations supplémentaires: ${extraInfo}</p>
          `,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `
            Prénom: ${prenom}
            Nom: ${nom}
            Courriel: ${email}
            Téléphone: ${telephone}
            Date: ${date}
            Évènement: ${evenement.join(", ")}
            Informations supplémentaires: ${extraInfo}
          `,
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Contact Pour Bar a Bonbons',
      },
    },
  };
  
  try {
    const result = await AWS_SES.sendEmail(params);
    res.status(200).json({ status: 200, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: 500, message: "Failed to send email.", error });
  }
};

module.exports = postContactBarBonbons;