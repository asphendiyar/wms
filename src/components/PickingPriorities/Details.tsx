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
  PickingPrioritiesContentType,
  PickingPriorityEnums,
} from "../../app/reducers/picking-priority/types";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { getDetailedPickingPrioritiesAction } from "../../app/reducers/picking-priority/actions";
import { useTranslation } from "react-i18next";

export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedPickingPriorities: PickingPrioritiesContentType | null =
    useAppSelector(
      (state: RootState) => state.pickingPriorities.detailedPickingPriorities
    );

  const isDetailedPickingPrioritiesFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      PickingPriorityEnums.getDetailedPickingPriorities
    )
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, PickingPriorityEnums.getDetailedPickingPriorities)
  );

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedPickingPrioritiesAction(id?.toString() || EmptyString));
  }, [dispatch, id]);

  return (
    <>
      {isDetailedPickingPrioritiesFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedPickingPriorities && (
          <>
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedPickingPriorities.id}
            />
            <FieldWithLabel
              label={t("columns.state_title")}
              name={detailedPickingPriorities.state_title}
            />
            <FieldWithLabel
              label={t("columns.priority")}
              name={detailedPickingPriorities.priority}
            />
            <FieldWithLabel
              label={t("columns.route")}
              name={detailedPickingPriorities.route}
            />

            <FieldWithLabel
              label={t("columns.created_date")}
              name={detailedPickingPriorities.created_date}
            />
            <FieldWithLabel
              label={t("columns.updated_date")}
              name={detailedPickingPriorities.updated_date}
            />
          </>
        )
      )}
    </>
  );
};

export default Details;
