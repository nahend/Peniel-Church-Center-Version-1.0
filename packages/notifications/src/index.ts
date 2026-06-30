export interface NotificationMessage { to: string; subject: string; html: string; text: string; }
export const invitationEmail = (name: string, url: string): NotificationMessage => ({ to: "", subject: "You are invited to Peniel Church Center", html: `<p>Hi ${name}, create your secure account: <a href="${url}">${url}</a></p>`, text: `Hi ${name}, create your secure account: ${url}` });
