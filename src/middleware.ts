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

    const sensitiveRoutes = ["/recommendations"];

    const isSensitive = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!isAuth && !pathname.startsWith("/")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isAuth && isSensitive) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isAuthPage) {
      if (isAuth && !pathname.startsWith("/recommendations")) {
        return NextResponse.redirect(new URL("/recommendations", req.url));
      }
      return null;
    }
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/recommendations"],
};
