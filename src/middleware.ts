import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const loggedInRoutes = (process.env.LOGGED_IN_ROUTES || "").split(",");
const loggedOutRoutes = ["/"];

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const requiresAuth = loggedInRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  const isLoggedOutRoute = loggedOutRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  const token = req.cookies.get("token");

  if (!token && requiresAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (token && isLoggedOutRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
