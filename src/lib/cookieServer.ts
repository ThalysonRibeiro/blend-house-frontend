import { cookies } from "next/headers";

export async function getCookieServer() {
  const cookiesServer = await cookies();
  const token = cookiesServer.get("session")?.value;

  return token || null;
}