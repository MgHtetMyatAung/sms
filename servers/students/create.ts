"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export async function createStudent(formData: FormData) {
//   try {
//     const data = await prisma.student
//       .create({
//         data: {
//           name: formData.get("name"),
//           phone: formData.get("phone"),
//           email: formData.get("email"),
//           seatNumber: formData.get("seatNumber"),
//           address: formData.get("address"),
//         },
//       })
//       .then((res) => {
//         if (res.createdAt) {
//           revalidatePath("/students");
//           redirect("/students?show=false");
//         }
//       });
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function deleteStudent(dataId: number) {
  try {
    await prisma.student.delete({
      where: {
        id: dataId,
      },
    });
    revalidatePath("/students");
  } catch (error) {}
}
