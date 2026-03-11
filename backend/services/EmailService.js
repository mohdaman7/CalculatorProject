const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendOTP(email, otp) {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@epiccalculator.in',
            to: email,
            subject: 'Your Calculator Access Key',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 10px;">
          <h2 style="color: #f59e0b; text-align: center;">Calculator Access Key</h2>
          <p>Hello,</p>
          <p>You requested an access key to log in to the Calculator PWA. Please use the following 6-digit code:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1f2937; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            &copy; ${new Date().getFullYear()} Calculator Team. Secured by Email Verification.
          </p>
        </div>
      `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            return { success: true };
        } catch (error) {
            console.error('Error sending email:', error);
            // Fallback to console in development if SMTP is not configured
            if (process.env.NODE_ENV === 'development') {
                console.log('\n========================================');
                console.log(`[EMAIL OTP] Email: ${email}`);
                console.log(`[EMAIL OTP] Code: ${otp}`);
                console.log('========================================\n');
                return { success: true, mock: true };
            }
            return { success: false, error: error.message };
        }
    }
}

module.exports = new EmailService();
