"use client";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => {
      const tx = getValue() as string;
      const [name, username] = tx.split("|");
      return (
        <div>
          <strong>{name}</strong>
          <span className="text-sm text-gray-500"> {username}</span>
        </div>
      );
    },
  },
  {
    // Dot notation untuk nested property
    accessorKey: "company.name",
    header: "Company",
  },
];
