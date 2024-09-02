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

const postNouvelleCommande= async (req, res) => {
  const { prenom } = req.body;
  
  const params = {
    Source: 'gabriel.morin98@gmail.com',
    Destination: {
      ToAddresses: `gabriel.morin98@gmail.com`,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
            <p>Prénom: ${prenom}</p>
          `,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `
            Prénom: ${prenom}
            Nom: ${nom}
            Email: ${email}
            Téléphone: ${telephone}
            Date: ${date}
            Évènement: ${evenement.join(", ")}
            Informations supplémentaires: ${extraInfo}
          `,
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Nouvelle Commande En Ligne',
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

module.exports = postNouvelleCommande;