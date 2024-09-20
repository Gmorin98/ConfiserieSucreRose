const AWS = require('@aws-sdk/client-ses');

require("dotenv").config();
const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_SES_REGION,
};

// Might need to use SESClient instead, test it.
const AWS_SES = new AWS.SES(SES_CONFIG);
//const AWS_SES = new SESClient(SES_CONFIG);

const postConfirmationCommande = async (req, res) => {
  const { panierWithoutImg, customerName, orderNumber } = req.body;

  // Format panier data with greeting and footer
  let htmlBody = `<h1>Bonjour ${customerName},</h1><h1>Numéro de Commande: ${orderNumber}</h1><h1>Détails de la Commande</h1>`;
  let textBody = `Bonjour ${customerName},\n\nNuméro de Commande: ${orderNumber}\nDétails de la Commande:\n`;

  panierWithoutImg.forEach(item => {
    if (item.bonbonsSelectionne) {
      htmlBody += `<h2>${item.nom} (Quantité: ${item.quantity})</h2><ul>`;
      textBody += `${item.nom} (Quantité: ${item.quantity}):\n`;
      
      item.bonbonsSelectionne.forEach(bonbon => {
        htmlBody += `<li>${bonbon.nom} - Quantité: ${bonbon.quantite}</li>`;
        textBody += `  - ${bonbon.nom} - Quantité: ${bonbon.quantite}\n`;
      });
      
      htmlBody += '</ul>';
    } else {
      htmlBody += `<p>${item.nom} - Quantité: ${item.quantity}</p>`;
      textBody += `${item.nom} - Quantité: ${item.quantity}\n`;
    }
  });

  // Add footer
  htmlBody += `<p><strong>Toute commande sera prête dans un délai de 24 à 48 heures.</strong></p>`;
  textBody += `\nToute commande sera prête dans un délai de 24 à 48 heures.\n`;

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
        Data: 'Confirmation de Commande Confiserie Sucre Rose',
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

module.exports = postConfirmationCommande;