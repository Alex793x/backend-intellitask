import { APIError } from 'encore.dev/api';
import { Subscription } from 'encore.dev/pubsub';
import { resend } from '../config/email.config';
import {
  OrganizationInvitationEmailTopic,
  UserResetPasswordTopic,
  UserVerificationTopic,
} from '../../auth/api/auth.messaging';
import { appMeta } from 'encore.dev';

const sendEmail = async (email: string, subject: string, htmlContent: string) => {
  const msg = {
    from: 'info@intellioptima.com',
    to: email,
    subject: subject,
    html: htmlContent,
  };

  try {
    await resend.emails.send(msg);
  } catch (error) {
    console.error(error);
    throw APIError.internal('Failed to send email with Resend');
  }
};

new Subscription(UserVerificationTopic, 'user-verification-email', {
  handler: async (event) => {
    const { email, otp } = event;
    const subject = 'Welcome to IntelliOptima';
    //<a href=${BASE_URL}/verify-account?token=${token} style="color: #1a82e2;">Verify your email address</a>
    const htmlContent = `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
      <h2>Welcome to IntelliOptima, ${email.split('@')[0] ?? ''}!</h2>
      <p>We're excited to have you join our community of AI enthusiasts. At IntelliOptima, we believe in the power of artificial intelligence to enhance collaboration and innovation.</p>
      <h3 style="font-size: 18px; font-weight: bold; color: #d9534f;">
        Your verification code for your new signup: <span style="font-size: 24px; font-weight: bold; color: #d9534f;">${otp}</span>
      </h3>
      <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:info@intellioptima.com" style="color: #1a82e2;">info@intellioptima.com</a>.</p>
      <p>Thank you for choosing IntelliOptima. Let's collaborate and innovate together!</p>
      <p>Warm regards,<br>The IntelliOptima Team</p>
    </div>
    `;
    await sendEmail(email, subject, htmlContent);
  },
});

new Subscription(UserResetPasswordTopic, 'user-reset-password-email', {
  handler: async (event) => {
    const { email, otp } = event;
    const subject = 'Password reset for IntelliOptima';
    //<a href=${BASE_URL}/verify-account?token=${token} style="color: #1a82e2;">Verify your email address</a>
    const htmlContent = `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
    <h2>Hey ${email.split('@')[0] ?? ''}!</h2>
    <p>We received a request to reset your password for your IntelliOptima account. If you did not request this, please ignore this email.</p>
    <h3 style="font-size: 18px; font-weight: bold; color: #d9534f;">
      Your password reset code: <span style="font-size: 24px; font-weight: bold; color: #d9534f;">${otp}</span>
    </h3>
    <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:info@intellioptima.com" style="color: #1a82e2;">info@intellioptima.com</a>.</p>
    <p>Thank you for being a part of the IntelliOptima community. We are here to help you enhance your experience!</p>
    <p>Warm regards,<br>The IntelliOptima Team</p>
    </div>
    `;
    await sendEmail(email, subject, htmlContent);
  },
});

const INVITAION_LINK = appMeta().environment.type === 'development' ? 'http://localhost:3000/accept-invitation' : 'https://intellioptima.com/accept-invitation?';

new Subscription(OrganizationInvitationEmailTopic, 'organization-invitation-email', {
  handler: async (event) => {
    const { invitationId, email, invitedByUsername, organizationName } = event;
    const name = email.split('@')[0] ?? '';
    const subject = `You're Invited to Join ${organizationName}!`;
    const htmlContent = `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
      <h2>You're Invited to Join ${organizationName}, ${name}!</h2>
      <p>Hi ${name},</p>
      <p>${invitedByUsername} has invited you to join the ${organizationName} organization on IntelliOptima.</p>
      <p>To accept the invitation and start collaborating, please click the link below:</p>
      <p>
        <a href="${INVITAION_LINK}/${invitationId}/${email}" style="color: #1a82e2;">Accept Invitation</a>
      </p>
      <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@intellioptima.com" style="color: #1a82e2;">support@intellioptima.com</a>.</p>
      <p>Thank you for considering this opportunity. We look forward to having you on board!</p>
      <p>Warm regards,<br>The IntelliOptima Team</p>
    </div>
    `;
    await sendEmail(email, subject, htmlContent);
  },
});
