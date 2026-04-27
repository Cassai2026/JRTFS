import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Role-based access control - Sovereign Shield
    const rolePermissions: Record<string, string[]> = {
      "/dashboard": ["ADMIN", "DIRECTOR", "STAFF"],
      "/cases": ["ADMIN", "DIRECTOR", "STAFF"],
      "/audit": ["ADMIN", "DIRECTOR"],
      "/admin": ["ADMIN"],
      "/family": ["ADMIN", "DIRECTOR", "STAFF", "FAMILY"],
    };

    for (const [path, allowedRoles] of Object.entries(rolePermissions)) {
      if (pathname.startsWith(path)) {
        const userRole = (token as any)?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
        }
      }
    }

    // Zero-Extraction: add security headers
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
    );
    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/cases/:path*", "/audit/:path*", "/admin/:path*", "/api/cases/:path*", "/api/audit/:path*", "/api/admin/:path*"],
};
