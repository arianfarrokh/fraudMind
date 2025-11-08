type ColumnType = "BIG_INT" | "DATE_TIME" | "INT" | "STRING";

type FraudMindColumnType = {
  id: ID;
  tableId: ID;
  name: string;
  title: string;
  description?: string;
  columnType: ColumnType;
  columnIndex: number;
  isNullable: boolean;
  isUnique: boolean;
};

type FraudMindTableType = {
  id: ID;
  name: string;
  description?: string;
  fraudMindColumns: FraudMindColumnType[];
};

type AddNewTableVariable = {
  id: ID;
  fraudMindSchemaId: ID;
  name: string;
  description?: string;
  columns: FraudMindColumnType[];
};

type AddNewColumnsVariable = {
  id: ID;
  title: string;
  description?: string;
  name: string;
  columnType: ColumnType;
  columnIndex: number;
  isNullable: boolean;
  isUnique: boolean;
  fraudMindTableId: ID;
};
