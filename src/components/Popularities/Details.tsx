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
  PopularitiesContentType,
  PopularityEnums,
} from "../../app/reducers/popularities/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { getDetailedPopularitiesAction } from "../../app/reducers/popularities/actions";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ code }) => {
  const detailedPopularities: PopularitiesContentType | null = useAppSelector(
    (state: RootState) => state.popularities.detailedPopularities
  );

  const isDetailedPopularitiesFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, PopularityEnums.getDetailedPopularities)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PopularityEnums.getDetailedPopularities)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedPopularitiesAction(code || EmptyString));
  }, [dispatch, code]);

  return (
    <>
      {isDetailedPopularitiesFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedPopularities && (
          <>
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedPopularities.id}
            />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedPopularities.code}
            />
            <FieldWithLabel
              label={t("columns.description")}
              name={detailedPopularities.description}
            />
            <FieldWithLabel
              label={t("columns.state_title")}
              name={detailedPopularities.state_title}
            />
            <FieldWithLabel
              label={t("columns.value")}
              name={detailedPopularities.value}
            />
            <FieldWithLabel
              label={t("columns.created_date")}
              name={detailedPopularities.created_date}
            />
            <FieldWithLabel
              label={t("columns.updated_date")}
              name={detailedPopularities.updated_date}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
