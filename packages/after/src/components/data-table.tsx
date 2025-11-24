import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Column<T> {
  key: string;
  label: string;
  field?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField?: keyof T;
}

export function DataTable<T extends object>({
  columns,
  data,
  keyField = "id" as keyof T,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={String(row[keyField])}
            className="even:bg-muted/50 hover:bg-muted"
          >
            {columns.map((column) => {
              const field = column.field ?? (column.key as keyof T);
              return (
                <TableCell key={column.key} className={column.className}>
                  {column.render
                    ? column.render(row)
                    : String(row[field] ?? "")}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
