import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// This file must be in app/api/auth/[...nextauth]/route.ts
// Run setup.sh to rename folders automatically
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
