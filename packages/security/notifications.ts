import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { WebClient } from '@slack/web-api';
import { Telegraf } from 'telegraf';

interface NotificationConfig {
  channels: ('email' | 'sms' | 'slack' | 'telegram')[];
  templates: {
    info: string;
    warning: string;
    critical: string;
  };
  emailConfig: {
    service: 'SMTP' | 'SendGrid';
    serviceConfig: any;
  };
  smsConfig: {
    accountSid: string;
    authToken: string;
    from: string;
  };
  slackConfig: {
    token: string;
    channel: string;
  };
  telegramConfig: {
    token: string;
    chatId: string;
  };
}

class Notifications {
  private config: NotificationConfig;

  constructor(config: NotificationConfig) {
    this.config = config;
  }

  async sendNotification(level: 'info' | 'warning' | 'critical', message: string): Promise<void> {
    const { channels, templates } = this.config;
    const template = templates[level].replace('{message}', message);

    for (const channel of channels) {
      switch (channel) {
        case 'email':
          await this.sendEmail(template);
          break;
        case 'sms':
          await this.sendSMS(template);
          break;
        case 'slack':
          await this.sendSlackMessage(template);
          break;
        case 'telegram':
          await this.sendTelegramMessage(template);
          break;
      }
    }
  }

  private async sendEmail(message: string): Promise<void> {
    const { emailConfig } = this.config;
    const transporter = nodemailer.createTransport(emailConfig.serviceConfig);

    const mailOptions = {
      from: emailConfig.serviceConfig.auth.user,
      to: 'recipient@example.com', // Replace with actual recipient
      subject: 'Security Alert',
      text: message,
    };

    await transporter.sendMail(mailOptions);
  }

  private async sendSMS(message: string): Promise<void> {
    const { smsConfig } = this.config;
    const client = twilio(smsConfig.accountSid, smsConfig.authToken);

    await client.messages.create({
      body: message,
      from: smsConfig.from,
      to: 'recipient-phone-number', // Replace with actual recipient
    });
  }

  private async sendSlackMessage(message: string): Promise<void> {
    const { slackConfig } = this.config;
    const web = new WebClient(slackConfig.token);

    await web.chat.postMessage({
      channel: slackConfig.channel,
      text: message,
    });
  }

  private async sendTelegramMessage(message: string): Promise<void> {
    const { telegramConfig } = this.config;
    const bot = new Telegraf(telegramConfig.token);

    await bot.telegram.sendMessage(telegramConfig.chatId, message);
  }
}

export { Notifications, NotificationConfig };
