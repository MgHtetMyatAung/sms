"use client";

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { createStudent } from "@/servers/students/create";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

export default function AddStudent() {
  const [show, setShow] = useState(false);

  const addStudent = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = await prisma.student.create({
      data: {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        seatNumber: formData.get("seatNumber"),
        address: formData.get("address"),
      },
    });
    console.log(data);
  };

  return (
    <>
      <Button className=" bg-gray-800" onClick={() => setShow(!show)}>
        Add New
      </Button>
      {show && (
        <div className=" absolute top-0 left-0 bottom-0 right-0 w-full h-screen bg-[#333333c5] grid place-items-center">
          <div className=" p-3 bg-gray-50 rounded-md max-w-[400px]">
            <form onSubmit={addStudent} className="w-full">
              <input
                type="text"
                name="name"
                className=" p-2 w-full border"
                required
              />
              <input
                type="number"
                name="phone"
                className=" p-2 w-full border"
                required
              />
              <input
                type="email"
                name="email"
                className=" p-2 w-full border"
                required
              />
              <input
                type="number"
                name="seatNumber"
                className=" p-2 w-full border"
                required
              />
              <input
                type="text"
                name="address"
                className=" p-2 w-full border"
                required
              />
              <div className=" flex gap-3 items-center">
                <Button type="submit">Create</Button>
                <Button type="button" onClick={() => setShow(!show)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
