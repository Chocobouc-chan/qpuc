export { default } from "next-auth/middleware";

// TODO explicit config for protected routes for auth users and admin routes

export const config = { matcher: ["/qpuc/:path*"] };
