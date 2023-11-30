import DataTable from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import React from "react";
import AddStudent from "./AddStudent";

interface Heads {
  id: number;
  name: string;
}

const heads: Heads[] = [
  {
    id: 1,
    name: "No",
  },
  {
    id: 2,
    name: "Name",
  },
  {
    id: 3,
    name: "Phone",
  },
  {
    id: 4,
    name: "Email",
  },
  {
    id: 5,
    name: "Address",
  },
  {
    id: 6,
    name: "Actions",
  },
];

export default function StudentData({ datas }) {
  return (
    <section className=" my-5">
      <div className=" py-3 flex justify-between items-center">
        <h1 className=" text-lg text-gray-700 font-semibold">Students List</h1>
        <AddStudent />
      </div>
      <DataTable heads={heads} datas={datas} />
    </section>
  );
}
