import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.role === "ADMIN" || token?.role === "SUPER_ADMIN";
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
