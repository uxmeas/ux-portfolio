// submission-created.mts
// Netlify background function — auto-triggered when a Netlify Form submission arrives.
// Sends auto-reply to submitter + notification to Pheak via Resend.
// If this function fails, the form submission is already stored by Netlify Forms.

interface NetlifyEvent {
  body: string;
}

interface SubmissionPayload {
  ordered_human_fields: Array<{ name: string; value: string }>;
  data: Record<string, string>;
  form_name: string;
}

// Brand config map — add new products here as they launch
const BRAND_CONFIG: Record<string, {
  brandName: string;
  siteUrl: string;
  signOff: string;
  subjectPrefix: string;
  notifyEmail: string;
  pronoun: "I" | "We";
}> = {
  contact: {
    brandName: "UX Meas",
    siteUrl: "uxmeas.com",
    signOff: "Pheak",
    subjectPrefix: "UX Meas",
    notifyEmail: "hello@mzmlabs.com",
    pronoun: "I",
  },
  // Uncomment when Docs to Design launches:
  // "docstodesign-contact": {
  //   brandName: "Docs to Design",
  //   siteUrl: "docstodesign.com",
  //   signOff: "MZM Labs Team",
  //   subjectPrefix: "Docs to Design",
  //   notifyEmail: "hello@mzmlabs.com",
  //   pronoun: "We",
  // },
  // Uncomment when isoblock launches:
  // "isoblock-contact": {
  //   brandName: "isoblock",
  //   siteUrl: "isoblock.io",
  //   signOff: "MZM Labs Team",
  //   subjectPrefix: "isoblock",
  //   notifyEmail: "hello@mzmlabs.com",
  //   pronoun: "We",
  // },
};

const DEFAULT_BRAND = BRAND_CONFIG.contact;

function sanitize(input: string): string {
  return input.replace(/[\r\n\x00-\x1f]/g, " ").trim();
}

export default async (event: NetlifyEvent) => {
  let payload: SubmissionPayload;

  try {
    payload = JSON.parse(event.body).payload;
  } catch (err) {
    console.error("Failed to parse submission payload:", err);
    return;
  }

  const { data, form_name } = payload;
  const name = data.name || "";
  const email = data.email || "";
  const message = data.message || "";

  // Skip if honeypot was filled (spam)
  if (data["bot-field"]) {
    console.log("Honeypot triggered, skipping auto-reply");
    return;
  }

  // Skip if no valid email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.log("No valid email, skipping auto-reply");
    return;
  }

  const brand = BRAND_CONFIG[form_name] || DEFAULT_BRAND;
  const safeName = sanitize(name);
  const apiKey = Netlify.env.get("RESEND_API_KEY") || process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return;
  }

  // --- Email 1: Auto-reply to submitter ---
  const autoReplyText = [
    `Hi ${safeName},`,
    "",
    `Thanks for reaching out through ${brand.siteUrl}. ${brand.pronoun} received your message and will get back to you within 24-48 hours.`,
    "",
    `\u2014 ${brand.signOff}`,
    brand.siteUrl,
  ].join("\n");

  try {
    const replyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `MZM Labs <hello@mzmlabs.com>`,
        to: [email],
        reply_to: "hello@mzmlabs.com",
        subject: `Got your message \u2014 ${brand.subjectPrefix}`,
        text: autoReplyText,
      }),
    });

    if (!replyRes.ok) {
      console.error("Auto-reply failed:", await replyRes.text());
    } else {
      console.log(`Auto-reply sent to ${email} for ${form_name}`);
    }
  } catch (err) {
    console.error("Auto-reply send error:", err);
  }

  // --- Email 2: Notification to Pheak ---
  const notificationText = [
    `New contact form submission via ${brand.brandName}`,
    "",
    `Name: ${safeName}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const notifyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `MZM Labs <hello@mzmlabs.com>`,
        to: [brand.notifyEmail],
        reply_to: email,
        subject: `New contact: ${safeName} \u2014 via ${brand.brandName}`,
        text: notificationText,
      }),
    });

    if (!notifyRes.ok) {
      console.error("Notification failed:", await notifyRes.text());
    } else {
      console.log(`Notification sent to ${brand.notifyEmail} for ${form_name}`);
    }
  } catch (err) {
    console.error("Notification send error:", err);
  }
};
