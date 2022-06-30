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
  PartnerEnums,
  PartnersContentType,
} from "../../app/reducers/partner/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { getDetailedPartnersAction } from "../../app/reducers/partner/actions";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedPartner: PartnersContentType | null = useAppSelector(
    (state: RootState) => state.partners.detailedPartners
  );

  const isDetailedPartnerFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PartnerEnums.getDetailedPartners)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PartnerEnums.getDetailedPartners)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedPartnersAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedPartnerFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedPartner && (
          <>
            <FieldWithLabel label={t("columns.id")} name={detailedPartner.id} />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedPartner.code}
            />
            <FieldWithLabel
              label={t("columns.company_code")}
              name={detailedPartner.company_code}
            />
            <FieldWithLabel
              label={t("columns.name")}
              name={detailedPartner.name}
            />
            <FieldWithLabel
              label={t("columns.type")}
              name={detailedPartner.type}
            />
            <FieldWithLabel
              label={t("columns.unloading_point_code")}
              name={detailedPartner.unloading_point_code}
            />
            <FieldWithLabel
              label={t("columns.unloading_point")}
              name={detailedPartner.unloading_point}
            />
            <FieldWithLabel
              label={t("columns.address")}
              name={detailedPartner.address}
            />
            <FieldWithLabel
              label={t("columns.customer")}
              name={detailedPartner.customer}
            />
            <FieldWithLabel label={"B2B"} value={detailedPartner.is_b2b} />
            <FieldWithLabel
              label={t("columns.market_name")}
              name={detailedPartner.market_name}
            />
            <FieldWithLabel
              label={t("columns.created_date")}
              name={detailedPartner.created_date}
            />
            <FieldWithLabel
              label={t("columns.updated_date")}
              name={detailedPartner.updated_date}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
