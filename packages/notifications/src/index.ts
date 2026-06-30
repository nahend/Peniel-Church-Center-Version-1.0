import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { requiredEnv } from "@peniel/utils";

const getRegion = () => requiredEnv("AWS_REGION");
const getSourceEmail = () => requiredEnv("AWS_SES_SOURCE_EMAIL");
const getSesClient = () => new SESClient({ region: getRegion() });

export async function sendNotificationEmail({
  to,
  subject,
  html,
  text
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const sourceEmail = getSourceEmail();
  const client = getSesClient();
  const command = new SendEmailCommand({
    Destination: { ToAddresses: [to] },
    Message: {
      Body: {
        Html: { Charset: "UTF-8", Data: html },
        Text: { Charset: "UTF-8", Data: text }
      },
      Subject: { Charset: "UTF-8", Data: subject }
    },
    Source: sourceEmail
  });
  await client.send(command);
}

export function renderInviteEmail({ churchName, fullName, inviteLink }: { churchName: string; fullName: string; inviteLink: string }) {
  return {
    subject: `${churchName} Invitation to Join Church Center`,
    text: `Hello ${fullName},\n\nYou have been invited to join the ${churchName} Church Center portal. Use the link below to finish your setup:\n\n${inviteLink}\n\nIf you did not request this invitation, please ignore this message.`,
    html: `<div style="font-family: Inter, system-ui, sans-serif; color: #111"><h1>Welcome to ${churchName}</h1><p>Hello ${fullName},</p><p>You have been invited to join the ${churchName} Church Center portal.</p><p><strong>Get started:</strong> <a href="${inviteLink}" style="color: #0ea5e9">Open your invitation</a></p><p>If you did not request this, please ignore this email.</p></div>`
  };
}
