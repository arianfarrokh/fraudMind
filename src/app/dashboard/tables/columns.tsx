import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useTranslation } from "@/providers/translation";
import { DeleteActionItem, EditActionItem } from "@/components";
import { columnTypeMap } from "@/utils/enums-map";

export const useFieldColumns = (
  onDelete: (id: number) => void
): GridColDef[] => {
  const { t } = useTranslation("form");

  return [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "title", headerName: t("form", "title"), flex: 1 },
    {
      field: "columnType",
      headerName: t("form", "type"),
      width: 120,
      type: "singleSelect",
      valueGetter: (value) => columnTypeMap.get(value),
      valueOptions: () => columnTypeMap.values().toArray(),
    },
    {
      field: "isNullable",
      headerName: t("form", "required"),
      width: 120,
      type: "boolean",
    },
    {
      field: "isUnique",
      headerName: t("form", "unique"),
      width: 120,
      type: "boolean",
    },
    { field: "description", headerName: t("form", "description"), flex: 1 },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: ({ id }) => [
        <DeleteActionItem
          key="delete"
          rowId={Number(id)}
          onClick={() => onDelete(id as number)}
        />,
      ],
    },
  ];
};
