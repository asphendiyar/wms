import { Column } from "react-table";
import { EmptyString, normalizeDate } from "../../app/helpers";
import i18n from "../../app/i18n";
import { PickingOrdersBase } from "../../app/reducers/picking-orders/types";
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox";

export const tableColumns: Array<Column<PickingOrdersBase>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.outbound_id"),
    accessor: "outbound_id",
  },

  {
    Header: () => i18n.t("columns.state_title"),
    accessor: "state_title",
  },

  {
    Header: () => i18n.t("columns.route"),
    accessor: "route",
  },
  {
    Header: () => i18n.t("columns.functional_zone_code"),
    accessor: "functional_zone_code",
  },
  {
    Header: () => i18n.t("columns.planned_shipping_date"),
    accessor: "planned_shipping_date",
  },

  {
    Header: () => i18n.t("columns.trade_item_type"),
    accessor: "trade_item_type",
  },

  {
    Header: () => i18n.t("columns.is_picking_allowed"),
    accessor: "is_picking_allowed",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },

  {
    Header: () => i18n.t("columns.is_not_enough_quantity_in_func_zone"),
    accessor: "is_not_enough_quantity_in_func_zone",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },

  {
    Header: () => i18n.t("columns.is_not_enough_quantity_in_warehouse"),
    accessor: "is_not_enough_quantity_in_warehouse",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },

  {
    Header: () => i18n.t("columns.do_not_delay"),
    accessor: "do_not_delay",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },

  {
    Header: () => i18n.t("columns.number_of_lines"),
    accessor: "number_of_lines",
  },
  {
    Header: () => i18n.t("columns.volume"),
    accessor: "volume",
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
    Header: () => i18n.t("columns.ordered_quantity"),
    accessor: "ordered_quantity",
  },
  {
    Header: () => i18n.t("columns.actual_quantity"),
    accessor: "actual_quantity",
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
];
