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
  EquipmentEnums,
  EquipmentsContentType,
} from "../../app/reducers/equipments/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { getDetailedEquipmentsAction } from "../../app/reducers/equipments/actions";
import { EmptyString } from "../../app/helpers";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ code }) => {
  const detailedEquipments: EquipmentsContentType | null = useAppSelector(
    (state: RootState) => state.equipments.detailedEquipments
  );

  const isDetailedEquipmentsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, EquipmentEnums.getDetailedEquipments)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, EquipmentEnums.getDetailedEquipments)
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedEquipmentsAction(code || EmptyString));
  }, [dispatch, code]);

  return (
    <>
      {isDetailedEquipmentsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedEquipments && (
          <>
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedEquipments.id}
            />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedEquipments.code}
            />
            <FieldWithLabel
              label={t("columns.description")}
              name={detailedEquipments.description}
            />
            <FieldWithLabel
              label={t("columns.state_title")}
              name={detailedEquipments.state_title}
            />
            <FieldWithLabel
              label={t("columns.value")}
              name={detailedEquipments.value}
            />
            <FieldWithLabel
              label={t("columns.created_date")}
              name={detailedEquipments.created_date}
            />
            <FieldWithLabel
              label={t("columns.updated_date")}
              name={detailedEquipments.updated_date}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
