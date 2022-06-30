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
  ErpWarehouseEnums,
  ErpWarehousesContentType,
} from "../../app/reducers/erp-warehouses/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { getDetailedErpWarehousesAction } from "../../app/reducers/erp-warehouses/actions";
import { EmptyString } from "../../app/helpers";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedERPwarehouse: ErpWarehousesContentType | null = useAppSelector(
    (state: RootState) => state.erpWarehouses.detailedErpWarehouse
  );

  const isDetailedERPwarehouseFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.getDetailedErpWarehouses)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, ErpWarehouseEnums.getDetailedErpWarehouses)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedErpWarehousesAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedERPwarehouseFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedERPwarehouse && (
          <>
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedERPwarehouse.id}
            />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedERPwarehouse.code}
            />

            <FieldWithLabel
              label={t("columns.state_title")}
              name={detailedERPwarehouse.state_title}
            />
            <FieldWithLabel
              label={t("columns.name")}
              name={detailedERPwarehouse.name}
            />
            <FieldWithLabel
              label={t("columns.type")}
              name={detailedERPwarehouse.type}
            />
            <FieldWithLabel
              label={t("columns.warehouse_id")}
              name={detailedERPwarehouse.warehouse_id}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
