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
  CommoditiesContentType,
  CommodityEnums,
} from "../../app/reducers/commodities/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { getDetailedCommoditiesAction } from "../../app/reducers/commodities/actions";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ code }) => {
  const detailedCommodities: CommoditiesContentType | null = useAppSelector(
    (state: RootState) => state.commodities.detailedCommodities
  );

  const isDetailedCommoditiesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, CommodityEnums.getDetailedCommodities)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, CommodityEnums.getDetailedCommodities)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedCommoditiesAction(code || EmptyString));
  }, [dispatch, code]);

  return (
    <>
      {isDetailedCommoditiesFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedCommodities && (
          <>
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedCommodities.id}
            />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedCommodities.code}
            />
            <FieldWithLabel
              label={t("columns.description")}
              name={detailedCommodities.description}
            />
            <FieldWithLabel
              label={t("columns.state_title")}
              name={detailedCommodities.state_title}
            />
            <FieldWithLabel
              label={t("columns.value")}
              name={detailedCommodities.value}
            />
            <FieldWithLabel
              label={t("columns.created_date")}
              name={detailedCommodities.created_date}
            />
            <FieldWithLabel
              label={t("columns.updated_date")}
              name={detailedCommodities.updated_date}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
