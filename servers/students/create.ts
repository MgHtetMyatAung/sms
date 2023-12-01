"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createStudent(formData: FormData) {
  try {
    const data = await prisma.student
      .create({
        data: {
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          seatNumber: formData.get("seatNumber"),
          address: formData.get("address"),
        },
      })
      .then((res) => {
        if (res.createdAt) {
          revalidatePath("/students");
        }
      });
  } catch (error) {
    console.log(error);
  }
  console.log(
    formData.get("name"),
    formData.get("phone"),
    formData.get("email"),
    formData.get("address")
  );
}
