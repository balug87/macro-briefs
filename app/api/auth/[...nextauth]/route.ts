import { handlers } from "@/lib/auth";

// Auth.js v5 catches /api/auth/* here (GitHub callback + session).

export const { GET, POST } = handlers;
