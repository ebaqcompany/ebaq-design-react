const allowedServices = new Set(["Brand Strategy", "Logo Design", "Brand Design", "Web Design", "Web Development", "Motion Graphics", "Other"]);
const field = (value, max) => typeof value === "string" && value.trim().length <= max ? value.trim() : "";

export default async function contact(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const data = req.body ?? {};
  const firstName = field(data.firstName, 100);
  const lastName = field(data.lastName, 100);
  const email = field(data.email, 254);
  const phone = field(data.phone, 40);
  const message = field(data.message, 5000);
  if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || data.investment !== true || !Array.isArray(data.services) || data.services.some((item) => !allowedServices.has(item))) {
    return res.status(400).json({ error: "Please check the required fields" });
  }
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !sender) return res.status(503).json({ error: "Contact delivery is not configured" });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: ["arek@ebaqdesign.com"],
        reply_to: email,
        subject: "New project inquiry",
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nServices: ${data.services.join(", ") || "Not selected"}\nReady to invest at least $3,000: Yes\n\nMessage:\n${message}`,
      }),
    });
    if (!response.ok) return res.status(502).json({ error: "Unable to send message" });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "Unable to send message" });
  }
}
