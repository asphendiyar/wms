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
  PeriodicReservationEnums,
  PeriodicReservationsContentType,
} from "../../app/reducers/periodic-reservations/types";
import { getDetailedPeriodicReservationsAction } from "../../app/reducers/periodic-reservations/actions";
import { DetailPropTypes } from "../../app/commonTypes";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedPeriodicReservations: PeriodicReservationsContentType | null =
    useAppSelector(
      (state: RootState) =>
        state.periodicReservations.detailedPeriodicReservations
    );

  const isDetailedPeriodicReservationsFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PeriodicReservationEnums.getDetailedPeriodicReservations
    )
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(
      state,
      PeriodicReservationEnums.getDetailedPeriodicReservations
    )
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedPeriodicReservationsAction(id || 0));
  }, [dispatch, id]);

  return (
    <>
      {isDetailedPeriodicReservationsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedPeriodicReservations && (
          <>
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedPeriodicReservations.id}
            />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedPeriodicReservations.code}
            />
            <FieldWithLabel
              label={t("columns.warehouse_id")}
              name={detailedPeriodicReservations.warehouse_id}
            />
            <FieldWithLabel
              label={t("columns.type")}
              name={detailedPeriodicReservations.type}
            />
            <FieldWithLabel
              label={t("columns.functional_zone_id")}
              name={detailedPeriodicReservations.functional_zone_id}
            />
            <FieldWithLabel
              label={t("columns.partner_id")}
              name={detailedPeriodicReservations.partner_id}
            />
            <FieldWithLabel
              label={t("columns.route")}
              name={detailedPeriodicReservations.route}
            />
            <FieldWithLabel
              label={t("columns.started_date")}
              name={detailedPeriodicReservations.start_date}
            />
            <FieldWithLabel
              label={t("columns.end_date")}
              name={detailedPeriodicReservations.end_date}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
