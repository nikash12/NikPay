export { auth as middleware } from "@/auth.user"

import { handlers } from "@/auth.merchant"
export const { GET, POST } = handlers
