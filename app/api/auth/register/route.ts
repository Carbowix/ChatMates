import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/util";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, username }: {email: string, password: string, username: string} = await req.json();
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username },
        { email: email },
      ],
    },
  });
  if (userExists) {
    return NextResponse.json({ error: "An account with same email or username already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        image: '/user.png',
        username,
        name: username,
        email,
        password: await hashPassword(password),
      },
    });
    return NextResponse.json(user);
  }
}
