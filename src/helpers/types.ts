export enum CellValue {
  X = "X",
  O = "O",
}

export type Cell = CellValue | null;
export type Board = Cell[][];
