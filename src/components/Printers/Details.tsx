import React, { useEffect } from "react";
import { FieldWithLabel } from "../Common/DetailsComponent";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { LoadingIcon } from "../Common/LoadingIcon";
import {
  PrintersEnums,
  PrintersContentType,
} from "../../app/reducers/printers/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { useTranslation } from "react-i18next";
import { getDetailedPrintersAction } from "../../app/reducers/printers/action";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedPrinter: PrintersContentType | null = useAppSelector(
    (state: RootState) => state.printers.detailedPrinters
  );

  const isDetailedPrinterFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PrintersEnums.getDetailedPrinters)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PrintersEnums.getDetailedPrinters)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedPrintersAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedPrinterFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedPrinter && (
          <>
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedPrinter.code}
            />
            <FieldWithLabel
              label={t("columns.name")}
              name={detailedPrinter.name}
            />
            <FieldWithLabel
              label={t("columns.state")}
              name={detailedPrinter.state}
            />
            <FieldWithLabel
              label={t("columns.type")}
              name={detailedPrinter.type}
            />
            <FieldWithLabel
              label={t("columns.queue")}
              name={detailedPrinter.queue}
            />
            <FieldWithLabel
              label={t("columns.port")}
              name={detailedPrinter.port}
            />
            <FieldWithLabel
              label={t("columns.warehouse_id")}
              name={detailedPrinter.warehouse_id}
            />
            <FieldWithLabel
              label={t("columns.created_date")}
              name={detailedPrinter.created_date}
            />
            <FieldWithLabel
              label={t("columns.updated_date")}
              name={detailedPrinter.updated_date}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
