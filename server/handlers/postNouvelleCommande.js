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
    const phoneNumber = session.customer_details.phone; // Retrieve the phone number.

    // Format panier data
    let htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Sacramento, cursive;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                width: 100%;
                margin: 0 auto;
                background-color: #FAE6E8;
                color: #B63643;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                border-radius: 15px;
            }
            h1, h2, ul {
                color: #B63643;
            }
            ul {
                padding-left: 20px;
                display: flex;
                flex-direction: column;
            }
            li {
                list-style-type: none;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
                color: #B63643;
            }
            .items {
                background-color: #ffffff;
                padding: 5px 10px;
                border-radius: 10px;
            }
            .footer {
                font-size: 14px;
                color: #B63643;
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #B63643;
            }
            @media only screen and (max-width: 600px) {
                .email-container {
                    padding: 10px;
                }
                h1 {
                    font-size: 24px;
                }
                h2 {
                    font-size: 18px;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
          <h1>Nouvelle Commande en Ligne</h1>
          <h2>Information Commande</h2>
          <p>Numéro de Commande: ${orderNumber}</p>
          <p>Nom: ${customerName}</p>
          <p>Courriel: ${customerEmail}</p>
          <p>Numéro de Téléphone: ${phoneNumber}</p>
          <p><strong>Total Payé: $${amountPaid} CAD</strong></p>
          <div class="items">`

    let textBody = `
      Nouvelle Commande en Ligne:\n
      Information Commande:\n
      Numéro de Commande: ${orderNumber}\n
      Nom: ${customerName}:\n
      Courriel: ${customerEmail}\n
      Numéro de Téléphone: ${phoneNumber}\n
      Total Payé: $${amountPaid} CAD\n
    `;

    panierWithoutImg.forEach(item => {
      if (item.bonbonsSelectionne) {
        htmlBody += `<p>${item.nom}</p><ul>`;
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

    htmlBody += `</div>`
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