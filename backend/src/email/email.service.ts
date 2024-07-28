import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private mailgunApiKey: string;
  private mailgunDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.mailgunApiKey = this.configService.get<string>('MAILGUN_API_KEY');
    this.mailgunDomain = this.configService.get<string>('MAILGUN_DOMAIN');
  }

  // Send email to an email(subject, text) account.
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const url = `https://api.mailgun.net/v3/${this.mailgunDomain}/messages`;
    const auth = Buffer.from(`api:${this.mailgunApiKey}`).toString('base64');

    const data = new URLSearchParams({
      from: `Excited User <mailgun@${this.mailgunDomain}>`,
      to,
      subject,
      text,
    });

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log('Email sent successfully', response.data);
    } catch (error) {
      console.error(
        'Error sending email:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
