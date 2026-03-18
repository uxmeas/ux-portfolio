const ALLOWED_ORIGINS = [
  "https://uxmeas.com",
  "https://www.uxmeas.com",
  "https://uxmeas.netlify.app",
  "https://staging--uxmeas.netlify.app",
];

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function sanitize(input: string): string {
  return input.replace(/[\r\n\x00-\x1f]/g, " ").trim();
}

export default async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }

  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await request.json();
  const { name, email, need, message, honeypot } = body;

  // Honeypot: if filled, silently succeed (spam trap)
  if (honeypot) {
    return Response.json({ success: true }, { headers: corsHeaders(request) });
  }

  // Validate required fields
  const errors: Record<string, string> = {};
  if (!name || name.trim().length === 0) errors.name = "Name is required";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";
  if (!need) errors.need = "Please select what you need";
  if (!message || message.trim().length < 10) errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length > 0) {
    return Response.json({ success: false, errors }, { status: 400, headers: corsHeaders(request) });
  }

  const safeName = sanitize(name);

  const lines = [
    `Name: ${safeName}`,
    `Email: ${email}`,
    `Need: ${need}`,
    "",
    message,
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // @ts-expect-error - RESEND_API_KEY is set in Netlify environment
        Authorization: `Bearer ${Netlify.env.get("RESEND_API_KEY") || process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Pheak Meas <hello@mzmlabs.com>",
        to: ["hello@mzmlabs.com"],
        reply_to: email,
        subject: `New inquiry: ${safeName} — ${need}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return Response.json(
        { success: false, errors: { _form: "Failed to send. Please try again." } },
        { status: 502, headers: corsHeaders(request) },
      );
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return Response.json(
      { success: false, errors: { _form: "Failed to send. Please try again." } },
      { status: 502, headers: corsHeaders(request) },
    );
  }

  return Response.json({ success: true }, { headers: corsHeaders(request) });
};
