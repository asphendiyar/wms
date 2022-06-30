import React, { useMemo } from "react";
import { Column } from "react-table";
import { EmptyString } from "../../app/helpers";
import { useAppSelector } from "../../app/hooks";
import { PickingTasksTable } from "../../app/reducers/picking-orders/types";
import { RootState } from "../../app/store";
import { TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";
import i18n from "../../app/i18n";

const tableColumns: Array<Column<PickingTasksTable>> = [
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type_title",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state_title",
  },
  {
    Header: () => i18n.t("columns.description"),
    accessor: "description",
  },
  {
    Header: () => i18n.t("columns.warehouse_id"),
    accessor: "warehouse_id",
  },
  {
    Header: () => i18n.t("columns.sku"),
    accessor: "sku",
  },
  {
    Header: () => i18n.t("columns.functional_zone_code"),
    accessor: "functional_zone_code",
  },
  {
    Header: () => i18n.t("columns.route"),
    accessor: "route",
  },
  {
    Header: () => i18n.t("columns.quantity"),
    accessor: "quantity",
  },
  {
    Header: () => i18n.t("columns.actual_quantity"),
    accessor: "actual_quantity",
  },
];

const PickingTasks: React.FC = () => {
  const allPickingTasks: PickingTasksTable[] = useAppSelector(
    (state: RootState) => state.pickingOrders.pickingTasks
  );

  const data: PickingTasksTable[] = useMemo(
    (): PickingTasksTable[] =>
      allPickingTasks
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          allPickingTasks.map((item: any) => ({
            ...item,
          }))
        : [],
    [allPickingTasks]
  );

  return (
    <>
      <TableWrapper>
        <CustomTable<PickingTasksTable>
          columns={tableColumns}
          data={data}
          selectedRow={EmptyString}
        />
      </TableWrapper>
    </>
  );
};

export default PickingTasks;
