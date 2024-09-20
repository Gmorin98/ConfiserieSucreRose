const AWS = require('@aws-sdk/client-ses');
const stripe = require('stripe')(process.env.STRIPE_KEY)

require("dotenv").config();
const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_SES_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const postNouvelleCommande = async (req, res) => {
  const { panierWithoutImg, customerEmail, customerName, orderNumber, sessionId } = req.body;
  
  try {
    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const amountPaid = (session.amount_total / 100).toFixed(2); // Stripe amount is in cents
    const phoneNumber = session.metadata.phone_number; // Retrieve the phone number.

    // Format panier data
    let htmlBody = '<h1>Nouvelle Commande en Ligne</h1>';
    let textBody = 'Nouvelle Commande en Ligne:\n';

    htmlBody += `<h2>Information Commande</h2>`;
    textBody += `Information Commande:\n`;

    htmlBody += `<p>Numéro de Commande: ${orderNumber}</p>`;
    textBody += `Numéro de Commande: ${orderNumber}\n`;

    htmlBody += `<p>Nom: ${customerName}</p>`;
    textBody += `Nom: ${customerName}:\n`;

    htmlBody += `<p>Courriel: ${customerEmail}</p>`;
    textBody += `Courriel: ${customerEmail}\n`;

    htmlBody += `<p>Numéro de Téléphone: ${phoneNumber}</p>`;
    textBody += `Numéro de Téléphone: ${phoneNumber}\n`;

    htmlBody += `<p><strong>Total Payé: $${amountPaid} CAD</strong></p>`;
    textBody += `Total Payé: $${amountPaid} CAD\n`;

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
  
    const result = await AWS_SES.sendEmail(params);
    res.status(200).json({ status: 200, message: "Email sent successfully!", result });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: 500, message: "Failed to send email.", error });
  }
};

module.exports = postNouvelleCommande;