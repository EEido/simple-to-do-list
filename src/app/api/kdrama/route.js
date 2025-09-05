import { PrismaClient } from "@generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const kdrama = await prisma.kdrama.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(kdrama);
  } catch (error) {
    console.error("Failed to get kdrama data", error);
  }
}
