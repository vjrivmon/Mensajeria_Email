import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import type { EmailCredentials } from '../types';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});