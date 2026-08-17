export const COOKIE_NAME = "applet_auth";

const encoder = new TextEncoder();

async function hmacKey(password: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signToken(password: string, value: string): Promise<string> {
  const signature = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(password),
    encoder.encode(value),
  );
  return `${value}.${toHex(signature)}`;
}

export async function verifyToken(
  password: string,
  token: string | undefined,
): Promise<boolean> {
  if (!password || !token) return false;
  const index = token.lastIndexOf(".");
  if (index === -1) return false;
  const expected = await signToken(password, token.slice(0, index));
  return expected === token;
}
