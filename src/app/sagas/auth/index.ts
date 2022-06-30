import { all, takeEvery } from "@redux-saga/core/effects";
import { BASE_URL, pathnames } from "../../pathnames";
import { WorkerParams } from "../../commonTypes";
import { fetchHelper } from "../../helpers";
import { FormValues, setDataOnSignOut, setUserData } from "../../reducers/auth";
import { fetchGenerator } from "..";
import { AuthEnums, ScopeType } from "../../reducers/auth/types";

export type SignInResponse = {
  client_id: string;
  expires_at: string;
  scope: ScopeType;
};

export type SignOutResponse = {
  code: string;
  status: string;
  message: string;
};

const signIn = async (data: FormValues) => {
  return fetchHelper<FormValues>(
    `${BASE_URL + pathnames.signIn}`,
    "POST",
    data
  );
};

const signOut = async () => {
  return fetchHelper(`${BASE_URL + pathnames.signOut}`, "POST");
};

function* signInWorker({ payload, type }: WorkerParams<FormValues>) {
  yield fetchGenerator<FormValues, SignInResponse>(
    signIn,
    payload,
    setUserData,
    type
  );
}
function* signOutWorker({ payload, type }: WorkerParams<{}>) {
  yield fetchGenerator<{}, SignOutResponse>(
    signOut,
    payload,
    setDataOnSignOut,
    type
  );
}

export function* authWatcher() {
  yield all([
    takeEvery(AuthEnums.fetchSignIn, signInWorker),
    takeEvery(AuthEnums.fetchSignOut, signOutWorker),
  ]);
}
