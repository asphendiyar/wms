import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  appColors,
  checkPrivilege,
  randomNumberIdGenerator,
} from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import { getSearchAllWarehouseAction } from "../../app/reducers/warehouse/actions";
import {
  WarehouseContentType,
  WarehouseEnums,
} from "../../app/reducers/warehouse/types";
import { RootState } from "../../app/store";
import Alert, { AlertListItem } from "../Common/Alert";
import IconButton from "../Common/Button/icon";
import { FieldWithLabel } from "../Common/DetailsComponent";
import { LoadingIcon } from "../Common/LoadingIcon";
import Modal from "../Common/Modal";
import { ActionGroupWrapper } from "../Common/styled";
import { WarehouseForm } from "./Forms/WarehouseForm";

export const Details: React.FC = () => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  );

  const isWarehouseDetailsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.getDetailedWarehouse)
  );
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.getDetailedWarehouse)
  );
  // fetching status Warehouses
  const isFetchingPostWarehouses = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postWarehouse)
  );

  const fetchErrorPostWarehouses = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.postWarehouse)
  );

  const isFetchingPutWarehouses = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putWarehouse)
  );
  const fetchErrorPutWarehouses = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.putWarehouse)
  );

  const [alertList, setAlertList] = useState<AlertListItem[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const handleCloseFormModal = () => {
    setModal(false);
  };

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (isFetchingPostWarehouses === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postWarehouse));
          },
        },
      ]);
      dispatch(getSearchAllWarehouseAction({ page: 1 }));
      handleCloseFormModal();
    }
    if (isFetchingPutWarehouses === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putWarehouse));
          },
        },
      ]);
      dispatch(getSearchAllWarehouseAction({ page: 1 }));
      handleCloseFormModal();
    }
    if (isFetchingPostWarehouses === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostWarehouses?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postWarehouse));
          },
        },
      ]);
    if (isFetchingPutWarehouses === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutWarehouses?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putWarehouse));
          },
        },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostWarehouses,
    fetchErrorPutWarehouses,
    isFetchingPostWarehouses,
    isFetchingPutWarehouses,
  ]);
  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />
      <Modal
        open={modal}
        title={t("buttons.edit")}
        onClose={handleCloseFormModal}
        className="side"
      >
        <WarehouseForm editMode onClose={() => setModal(false)} />
      </Modal>

      <ActionGroupWrapper>
        <IconButton onClick={() => null} popupText={t("buttons.export")}>
          <RiFileExcel2Line />
        </IconButton>
        {checkPrivilege("WarehouseBrw", "Modify") && (
          <IconButton
            onClick={() => {
              setModal(true);
            }}
            popupText={t("buttons.edit")}
          >
            <AiOutlineEdit />
          </IconButton>
        )}
      </ActionGroupWrapper>

      {isWarehouseDetailsFetching === "pending" ? (
        <LoadingIcon />
      ) : reqFailed ? (
        <div>{reqFailed.message}</div>
      ) : (
        detailedWarehouse && (
          <div className="blocks-body__wrapper">
            <FieldWithLabel
              label={t("columns.id")}
              name={detailedWarehouse.id}
            />
            <FieldWithLabel
              label={t("columns.code")}
              name={detailedWarehouse.code}
            />
            <FieldWithLabel
              label={t("columns.name")}
              name={detailedWarehouse.name}
            />
          </div>
        )
      )}
    </>
  );
};

export default Details;
