import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody, SubmitContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();

/** Escape user-controlled strings before interpolating into notification HTML. */
function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid submission. Please check all fields." });
    return;
  }

  const { name, email, phone, message } = parsed.data;

  try {
    await db.insert(contactSubmissionsTable).values({ name, email, phone: phone ?? null, message });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ error: "Failed to save submission. Please try again." });
    return;
  }

  // Notifications require SMTP_* secrets in the Replit/deployment environment.
  // Without them, submissions are still stored in Postgres (contact_submissions).
  const contactEmail = process.env.CONTACT_EMAIL || "contact@3stonesservices.com";
  const transporter = createTransporter();

  if (transporter) {
    try {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone || "—");
      const safeMessage = escapeHtml(message);

      await transporter.sendMail({
        from: `"3 Stones Services" <${process.env.SMTP_USER}>`,
        to: contactEmail,
        replyTo: email,
        subject: `New Lead: ${name}`,
        html: `
          <div style="font-family: monospace; background: #0a0a0a; color: #39ff14; padding: 24px; border: 1px solid #39ff14;">
            <h2 style="margin: 0 0 16px; color: #39ff14;">NEW CONTACT SUBMISSION</h2>
            <table style="width: 100%; border-collapse: collapse; color: #ccc;">
              <tr><td style="padding: 8px 0; color: #39ff14; width: 100px;">NAME</td><td>${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #39ff14;">EMAIL</td><td><a href="mailto:${safeEmail}" style="color: #39ff14;">${safeEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #39ff14;">PHONE</td><td>${safePhone}</td></tr>
              <tr><td style="padding: 8px 0; color: #39ff14; vertical-align: top;">MESSAGE</td><td style="white-space: pre-wrap;">${safeMessage}</td></tr>
            </table>
            <p style="margin: 16px 0 0; color: #555; font-size: 12px;">Submitted via 3stonesservices.com</p>
          </div>
        `,
      });
      req.log.info({ to: contactEmail }, "Contact email sent");
    } catch (err) {
      req.log.warn({ err }, "Email send failed — submission was saved to DB");
    }
  } else {
    req.log.info("SMTP not configured — submission saved to DB only");
  }

  const data = SubmitContactResponse.parse({ success: true, message: "Transmission received. We'll be in touch shortly." });
  res.json(data);
});

export default router;
