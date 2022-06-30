import { Column } from "react-table";
import { EmptyString } from "../../app/helpers";
import i18n from "../../app/i18n";
import { CellTypesContentType } from "../../app/reducers/cell-types/types";
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox";

export const tableColumns: Array<Column<CellTypesContentType>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name_ru",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.length"),
    accessor: "length",
  },
  {
    Header: () => i18n.t("columns.width"),
    accessor: "width",
  },
  {
    Header: () => i18n.t("columns.height"),
    accessor: "height",
  },
  {
    Header: () => i18n.t("columns.volume"),
    accessor: "volume",
  },
  {
    Header: () => i18n.t("columns.weight"),
    accessor: "weight",
  },
  {
    Header: () => i18n.t("columns.tolerance"),
    accessor: "tolerance",
  },
  {
    Header: () => i18n.t("columns.storage_type"),
    accessor: "storage_type",
  },
  {
    Header: () => i18n.t("columns.rotation"),
    accessor: "rotation",
  },

  {
    Header: () => i18n.t("columns.is_follow_the_sequence"),
    accessor: "is_follow_the_sequence",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
];
