import React, { useEffect } from "react";
import { EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthEnums } from "../../app/reducers/auth/types";
import {
  filterRequests,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { getOneUserAction } from "../../app/reducers/users/actions";
import { BaseUserFields } from "../../app/reducers/users/types";
import { SignInResponse } from "../../app/sagas/auth";
import { RootState } from "../../app/store";
import welcomeImage from "../../assets/images/WMS.png";
import { WelcomeWrapper } from "./style";
const Welcome: React.FC = () => {
  const loginInfo: SignInResponse | null = useAppSelector(
    (state: RootState) => state.auth.data
  );
  const oneUserData: BaseUserFields | null = useAppSelector(
    (state: RootState) => state.users.oneUserData
  );

  const isFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, AuthEnums.fetchSignIn)
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "WMS";
    if (isFetching === "success") {
      dispatch(getOneUserAction(loginInfo?.client_id || EmptyString));
      dispatch(filterRequests(AuthEnums.fetchSignIn));
    }
  });
  document.cookie = `Locale=EN`;
  oneUserData?.language &&
    localStorage.setItem("language", oneUserData?.language);

  return (
    <WelcomeWrapper>
      <img src={welcomeImage} alt={EmptyString} />
    </WelcomeWrapper>
  );
};
export default Welcome;
