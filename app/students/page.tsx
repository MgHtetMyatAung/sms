import { prisma } from "@/lib/prisma";
import React from "react";
import StudentData from "./StudentData";

export default async function StudentsPage() {
  const students = await prisma.student.findMany();
  console.log(students);
  return (
    <div>
      <StudentData />
    </div>
  );
}
