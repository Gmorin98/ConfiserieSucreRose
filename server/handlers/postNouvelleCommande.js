// Might need to use import instead, test it.
const AWS = require('@aws-sdk/client-ses');

require("dotenv").config();
const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_SES_REGION,
};

//  Might need to use SESClient instead, test it.
const AWS_SES = new AWS.SES(SES_CONFIG);
//  const AWS_SES = new SESClient(SES_CONFIG);

const postNouvelleCommande = async (req, res) => {
  const { panierWithoutImg, customerEmail } = req.body;

  // Format panier data
  let htmlBody = '<h1>Détails de la Commande</h1>';
  let textBody = 'Détails de la Commande:\n';

  panierWithoutImg.forEach(item => {
    if (item.bonbonsSelectionne) {
      htmlBody += `<h2>${item.nom}</h2><ul>`;
      textBody += `${item.nom}:\n`;
      
      item.bonbonsSelectionne.forEach(bonbon => {
        htmlBody += `<li>${bonbon.nom} - Quantité: ${bonbon.quantite}g</li>`;
        textBody += `  - ${bonbon.nom} - Quantité: ${bonbon.quantite}g\n`;
      });
      
      htmlBody += '</ul>';
    } else {
      htmlBody += `<p>${item.nom} - Quantité: ${item.quantity}</p>`;
      textBody += `${item.nom} - Quantité: ${item.quantity}\n`;
    }
  });

  // Remove last newline character from textBody
  textBody = textBody.trim();
  
  const params = {
    Source: 'confiseriesucrerose@gmail.com',
    Destination: {
      ToAddresses: ['confiseriesucrerose@gmail.com'],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody,
        },
        Text: {
          Charset: 'UTF-8',
          Data: textBody,
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
    res.status(200).json({ status: 200, message: "Email sent successfully!", result });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: 500, message: "Failed to send email.", error });
  }
};

module.exports = postNouvelleCommande;