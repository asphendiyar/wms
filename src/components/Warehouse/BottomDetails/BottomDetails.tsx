import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineWarning,
} from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { RiFileExcel2Line } from "react-icons/ri";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import {
  appColors,
  EmptyString,
  randomNumberIdGenerator,
} from "../../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  ErpWarehouseEnums,
  ErpWarehousesContentType,
} from "../../../app/reducers/erp-warehouses/types";
import {
  filterRequests,
  namedRequestError,
  namedRequestsInProgress,
} from "../../../app/reducers/requests";
import {
  getAllCommodityWarehouseAction,
  getAllEquipmentsWarehouseAction,
  getAllPopularityWarehouseAction,
  getDetailedWarehouseAction,
} from "../../../app/reducers/warehouse/actions";
import {
  AddressesTypes,
  FunctionalZones,
  WarehouseContentType,
  WarehouseECPType,
  WarehouseEnums,
} from "../../../app/reducers/warehouse/types";
import { RootState } from "../../../app/store";
import Alert, { AlertListItem } from "../../Common/Alert";
import IconButton from "../../Common/Button/icon";
import { ChooseData } from "../../Common/ChooseData";
import { LoadingIcon } from "../../Common/LoadingIcon";
import Modal from "../../Common/Modal";
import { ActionGroupWrapper } from "../../Common/styled";
import { CreateAdressesForm } from "../Forms/AdressesForm";
import { CreateCommodityForm } from "../Forms/CommodityForm";
import { CreateEquipmentForm } from "../Forms/EquipmentForm";
import { ErpWarehouseForm } from "../Forms/ErpWarehouseForm";
import { CreateFZoneForm } from "../Forms/FZoneForm";
import { CreatePopularityForm } from "../Forms/PopularityForm";
import TableAddresses from "./TableAddresses";
import TableCommodities from "./TableCommodities";
import TableEquipments from "./TableEquipments";
import TableErpWarehouses from "./TableErpWarehouse";
import TableFZones from "./TableFZones";
import TablePopularities from "./TablePopularities";

const tabs: { value: string; title: string }[] = [
  { value: "equipment", title: "Оборудования" },
  { value: "commodity", title: "Зона хранения" },
  { value: "popularity", title: "Зона популярности" },
  { value: "address", title: "Адреса" },
  { value: "fzone", title: "Ф.зоны" },
  { value: "erpWarehouse", title: "ERP склады" },
];

