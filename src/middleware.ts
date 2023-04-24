import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname; // relative path

    // Manage route protection
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = pathname.startsWith("/");

    const sensitiveRoutes = ["/dashboard"];

    if (!isAuth) {
      if (!pathname.startsWith("/"))
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAuthPage) {
      if (isAuth) {
        if (!pathname.startsWith("/dashboard"))
          return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/dashboard/"],
};
