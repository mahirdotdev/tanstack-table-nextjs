"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React from "react";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize: number;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col  gap-3 md:justify-between md:items-center md:flex-row">
        <input
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          className="w-full md:w-72 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <div className="flex flex-wrap items-center gap-3">
          {table.getAllLeafColumns().map((column) => (
            <div key={column.id}>
              <label>
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={(e) =>
                    setColumnVisibility({
                      ...columnVisibility,
                      [column.id]: e.target.checked,
                    })
                  }
                />
                {column.id}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-medium"
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        <span>
                          {header.column.getIsSorted() === "asc" ? "🔼" : "🔽"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50/50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between">
          <div>
            Show {table.getRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length}
          </div>
          <div className="flex items-center mr-4  gap-2 ">
            <button
              className="px-2 py-1 rounded-md bg-gray-200"
              onClick={() => table.previousPage()}
            >
              Prev
            </button>
            <button
              className="px-2 py-1 rounded-md bg-gray-200"
              onClick={() => table.nextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
