import crypto from 'crypto';
import nodemailer from 'nodemailer';

interface AuthConfig {
  tokenLength: number;
  tokenType: 'hex' | 'base64';
  tokenExpiration: number;
  emailSubject: string;
  emailSender: string;
  emailService: 'SMTP' | 'SendGrid';
  emailServiceConfig: any;
}

class Auth {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  generateToken(): string {
    const { tokenLength, tokenType } = this.config;
    return crypto.randomBytes(tokenLength).toString(tokenType);
  }

  async sendEmail(recipient: string, token: string): Promise<void> {
    const { emailSubject, emailSender, emailService, emailServiceConfig } = this.config;

    let transporter;
    if (emailService === 'SMTP') {
      transporter = nodemailer.createTransport(emailServiceConfig);
    } else if (emailService === 'SendGrid') {
      transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: emailServiceConfig.user,
          pass: emailServiceConfig.pass,
        },
      });
    }

    const mailOptions = {
      from: emailSender,
      to: recipient,
      subject: emailSubject,
      text: `Your token is: ${token}`,
    };

    await transporter.sendMail(mailOptions);
  }
}

export { Auth, AuthConfig };
