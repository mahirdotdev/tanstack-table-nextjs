import { columns } from "@/components/column";
import { DataTable } from "@/components/data-table";
import { userMockup } from "@/lib/data";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-xl font-black">Belajar Data Table</h1>
      <DataTable columns={columns} data={userMockup?.map((a)=>({...a,name:`${a.name}|${a.username}`}))} pageSize={12} />
      </main>
  );
}
