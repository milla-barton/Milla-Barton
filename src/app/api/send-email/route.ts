import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { formData, formType } = await request.json();

    // Validate form data
    if (!formData || !formType) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Determine email content based on form type
    let subject, htmlContent;
    
    if (formType === 'quickquote') {
      subject = `Nouvelle demande de devis: ${formData.projectType || 'Nouveau projet'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px; background: #f9f9f9;">
          <div style="background: #000; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
            <h2 style="color: #fff; margin: 0;">Nouvelle demande de devis</h2>
          </div>
          
          <div style="padding: 20px; background: #fff; border-radius: 0 0 5px 5px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Type de projet:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.projectType || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Nombre de pièces:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.numberOfRooms || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Type de pièces:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.roomType || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Surface du bien:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.surfaceArea || 'Non spécifié'} m²</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Style de design:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.designStyle || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Code postal:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.postalCode || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Prénom:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.firstName || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${formData.email || 'Non spécifié'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Téléphone:</td>
                <td style="padding: 8px 0;">${formData.phone || 'Non spécifié'}</td>
              </tr>
              <tr>
              <td style="padding: 8px 0; font-weight: bold;">Notes sur votre projet:</td>
              <td style="padding: 8px 0;">${formData.note || 'Non spécifié'}</td>
            </tr>
            </table>
    
            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #777;">
              <p>Cette demande a été envoyée depuis le formulaire de devis rapide de votre site web.</p>
              <p>Date: ${new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>
        </div>
      `;
    } else if (formType === 'contact') {
      subject = `Nouveau message de contact: ${formData.subject || 'Sans sujet'}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background: #f9f9f9; border: 1px solid #eaeaea; border-radius: 5px;">
            <!-- Header -->
            <tr>
              <td style="background: #000; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                <h2 style="color: #fff; margin: 0;">Nouveau message de contact</h2>
              </td>
            </tr>
            
            <!-- Sender Info -->
            <tr>
              <td style="padding: 20px; background: #fff;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  
                  <!-- Subject and Date -->
                  <tr>
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Nom</td>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${formData.name || 'Anonyme'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Mail</td>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${formData.email || 'Email non fourni'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Sujet:</td>
                          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${formData.subject || 'Non spécifié'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0; font-weight: bold;">Date:</td>
                          <td style="padding: 10px 0;">
                            ${new Date().toLocaleDateString('fr-FR', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Message Content -->
                  <tr>
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8f8f8; border-radius: 5px; border-left: 3px solid #ddd;">
                        <tr>
                          <td style="padding: 15px;">
                            <h4 style="margin-top: 0; color: #444;">Message:</h4>
                            <p style="margin: 0; white-space: pre-line; line-height: 1.5;">${formData.message || 'Aucun message fourni'}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
                        <tr>
                          <td style="text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #777;">
                              Ce message a été envoyé via le formulaire de contact de votre site web.
                            </p>
                            <p style="margin: 5px 0 0 0; font-size: 12px; color: #777;">
                              <a href="mailto:${formData.email || ''}" style="color: #555; text-decoration: none;">Répondre à ce message</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `;
    } else {
      return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }

    // Mail options
    const mailOptions = {
      from: `"Website Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL, // your email address
      subject: subject,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}