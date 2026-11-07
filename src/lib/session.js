import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("Please define SESSION_SECRET in .env.local");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 + 60 * 60 * 1000);
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithm: ["HS256"],
    });
    return { userId: payload.userId };
  } catch (error) {
    return null;
  }
}
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
