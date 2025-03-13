import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_USER, SMTP_PASS } from "./envs";
import { formData } from "../types/mailTypes";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendEmail = async (data: formData) => {
  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: "hannah.casier@me.com",
      subject: "Nieuwe Formulier Inzending",
      html: `
        <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Form Submission</title>
        <style>
            body {
                font-family: "Poppins", sans-serif;
                background-color: #121212;
                margin: 0;
                padding: 0;
                color: #ffffff;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background: #242424;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            .header {
                background: #ff00ff;
                color: #ffffff;
                text-align: center;
                padding: 15px;
                font-size: 22px;
                font-weight: bold;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
                font-size: 16px;
                color: #ffffff;
                line-height: 1.5;
            }
            .form-data {
                background: #2d2d2d;
                padding: 20px;
                border-radius: 4px;
                margin: 20px 0;
            }
            .form-group {
                margin-bottom: 15px;
            }
            .label {
                font-weight: 500;
                color: #ff00ff;
                margin-bottom: 5px;
            }
            .value {
                color: #ffffff;
                padding: 8px;
                background: #333;
                border-radius: 4px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #888;
                margin-top: 20px;
            }
            @media (max-width: 600px) {
                .container {
                    width: 95%;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Nieuwe Formulier Inzending</div>
            <div class="content">
                <p>Er is een nieuwe formulier inzending ontvangen met de volgende gegevens:</p>
                
                <div class="form-data">
                    <div class="form-group">
                        <div class="label">Naam:</div>
                        <div class="value">${data.naam}</div>
                    </div>
                    <div class="form-group">
                        <div class="label">Voornaam:</div>
                        <div class="value">${data.voornaam}</div>
                    </div>
                    <div class="form-group">
                        <div class="label">Geboortedatum:</div>
                        <div class="value">${data.geboortedatum}</div>
                    </div>
                    <div class="form-group">
                        <div class="label">Haarkleur:</div>
                        <div class="value">${data.haarkleur}</div>
                    </div>
                    <div class="form-group">
                        <div class="label">Lengte:</div>
                        <div class="value">${data.lengte} cm</div>
                    </div>
                    <div class="form-group">
                        <div class="label">Geslacht:</div>
                        <div class="value">${data.geslacht}</div>
                    </div>
                    <div class="form-group">
                        <div class="label">Opmerking:</div>
                        <div class="value">${
                          data.opmerking || "Geen opmerkingen"
                        }</div>
                    </div>
                </div>

                <p>Met vriendelijke groet,<br>Het Team</p>
            </div>
            <div class="footer">
                &copy; 2024 | Form Submission
            </div>
        </div>
    </body>
    </html>
          `,
    });
    console.log("Mail verstuurd");
    console.log(nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
