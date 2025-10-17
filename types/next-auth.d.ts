import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    email: string;
    name?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    accessToken?: string;
  }
}

