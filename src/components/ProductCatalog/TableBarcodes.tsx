import React, { useMemo } from "react";
import { Column } from "react-table";
import { EmptyString } from "../../app/helpers";
import { useAppSelector } from "../../app/hooks";
import i18n from "../../app/i18n";
import { ProductContentType } from "../../app/reducers/product-catalog/types";
import { RootState } from "../../app/store";
import { DetailedCheckbox } from "../Common/Checkbox/DetailedCheckBox";
import { TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";

export interface BarcodesTableData {
  id?: string;
  code: string;
  type: string;
  is_primary: boolean;
}

const tableColumns: Array<Column<BarcodesTableData>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.type"),
    accessor: "type",
  },
  {
    Header: () => i18n.t("columns.is_primary"),
    accessor: "is_primary",
    Cell: (row) => <DetailedCheckbox desc={EmptyString} checkedd={row.value} />,
  },
];

const TableBarcodes: React.FC = () => {
  const detailedProduct: ProductContentType | null = useAppSelector(
    (state: RootState) => state.productCatalog.detailedProduct
  );

  const data: BarcodesTableData[] = useMemo(
    (): BarcodesTableData[] =>
      detailedProduct
        ? detailedProduct.barcodes.map((item) => ({
            ...item,
          }))
        : [],
    [detailedProduct]
  );

  return (
    <TableWrapper>
      <CustomTable<BarcodesTableData>
        columns={tableColumns}
        data={data}
        selectedRow={EmptyString}
      />
    </TableWrapper>
  );
};

export default TableBarcodes;
