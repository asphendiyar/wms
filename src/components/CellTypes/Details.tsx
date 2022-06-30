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
  CellTypeEnums,
  CellTypesContentType,
} from "../../app/reducers/cell-types/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { getDetailedCellTypesAction } from "../../app/reducers/cell-types/actions";
import { EmptyString } from "../../app/helpers";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ code }) => {
  const detailedCellType: CellTypesContentType | null = useAppSelector(
    (state: RootState) => state.cellTypes.detailedCellType
  );

  const isDetailedCellTypeFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, CellTypeEnums.getDetailedCellTypes)
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, CellTypeEnums.getDetailedCellTypes)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedCellTypesAction(code || EmptyString));
  }, [dispatch, code]);

  return (
    <>
      {isDetailedCellTypeFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedCellType && (
          <>
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedCellType.id}
            />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedCellType.code}
            />
            <FieldWithLabel
              label={t("columns.name")}
              name={detailedCellType.name_ru}
            />
            <FieldWithLabel
              label={t("columns.type")}
              name={detailedCellType.type}
            />
            <FieldWithLabel
              label={t("columns.length")}
              name={detailedCellType.length}
            />
            <FieldWithLabel
              label={t("columns.width")}
              name={detailedCellType.width}
            />
            <FieldWithLabel
              label={t("columns.height")}
              name={detailedCellType.height}
            />
            <FieldWithLabel
              label={t("columns.volume")}
              name={detailedCellType.volume}
            />
            <FieldWithLabel
              label={t("columns.weight")}
              name={detailedCellType.weight}
            />
            <FieldWithLabel
              label={t("columns.tolerance")}
              name={detailedCellType.tolerance}
            />
            <FieldWithLabel
              label={t("columns.storage_type")}
              name={detailedCellType.storage_type}
            />
            <FieldWithLabel
              label={t("columns.error_email")}
              name={detailedCellType.rotation}
            />
            <FieldWithLabel
              label={t("columns.is_follow_the_sequence")}
              value={detailedCellType.is_follow_the_sequence}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
