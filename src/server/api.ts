import express from 'express';
import nodemailer from 'nodemailer';
import { EmailCredentials } from '../types';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  try {
    const { to, html, credentials } = req.body;
    const { email, appPassword }: EmailCredentials = credentials;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: appPassword,
      },
    });

    await transporter.sendMail({
      from: email,
      to: to.join(','),
      subject: 'Your Email Campaign',
      html,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;