import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1',
});

// Create SES client
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

export async function POST(req: Request) {
  try {
    // Parse request body
    const { name, email, phone, contactType } = await req.json();
    
    // Validate inputs
    if (!name || !email || !phone || !contactType) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate phone format
    const phoneRegex = /^[0-9()\-\s+]{8,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone format' },
        { status: 400 }
      );
    }
    
    // Email configuration
    const params = {
      Destination: {
        ToAddresses: [process.env.RECIPIENT_EMAIL || 'your-email@example.com'],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <html>
                <body>
                  <h1>Novo contato do site</h1>
                  <p><strong>Nome:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Telefone:</strong> ${phone}</p>
                  <p><strong>Tipo de contato:</strong> ${contactType === 'direct' ? 'Falar diretamente' : 'Deixar mensagem'}</p>
                  <hr>
                  <p>Este email foi enviado através do chatbot do site.</p>
                  <p><strong>Ação necessária:</strong> ${
                    contactType === 'direct' 
                      ? 'O cliente deseja ser contatado diretamente por telefone.' 
                      : 'O cliente prefere que você entre em contato para discutir o problema.'
                  }</p>
                </body>
              </html>
            `,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `
              Novo contato do site
              
              Nome: ${name}
              Email: ${email}
              Telefone: ${phone}
              Tipo de contato: ${contactType === 'direct' ? 'Falar diretamente' : 'Deixar mensagem'}
              
              Ação necessária: ${
                contactType === 'direct' 
                  ? 'O cliente deseja ser contatado diretamente por telefone.' 
                  : 'O cliente prefere que você entre em contato para discutir o problema.'
              }
              
              Este email foi enviado através do chatbot do site.
            `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Novo contato do chatbot: ${contactType === 'direct' ? 'Contato Telefônico' : 'Solicitação de Contato'}`,
        },
      },
      Source: process.env.SENDER_EMAIL || 'noreply@yourdomain.com',
      ReplyToAddresses: [email],
    };
    
    // Send email with SES
    await ses.sendEmail(params).promise();
    
    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}