import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("failed, the error is:", error);
    return new NextResponse("failed", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, done } = await request.json();
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        done,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);
    return new NextResponse("Failed to create task", { status: 500 });
  }
}
