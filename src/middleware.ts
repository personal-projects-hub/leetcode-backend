import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CORS_CONFIG: { [key: string]: string } = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, DELETE, PATCH, POST, PUT, OPTIONS",
    "Access-Control-Allow-Headers":
        "X-CSRF-Token, Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

export default async function middleware(
    req: NextRequest
): Promise<Response | undefined> {
    let res = NextResponse.next();

    if (req.method === "OPTIONS") {
        res = NextResponse.json({ message: "ok" }, { status: 200 });
    }

    Object.keys(CORS_CONFIG).forEach((key) => {
        const value = CORS_CONFIG[key];

        res.headers.append(key, value);
    });

    return res;
}

export const config = {
    matcher: "/:path*",
};
