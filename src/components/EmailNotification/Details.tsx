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
  EmailNotificationEnums,
  EmailNotificationContentType,
} from "../../app/reducers/email-notification/types";
import { DetailsWrapper } from "../Common/styled";
import { DetailPropTypes } from "../../app/commonTypes";
import { EmptyString } from "../../app/helpers";
import { getDetailedEmailNotificationAction } from "../../app/reducers/email-notification/actions";
import { useTranslation } from "react-i18next";
export const Details: React.FC<DetailPropTypes> = ({ id }) => {
  const detailedEmailNotification: EmailNotificationContentType | null =
    useAppSelector(
      (state: RootState) => state.emailNotification.detailedEmailNotification
    );

  const isDetailedEmailNotificationFetching = useAppSelector((state) =>
    namedRequestsInProgress(
      state,
      EmailNotificationEnums.getDetailedEmailNotification
    )
  );

  const reqFailed = useAppSelector((state) =>
    namedRequestError(
      state,
      EmailNotificationEnums.getDetailedEmailNotification
    )
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDetailedEmailNotificationAction(id?.toString() || EmptyString));
  }, [dispatch, id]);
  return (
    <>
      {isDetailedEmailNotificationFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedEmailNotification && (
          <DetailsWrapper>
            <FieldWithLabel
              label={t("columns.state")}
              name={detailedEmailNotification.state}
            />
          </DetailsWrapper>
        )
      )}
    </>
  );
};

export default Details;
