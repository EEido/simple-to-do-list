import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  try {
    const { taskid } = await params;

    // Check if the id is a valid number before attempting to delete
    if (isNaN(taskid)) {
      return new NextResponse("Invalid ID provided", { status: 400 });
    }

    // Use Prisma to delete the task by its ID
    await prisma.task.delete({
      where: { id: parseInt(taskid) },
    });

    // Return a 204 status code (No Content) to signal success
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete task:", error);
    return new NextResponse("Failed to delete task", { status: 500 });
  }
}
