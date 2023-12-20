import type { APIHandler } from "@solidjs/start/server"

export const GET: APIHandler = async ({ params }) => {
  return {
    region: process.env.VERCEL_REGION ?? "hello",
  }
}
