// The handler reads the raw stream and never accesses Vercel's lazy req.body helper.
export { calWebhook as default } from '../lib/conversions/http.mjs';
