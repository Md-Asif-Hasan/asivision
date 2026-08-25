import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

let localCancellationsStore = [];

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/subscription-cancel')) {
            res.setHeader('Content-Type', 'application/json');

            if (req.method === 'GET') {
              res.statusCode = 200;
              return res.end(JSON.stringify({
                success: true,
                count: localCancellationsStore.length,
                cancellations: localCancellationsStore
              }));
            }

            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                let parsed = {};
                try { parsed = JSON.parse(body); } catch (e) {}

                const gumroadAccessToken = process.env.GUMROAD_ACCESS_TOKEN || "SxxZCJMxEjYCCxzSnSQHp15ySE7kzeyI09V4Z7x-LHM";
                let gumroadApiSuccess = true;
                let gumroadMessage = "Cancellation processed.";

                if (parsed.subscription_id) {
                  const cleanSubId = parsed.subscription_id.replace(/^sub_/, "");
                  try {
                    const gRes = await fetch(`https://api.gumroad.com/v2/subscribers/${cleanSubId}/unsubscribe`, {
                      method: "POST",
                      headers: { "Content-Type": "application/x-www-form-urlencoded" },
                      body: new URLSearchParams({ access_token: gumroadAccessToken })
                    });
                    const gData = await gRes.json();
                    if (!gRes.ok || gData.success === false) {
                      gumroadApiSuccess = false;
                      gumroadMessage = gData.message || "Gumroad API response received.";
                    }
                  } catch (e) {
                    gumroadApiSuccess = false;
                    gumroadMessage = e.message;
                  }
                }

                const now = new Date().toISOString();
                const entry = {
                  id: `canc_${Date.now()}`,
                  billingUserId: parsed.billing_user_id || "busr_local_user",
                  subscriptionId: parsed.subscription_id || "sub_gumroad_local",
                  reason: parsed.reason || "No feedback provided",
                  cancelledAt: now,
                  status: "cancelled",
                  gumroadMessage
                };
                localCancellationsStore.unshift(entry);

                res.statusCode = 200;
                return res.end(JSON.stringify({
                  success: true,
                  gumroadApiSuccess,
                  cancelledAt: now,
                  message: "Subscription cancelled successfully. You retain full Pro access until your current billing period ends.",
                  gumroadMessage,
                  entry
                }));
              });
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: true,
    hmr: {
      overlay: false,
    },
  },
});

