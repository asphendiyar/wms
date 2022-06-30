import { Column } from "react-table";
import { EmptyString, normalizeDate } from "../../../app/helpers";
import i18n from "../../../app/i18n";
import { DetailedCheckbox } from "../../Common/Checkbox/DetailedCheckBox";
import { ProductTableData } from "./Products";

export const tableColumns: Array<Column<ProductTableData>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code_sticky",
  },
  {
    Header: () => i18n.t("columns.description"),
    accessor: "description_sticky",
  },
  {
    Header: () => i18n.t("columns.barcodes"),
    accessor: "barcodes",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.created_date"),
    accessor: "created_date",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.updated_date"),
    accessor: "updated_date",
    Cell: (row) => normalizeDate(row.value),
  },
  {
    Header: () => i18n.t("columns.kit_type"),
    accessor: "kit_type_title",
  },
  {
    Header: () => i18n.t("columns.processing_type"),
    accessor: "processing_type_title",
  },
  {
    Header: () => i18n.t("columns.rotation"),
    accessor: "rotation_title",
  },
  {
    Header: () => i18n.t("columns.measure_unit"),
    accessor: "measure_unit",
  },
  {
    Header: () => i18n.t("columns.image_url"),
    accessor: "image_url",
  },
  {
    Header: () => i18n.t("columns.note"),
    accessor: "note",
  },
  {
    Header: () => i18n.t("columns.commodity_code"),
    accessor: "commodity_code",
  },
  {
    Header: () => i18n.t("columns.popularity_code"),
    accessor: "popularity_code",
  },
  {
    Header: () => i18n.t("columns.measure_state"),
    accessor: "measure_state_title",
  },
  {
    Header: () => i18n.t("columns.accuracy_of_production_date"),
    accessor: "accuracy_of_production_date_title",
  },
  {
    Header: () => i18n.t("columns.is_track_expiration_date"),
    accessor: "is_track_expiration_date",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
  {
    Header: () => i18n.t("columns.is_print_expiration_date"),
    accessor: "is_print_expiration_date",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
  {
    Header: () => i18n.t("columns.accuracy_of_expiration_date"),
    accessor: "accuracy_of_expiration_date_title",
  },
  {
    Header: () => i18n.t("columns.expiration_date"),
    accessor: "expiration_date",
  },
  {
    Header: () => i18n.t("columns.min_expiration_date_for_inbound"),
    accessor: "min_expiration_date_for_inbound",
  },
  {
    Header: () => i18n.t("columns.min_expiration_date_for_outbound"),
    accessor: "min_expiration_date_for_outbound",
  },
  {
    Header: () => i18n.t("columns.min_count_in_picking"),
    accessor: "min_count_in_picking",
  },
  {
    Header: () => i18n.t("columns.max_count_in_picking"),
    accessor: "max_count_in_picking",
  },
  {
    Header: () => i18n.t("columns.type_of_trade_item"),
    accessor: "type_of_trade_item",
  },
  {
    Header: () => i18n.t("columns.equipment_type"),
    accessor: "equipment_type",
  },
  {
    Header: () => i18n.t("columns.account_serial_number"),
    accessor: "account_serial_number_title",
  },
  {
    Header: () => i18n.t("columns.count_serial_number"),
    accessor: "count_serial_number",
  },
  {
    Header: () => i18n.t("columns.net_weight"),
    accessor: "net_weight",
  },
  {
    Header: () => i18n.t("columns.gross_weight"),
    accessor: "gross_weight",
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
    Header: () => i18n.t("columns.cell_height"),
    accessor: "cell_height",
  },
];
