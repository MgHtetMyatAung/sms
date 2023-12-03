import { deleteStudent } from "@/servers/students/create";
import { Trash2 } from "lucide-react";

export default function Table({ heads, datas }) {
  return (
    <table className="border-collapse w-full">
      <thead>
        <tr>
          {heads.map((head) => (
            <th key={head.id} className=" text-sm text-gray-700 text-start">
              {head.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.map((data) => (
          <tr key={data.id}>
            <td>{data.seatNumber}</td>
            <td>{data.name}</td>
            <td>{data.phone}</td>
            <td>{data.email}</td>
            <td>{data.address}</td>
            <td>
              <div className="">
                <form action={deleteStudent.bind(null, data.id)}>
                  <button>
                    <Trash2 size={20} color="#fd4e4e" />
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
