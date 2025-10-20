export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Step 1: GitHub redirects back with ?code=...
  if (url.searchParams.has("code")) {
    const code = url.searchParams.get("code");

    // Exchange code for access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenRes.json();

    return new Response(JSON.stringify(tokenData), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Step 2: Initial request from Decap CMS
  return new Response(
    JSON.stringify({ error: "Missing ?code param from GitHub OAuth" }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}
