import React, { useMemo } from "react";
import { Column } from "react-table";
import { EmptyString, normalizeDate } from "../../app/helpers";
import { useAppSelector } from "../../app/hooks";
import i18n from "../../app/i18n";
import { ProductContentType } from "../../app/reducers/product-catalog/types";
import { RootState } from "../../app/store";
import { TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";

interface StandardMeasurementsTable {
  id: number;
  denominator: number;
  id_measurements: number;
  code: string;
  created_date: string;
  updated_date: string;
  name: string;
  state: string;
}

const tableColumns: Array<Column<StandardMeasurementsTable>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.state"),
    accessor: "state",
  },
  {
    Header: () => i18n.t("columns.denominator"),
    accessor: "denominator",
  },
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
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

const TableEP: React.FC = () => {
  const detailedProduct: ProductContentType | null = useAppSelector(
    (state: RootState) => state.productCatalog.detailedProduct
  );

  const data: StandardMeasurementsTable[] = useMemo(
    (): StandardMeasurementsTable[] =>
      detailedProduct
        ? detailedProduct.standard_measurements.map((item) => ({
            ...item,
            id_measurements: item.measure_unit.id,
            code: item.measure_unit.code,
            created_date: item.measure_unit.created_date,
            updated_date: item.measure_unit.updated_date,
            name: item.measure_unit.name,
            state: item.measure_unit.state,
          }))
        : [],
    [detailedProduct]
  );

  return (
    <TableWrapper>
      <CustomTable<StandardMeasurementsTable>
        columns={tableColumns}
        data={data}
        selectedRow={EmptyString}
      />
    </TableWrapper>
  );
};

export default TableEP;