const BottomDetails: React.FC = () => {
  const detailedWarehouse: WarehouseContentType | null = useAppSelector(
    (state: RootState) => state.warehouse.detailedWarehouse
  );

  const selectedAdress: AddressesTypes | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedAdress
  );
  const selectedFzone: FunctionalZones | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedFZone
  );
  const selectedEquipment: WarehouseECPType | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedEquipment
  );
  const selectedPopularity: WarehouseECPType | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedPopularity
  );
  const selectedCommodity: WarehouseECPType | null = useAppSelector(
    (state: RootState) => state.warehouse.selectedCommodity
  );
  const selectedErpWarehouse: ErpWarehousesContentType | null = useAppSelector(
    (state: RootState) => state.erpWarehouses.selectedWarehouse
  );

  const isWarehouseDetailsFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.getDetailedWarehouse)
  );
  const reqFailed = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.getDetailedWarehouse)
  );

  // fetching status Addresses
  const isFetchingPostAddress = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postAdressesWarehouse)
  );

  const fetchErrorPostAddress = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.postAdressesWarehouse)
  );

  const isFetchingPutAddress = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putAdressesWarehouse)
  );
  const fetchErrorPutAddress = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.putAdressesWarehouse)
  );

  // fetching status FZones
  const isFetchingPostFZone = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postFZoneWarehouse)
  );
  const fetchErrorPostFZone = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.postFZoneWarehouse)
  );
  const isFetchingPutFZone = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putFZoneWarehouse)
  );
  const fetchErrorPutFZone = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.putFZoneWarehouse)
  );

  // fetching status Commodities
  const isFetchingPostCommodities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postCommodityWarehouse)
  );
  const fetchErrorPostCommodities = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.postCommodityWarehouse)
  );
  const isFetchingPutCommodities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putCommodityWarehouse)
  );
  const fetchErrorPutCommodities = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.putCommodityWarehouse)
  );

  // fetching status Equipments
  const isFetchingPostEquipments = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postEquipmentsWarehouse)
  );
  const fetchErrorPostEquipments = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.postEquipmentsWarehouse)
  );
  const isFetchingPutEquipments = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putEquipmentsWarehouse)
  );
  const fetchErrorPutEquipments = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.putEquipmentsWarehouse)
  );

  // fetching status Popularities
  const isFetchingPostPopularities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.postPopularityWarehouse)
  );
  const fetchErrorPostPopularities = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.postPopularityWarehouse)
  );
  const isFetchingPutPopularities = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.putPopularityWarehouse)
  );
  const fetchErrorPutPopularities = useAppSelector((state) =>
    namedRequestError(state, WarehouseEnums.putPopularityWarehouse)
  );

  // fetching status ErpWarehouse
  const isFetchingPostErpWarehouse = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.postErpWarehouses)
  );
  const fetchErrorPostErpWarehouse = useAppSelector((state) =>
    namedRequestError(state, ErpWarehouseEnums.postErpWarehouses)
  );
  const isFetchingPutErpWarehouse = useAppSelector((state) =>
    namedRequestsInProgress(state, ErpWarehouseEnums.putErpWarehouses)
  );
  const fetchErrorPutErpWarehouse = useAppSelector((state) =>
    namedRequestError(state, ErpWarehouseEnums.putErpWarehouses)
  );

  const [alertList, setAlertList] = useState<AlertListItem[]>([]);

  const [modalEqupments, setModalEqupments] = useState<boolean>(false);
  const [modalErpWarehouse, setModalErpWarehouse] = useState<boolean>(false);
  const [modalPopularity, setModalPopularity] = useState<boolean>(false);
  const [modalCommodity, setModalCommodity] = useState<boolean>(false);
  const [modalAdresses, setModalAdresses] = useState<boolean>(false);
  const [modalFZone, setModalFZone] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentPanel, setCurrentPanel] = useState<{
    value: string;
    title: string;
  }>({ value: "equipment", title: "Оборудования" });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleModalOpenCreate = () => {
    if (currentPanel.value === "equipment") {
      setModalEqupments(true);
      setEditMode(false);
      dispatch(getAllEquipmentsWarehouseAction(null));
    } else if (currentPanel.value === "commodity") {
      setModalCommodity(true);
      setEditMode(false);
      dispatch(getAllCommodityWarehouseAction(null));
    } else if (currentPanel.value === "popularity") {
      setModalPopularity(true);
      setEditMode(false);
      dispatch(getAllPopularityWarehouseAction(null));
    } else if (currentPanel.value === "address") {
      setModalAdresses(true);
      setEditMode(false);
    } else if (currentPanel.value === "fzone") {
      setModalFZone(true);
      setEditMode(false);
    } else if (currentPanel.value === "erpWarehouse") {
      setModalErpWarehouse(true);
      setEditMode(false);
    }
  };

  const handleModalOpenEdit = () => {
    switch (currentPanel.value) {
      case "equipment":
        if (selectedEquipment !== null) {
          setModalEqupments(true);
          setEditMode(true);
        } else {
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
          setModalEqupments(false);
          setEditMode(false);
        }
        break;
      case "popularity":
        if (selectedPopularity !== null) {
          dispatch(getAllPopularityWarehouseAction(null));
          setModalPopularity(true);
          setEditMode(true);
        } else {
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
          setModalPopularity(false);
          setEditMode(false);
        }
        break;
      case "commodity":
        if (selectedCommodity !== null) {
          setModalCommodity(true);
          setEditMode(true);
        } else {
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
          setModalCommodity(false);
          setEditMode(false);
        }
        break;
      case "fzone":
        if (selectedFzone !== null) {
          setModalFZone(true);
          setEditMode(true);
        } else {
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
          setModalFZone(false);
          setEditMode(false);
        }
        break;
      case "address":
        if (selectedAdress !== null) {
          setModalAdresses(true);
          setEditMode(true);
        } else {
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
          setModalAdresses(false);
          setEditMode(false);
        }
        break;
      case "erpWarehouse":
        if (selectedErpWarehouse !== null) {
          setModalErpWarehouse(true);
          setEditMode(true);
        } else {
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
          setModalErpWarehouse(false);
          setEditMode(false);
        }
        break;
    }
  };

  const handleModalCloseCreate = () => {
    if (currentPanel.value === "erpWarehouse") {
      setModalErpWarehouse(false);
      dispatch(
        getDetailedWarehouseAction(
          detailedWarehouse?.id.toString() || EmptyString
        )
      );
    } else if (currentPanel.value === "equipment") {
      setModalEqupments(false);
      dispatch(
        getDetailedWarehouseAction(
          detailedWarehouse?.id.toString() || EmptyString
        )
      );
    } else if (currentPanel.value === "commodity") {
      setModalCommodity(false);
      dispatch(
        getDetailedWarehouseAction(
          detailedWarehouse?.id.toString() || EmptyString
        )
      );
    } else if (currentPanel.value === "popularity") {
      setModalPopularity(false);
      dispatch(
        getDetailedWarehouseAction(
          detailedWarehouse?.id.toString() || EmptyString
        )
      );
    } else if (currentPanel.value === "address") {
      setModalAdresses(false);
      dispatch(
        getDetailedWarehouseAction(
          detailedWarehouse?.id.toString() || EmptyString
        )
      );
    } else if (currentPanel.value === "fzone") {
      setModalFZone(false);
      dispatch(
        getDetailedWarehouseAction(
          detailedWarehouse?.id.toString() || EmptyString
        )
      );
    }
  };

  const isEquipmentFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.getAllEquipmentsWarehouse)
  );
  const isPopularityFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.getAllPopularityWarehouse)
  );
  const isCommodityFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseEnums.getAllCommodityWarehouse)
  );

  useEffect(() => {
    if (isFetchingPostErpWarehouse === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.postErpWarehouses));
          },
        },
      ]);
      handleModalCloseCreate();
    }
    if (isFetchingPutErpWarehouse === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.putErpWarehouses));
          },
        },
      ]);
      handleModalCloseCreate();
    }
    if (isFetchingPostErpWarehouse === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostErpWarehouse?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.postErpWarehouses));
          },
        },
      ]);
    if (isFetchingPutErpWarehouse === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutErpWarehouse?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(ErpWarehouseEnums.putErpWarehouses));
          },
        },
      ]);
    if (isFetchingPostAddress === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postAdressesWarehouse));
          },
        },
      ]);
      handleModalCloseCreate();
    }
    if (isFetchingPutAddress === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putAdressesWarehouse));
          },
        },
      ]);

      handleModalCloseCreate();
    }
    if (isFetchingPostAddress === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostAddress?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postAdressesWarehouse));
          },
        },
      ]);
    if (isFetchingPutAddress === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutAddress?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putAdressesWarehouse));
          },
        },
      ]);
    if (isFetchingPostFZone === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postFZoneWarehouse));
          },
        },
      ]);
      handleModalCloseCreate();
    }
    if (isFetchingPutFZone === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putFZoneWarehouse));
          },
        },
      ]);

      handleModalCloseCreate();
    }
    if (isFetchingPostFZone === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostFZone?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postFZoneWarehouse));
          },
        },
      ]);
    if (isFetchingPutFZone === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutFZone?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putFZoneWarehouse));
          },
        },
      ]);
    if (isFetchingPostCommodities === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postCommodityWarehouse));
          },
        },
      ]);
      handleModalCloseCreate();
    }
    if (isFetchingPutCommodities === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putCommodityWarehouse));
          },
        },
      ]);

      handleModalCloseCreate();
    }
    if (isFetchingPostCommodities === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostCommodities?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postCommodityWarehouse));
          },
        },
      ]);
    if (isFetchingPutCommodities === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutCommodities?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putCommodityWarehouse));
          },
        },
      ]);
    if (isFetchingPostEquipments === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postEquipmentsWarehouse));
          },
        },
      ]);
      handleModalCloseCreate();
    }
    if (isFetchingPutEquipments === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putEquipmentsWarehouse));
          },
        },
      ]);

      handleModalCloseCreate();
    }
    if (isFetchingPostEquipments === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostEquipments?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postEquipmentsWarehouse));
          },
        },
      ]);
    if (isFetchingPutEquipments === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutEquipments?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putEquipmentsWarehouse));
          },
        },
      ]);
    if (isFetchingPostPopularities === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postPopularityWarehouse));
          },
        },
      ]);
      handleModalCloseCreate();
    }
    if (isFetchingPutPopularities === "success") {
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.success"),
          message: t("alerts.successMessage"),
          icon: AiOutlineCheckCircle,
          bgColor: appColors.green,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putPopularityWarehouse));
          },
        },
      ]);

      handleModalCloseCreate();
    }
    if (isFetchingPostPopularities === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPostPopularities?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.postPopularityWarehouse));
          },
        },
      ]);
    if (isFetchingPutPopularities === "failed")
      setAlertList([
        ...alertList,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.error"),
          message: fetchErrorPutPopularities?.message || "",
          icon: BiErrorCircle,
          bgColor: appColors.error,
          onDelete: () => {
            dispatch(filterRequests(WarehouseEnums.putEquipmentsWarehouse));
          },
        },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchErrorPostAddress,
    fetchErrorPostCommodities,
    fetchErrorPostEquipments,
    fetchErrorPostErpWarehouse?.message,
    fetchErrorPostFZone,
    fetchErrorPostPopularities,
    fetchErrorPutAddress,
    fetchErrorPutCommodities,
    fetchErrorPutEquipments,
    fetchErrorPutErpWarehouse?.message,
    fetchErrorPutFZone,
    fetchErrorPutPopularities,
    isFetchingPostAddress,
    isFetchingPostCommodities,
    isFetchingPostEquipments,
    isFetchingPostErpWarehouse,
    isFetchingPostFZone,
    isFetchingPostPopularities,
    isFetchingPutAddress,
    isFetchingPutCommodities,
    isFetchingPutEquipments,
    isFetchingPutErpWarehouse,
    isFetchingPutFZone,
    isFetchingPutPopularities,
  ]);

  console.log(currentPanel);
  return (
    <>
      {detailedWarehouse ? (
        <>
          <Alert alertList={alertList} timeout={5000} autoDelete />
          <Modal
            open={modalEqupments}
            title={`${
              editMode ? t("buttons.edit") : t("buttons.new")
            } оборудования `}
            onClose={handleModalCloseCreate}
            className="side"
          >
            {isEquipmentFetching === "pending" ? (
              <LoadingIcon />
            ) : (
              <CreateEquipmentForm
                editMode={editMode}
                onClose={handleModalCloseCreate}
              />
            )}
          </Modal>
          <Modal
            open={modalCommodity}
            title={`${
              editMode ? t("buttons.edit") : t("buttons.new")
            } зону хранения`}
            onClose={handleModalCloseCreate}
            className="side"
          >
            {isCommodityFetching === "pending" ? (
              <LoadingIcon />
            ) : (
              <CreateCommodityForm
                editMode={editMode}
                onClose={handleModalCloseCreate}
              />
            )}
          </Modal>
          <Modal
            open={modalPopularity}
            title={`${editMode ? t("buttons.edit") : t("buttons.new")}`}
            onClose={handleModalCloseCreate}
            className="side"
          >
            {isPopularityFetching === "pending" ? (
              <LoadingIcon />
            ) : (
              <CreatePopularityForm
                editMode={editMode}
                onClose={handleModalCloseCreate}
              />
            )}
          </Modal>
          <Modal
            open={modalAdresses}
            title={`${editMode ? t("buttons.edit") : t("buttons.new")} адрес`}
            onClose={handleModalCloseCreate}
            className="side"
          >
            <CreateAdressesForm
              editMode={editMode}
              onClose={handleModalCloseCreate}
            />
          </Modal>
          <Modal
            open={modalFZone}
            title={`${
              editMode ? t("buttons.edit") : t("buttons.new")
            } функциональную зону`}
            onClose={handleModalCloseCreate}
            className="side"
          >
            <CreateFZoneForm
              editMode={editMode}
              onClose={handleModalCloseCreate}
            />
          </Modal>
          <Modal
            open={modalErpWarehouse}
            title={`${
              editMode ? t("buttons.edit") : t("buttons.new")
            } ERP склад`}
            onClose={handleModalCloseCreate}
            className="side"
          >
            <ErpWarehouseForm
              editMode={editMode}
              onClose={handleModalCloseCreate}
            />
          </Modal>
          <div className="blocks-body__wrapper">
            {isWarehouseDetailsFetching === "pending" ? (
              <LoadingIcon />
            ) : reqFailed ? (
              <div>{reqFailed.message}</div>
            ) : (
              <Tabs>
                <div className="tabs">
                  <TabList>
                    {tabs.map((x) => (
                      <Tab
                        key={x.value}
                        onClick={() =>
                          setCurrentPanel({ value: x.value, title: x.title })
                        }
                      >
                        {x.title}
                      </Tab>
                    ))}
                  </TabList>
                  <ActionGroupWrapper>
                    <IconButton
                      onClick={handleModalOpenCreate}
                      popupText={t("buttons.new")}
                    >
                      <AiOutlinePlus />
                    </IconButton>
                    <IconButton
                      onClick={() => null}
                      popupText={t("buttons.export")}
                    >
                      <RiFileExcel2Line />
                    </IconButton>
                    <IconButton
                      onClick={handleModalOpenEdit}
                      popupText={t("buttons.edit")}
                    >
                      <AiOutlineEdit />
                    </IconButton>
                  </ActionGroupWrapper>
                </div>
                <div className="tables">
                  <TabPanel>
                    <TableEquipments />
                  </TabPanel>
                  <TabPanel>
                    <TableCommodities />
                  </TabPanel>
                  <TabPanel>
                    <TablePopularities />
                  </TabPanel>
                  <TabPanel>
                    <TableAddresses />
                  </TabPanel>
                  <TabPanel>
                    <TableFZones />
                  </TabPanel>
                  <TabPanel>
                    <TableErpWarehouses />
                  </TabPanel>
                </div>
              </Tabs>
            )}
          </div>
        </>
      ) : (
        <ChooseData />
      )}
    </>
  );
};

export default BottomDetails;
