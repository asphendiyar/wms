import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlineWarning,
} from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import Select from "react-select";
import { ReactSelectValues } from "../../app/commonTypes";
import {
  appColors,
  checkPrivilege,
  customStyles,
  customTheme,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../app/reducers/requests";
import {
  getAllWarehouseAction,
  getDetailedWarehouseAction,
  getSearchAllWarehouseAction,
} from "../../app/reducers/warehouse/actions";
import {
  selectWarehouse,
  selectWarehouseList,
} from "../../app/reducers/warehouse/selectors";
import {
  WarehouseContentType,
  WarehouseEnums,
} from "../../app/reducers/warehouse/types";
import { RootState } from "../../app/store";
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg";
import Alert, { AlertListItem } from "../Common/Alert";
import IconButton from "../Common/Button/icon";
import Modal from "../Common/Modal";
import SelectMenuButton from "../Common/rscc";
import { ActionGroupWrapper } from "../Common/styled";
import Details from "./Details";
import { WarehouseForm } from "./Forms/WarehouseForm";

export interface WarehouseTableData {
  id: number;
  state: string;
  code: string;
  name: string;
}

type FilterOptions = { value: string | number; label: string };

const Warehouse: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const warehousesList = useAppSelector(selectWarehouseList);

  const { total_pages, number } = useAppSelector(selectWarehouse);

  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
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
  const [detailsModal, setDetailModal] = useState<boolean>(false);

  const [selectedFilterOption, setSelectedFilterOption] =
    useState<FilterOptions | null>(null);

  const handleCloseFormModal = () => {
    setModal(false);
  };

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
  useEffect(() => {
    dispatch(getSearchAllWarehouseAction({ page: 1 }));
  }, [dispatch]);

  const handleClickMoreBtn = () => {
    dispatch(getAllWarehouseAction({ page: number + 1 }));
  };

  return (
    <>
      <Alert alertList={alertList} timeout={5000} autoDelete />

      <Modal
        open={modal}
        title={t("buttons.new")}
        onClose={handleCloseFormModal}
        className="side"
      >
        <WarehouseForm editMode={false} onClose={() => setModal(false)} />
      </Modal>
      <Modal
        open={detailsModal}
        title="Детали склада"
        onClose={() => setDetailModal(false)}
        className="side"
      >
        <Details />
      </Modal>
      <Select<ReactSelectValues>
        className="selectWrapper"
        options={warehousesList}
        placeholder={t("placeholders.selectWarehouse")}
        theme={customTheme}
        components={{
          MenuList: (props) => (
            <SelectMenuButton
              total_pages={total_pages}
              number={number}
              onClick={handleClickMoreBtn}
              {...props}
            />
          ),
        }}
        styles={customStyles()}
        menuPosition="fixed"
        onChange={(i) => {
          dispatch(
            getDetailedWarehouseAction(i?.value.toString() || EmptyString)
          );

          setSelectedFilterOption(i);
        }}
        value={warehousesList.find((item) => item === selectedFilterOption)}
        isSearchable={true}
      />
      <ActionGroupWrapper>
        {checkPrivilege("WarehouseBrw", "Browse") && (
          <IconButton
            onClick={
              detailedWarehouse
                ? () => setDetailModal(true)
                : () => {
                    setAlertList([
                      ...alertList,
                      {
                        id: randomNumberIdGenerator(),
                        title: t("alerts.warning"),
                        message: t("alerts.warningMessage"),
                        icon: AiOutlineWarning,
                        bgColor: appColors.warning,
                      },
                    ]);
                  }
            }
            popupText={t("buttons.details")}
          >
            <DetailsIcon />
          </IconButton>
        )}
        {checkPrivilege("WarehouseBrw", "Create") && (
          <IconButton
            onClick={() => {
              setModal(true);
            }}
            popupText={t("buttons.new")}
          >
            <AiOutlinePlus />
          </IconButton>
        )}
      </ActionGroupWrapper>
    </>
  );
};

export default Warehouse;
