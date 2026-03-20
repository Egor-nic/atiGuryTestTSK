import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import { TAddRowFieldConfig, TAddRowFormValues } from "./ui/AddRowModal/types";

type TSortOption = {
  id: string;
  labelAsc: string;
  labelDesc: string;
};

type TAddRowConfig = {
  title?: string;
  submitText?: string;
  cancelText?: string;
  buttonText?: string;
  fields: TAddRowFieldConfig[];
};

export type TTableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  tableError?: string;
  sorting?: SortingState;
  pagination?: PaginationState;
  searchTerm?: string;
  sortOptions?: TSortOption[];
  onSortingChange?: (sortingState: SortingState) => void;
  onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
  onSearchTermChange?: (searchTermValue: string) => void;
  onRefresh?: () => void;
  total?: number;
  addRow?: TAddRowConfig;
  addRowValues?: TAddRowFormValues;
  onAddRowValuesChange?: (fieldName: string, value: string) => void;
  onAddRowSubmit?: (values: TAddRowFormValues) => void;
};
