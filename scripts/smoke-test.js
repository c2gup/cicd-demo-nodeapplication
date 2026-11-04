const http = require("http");

const PORT = process.env.PORT || 3000;
const HOST = "http://localhost:" + PORT;

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`${HOST}${path}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      })
      .on("error", reject);
  });
}

async function runSmokeTest() {
  console.log(`Starting smoke tests against ${HOST}...`);

  // Wait for server to become ready by polling /health (up to 15 retries)
  let ready = false;
  for (let i = 1; i <= 15; i++) {
    try {
      const res = await fetchUrl("/health");
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch {
      console.log(`[${i}/15] Waiting for server to become ready...`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  if (!ready) {
    console.error("❌ Smoke Test FAILED: Server is not reachable on port " + PORT);
    process.exit(1);
  }

  // 1. Health Endpoint Check (GET /health)
  console.log("Checking Health Endpoint: GET /health ...");
  const healthRes = await fetchUrl("/health");
  const healthJson = JSON.parse(healthRes.body || "{}");
  if (healthRes.status !== 200 || healthJson.status !== "UP") {
    console.error(`❌ Health Check FAILED: status=${healthRes.status}, body=${healthRes.body}`);
    process.exit(1);
  }
  console.log(`✅ GET /health passed! (Server Status: ${healthJson.status}, Uptime: ${healthJson.uptime.toFixed(1)}s)`);

  // 2. Home Route Check (GET /)
  console.log("Checking Home Route: GET / ...");
  const rootRes = await fetchUrl("/");
  if (rootRes.status !== 200 || !rootRes.body.includes("Hello World!")) {
    console.error(`❌ Smoke Test FAILED on GET / : ${JSON.stringify(rootRes)}`);
    process.exit(1);
  }
  console.log("✅ GET / passed!");

  // 3. API Route Check (GET /user)
  console.log("Checking API Route: GET /user ...");
  const userRes = await fetchUrl("/user");
  if (userRes.status !== 200) {
    console.error(`❌ Smoke Test FAILED on GET /user : status ${userRes.status}`);
    process.exit(1);
  }
  console.log("✅ GET /user passed!");

  console.log("🎉 All Smoke Tests PASSED successfully!");
}

runSmokeTest();
