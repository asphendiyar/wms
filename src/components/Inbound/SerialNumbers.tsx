import React, { useEffect, useMemo } from "react";
import { Column } from "react-table";
import { EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import i18n from "../../app/i18n";
import { setSelectedInboundProduct } from "../../app/reducers/inbound";
import { InboundDetailsTable } from "../../app/reducers/inbound/types";
import { RootState } from "../../app/store";
import { TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";

export type SerialNumberTable = {
  id: string;
  serial_number: string;
};

const tableColumns: Array<Column<SerialNumberTable>> = [
  {
    Header: () => i18n.t("columns.id"),
    accessor: "id",
  },
  {
    Header: () => i18n.t("columns.serial_number"),
    accessor: "serial_number",
  },
];

const SerialNumbers: React.FC = () => {
  const selectedInboundProduct: InboundDetailsTable | null = useAppSelector(
    (state: RootState) => state.inbound.selectedInboundProduct
  );

  const data: SerialNumberTable[] = useMemo(
    (): SerialNumberTable[] =>
      selectedInboundProduct?.serials
        ? selectedInboundProduct.serials.map((item) => ({
            id: item,
            serial_number: item,
          }))
        : [],
    [selectedInboundProduct]
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    return function () {
      dispatch(setSelectedInboundProduct(null));
    };
  }, [dispatch]);

  return (
    <>
      {selectedInboundProduct?.serials ? (
        <TableWrapper>
          <CustomTable<SerialNumberTable>
            columns={tableColumns}
            data={data}
            selectedRow={EmptyString}
          />
        </TableWrapper>
      ) : (
        "no serial numbers"
      )}
    </>
  );
};

export default SerialNumbers;
