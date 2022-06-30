import { useFormik } from "formik";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as Yup from "yup";
import { FilterPayloadTypes, FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString, formatDate } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import {
  getAllRampsShipmentsAction,
  postShipmentsAction,
  putShipmentsAction,
} from "../../app/reducers/shipments/actions";
import {
  ShipmentEnums,
  ShipmentsContentType,
  ShipmentsFormValues,
} from "../../app/reducers/shipments/types";
import {
  getAllFZonesWarehoseAction,
  getSearchAllWarehouseAction,
} from "../../app/reducers/warehouse/actions";
import {
  selectFZonesListCode,
  selectRampsList,
  selectWarehouseList,
} from "../../app/reducers/warehouse/selectors";
import { FZoneParams } from "../../app/reducers/warehouse/types";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import DynamicSelect from "../Common/DynamicSelect";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const validationSchema = Yup.object().shape({
  warehouse_id: Yup.number().required("Обязательное поле"),
  functional_zone_code: Yup.string().required("Обязательное поле"),
  ramp_code: Yup.string().required("Обязательное поле"),
  is_picking_allowed: Yup.boolean().required("Обязательное поле"),
  note: Yup.string().required("Обязательное поле"),
  carrier: Yup.string().required("Обязательное поле"),
});

export const ShipmentsForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedShipments: ShipmentsContentType | null = useAppSelector(
    (state: RootState) => state.shipments.detailedShipment
  );
  const isFetchingPostShipment = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.postShipments)
  );

  const isFetchingPutShipment = useAppSelector((state) =>
    namedRequestsInProgress(state, ShipmentEnums.putShipments)
  );
  const warehousesList = useAppSelector(selectWarehouseList);
  const rampsList = useAppSelector(selectRampsList);
  const fzoneList = useAppSelector(selectFZonesListCode);

  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedShipments
        ? {
            warehouse_id: detailedShipments.warehouse_id,
            date: detailedShipments.date,
            functional_zone_code: detailedShipments.functional_zone,
            ramp_code: detailedShipments.ramp,
            is_picking_allowed: detailedShipments.is_picking_allowed,
            note: detailedShipments.note,
            route: detailedShipments.route,
            plate_number: detailedShipments.plate_number,
            carrier: detailedShipments.carrier,
            carrier_code: detailedShipments.carrier_code,
            weight: detailedShipments.weight,
            volume: detailedShipments.volume,
            periodic_reservation_code:
              detailedShipments.periodic_reservation_code,
          }
        : {
            warehouse_id: EmptyString,
            date: new Date(),
            functional_zone_code: EmptyString,
            ramp_code: EmptyString,
            is_picking_allowed: false,
            note: EmptyString,
            route: EmptyString,
            plate_number: EmptyString,
            carrier: EmptyString,
            carrier_code: EmptyString,
            weight: EmptyString,
            volume: EmptyString,
            periodic_reservation_code: EmptyString,
          },
    validationSchema,

    onSubmit: (data) => {
      const newValues = {} as ShipmentsFormValues;
      for (const key in data) {
        //@ts-ignore
        if (data[key].length > 0 || typeof data[key] === "boolean") {
          //@ts-ignore
          newValues[key] = data[key];
        }
      }
      editMode
        ? dispatch(
            putShipmentsAction({
              data: {
                ...newValues,
                warehouse_id: parseInt(data.warehouse_id.toString()),
                date: formatDate(new Date(data.date)),
                weight: parseInt(data.weight.toString()),
                volume: parseInt(data.volume.toString()),
              },
              id: detailedShipments?.id.toString() || EmptyString,
            })
          )
        : dispatch(
            postShipmentsAction({
              ...newValues,
              warehouse_id: parseInt(data.warehouse_id.toString()),
              date: formatDate(new Date(data.date)),
              weight: parseInt(data.weight.toString()),
              volume: parseInt(data.volume.toString()),
            })
          );
    },
  });

  const onFocus = () => {
    setOpenCalendar(true);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Tabs>
          <TabList>
            <Tab>{t("tabs.general")}</Tab>
            <Tab>{t("tabs.date")}</Tab>
            <Tab>{t("tabs.transport")}</Tab>
          </TabList>

          <TabPanel>
            <FormGroup>
              <DynamicSelect<FilterPayloadTypes>
                payload={{ page: 1 }}
                action={getSearchAllWarehouseAction}
                options={warehousesList}
                placeholder={t("placeholders.selectWarehouse")}
                editMode={editMode}
                onChange={(value) => {
                  formik.setFieldValue("warehouse_id", value?.value);
                }}
                value={warehousesList.find(
                  (item) => item.value === formik.values.warehouse_id
                )}
              />
              {formik.touched.warehouse_id && formik.errors.warehouse_id && (
                <StyledErrorMessage>
                  {formik.errors.warehouse_id}
                </StyledErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <DynamicSelect<null>
                payload={null}
                action={getAllRampsShipmentsAction}
                options={rampsList}
                placeholder={t("columns.ramp")}
                editMode={editMode}
                onChange={(value) => {
                  formik.setFieldValue("ramp_code", value?.value);
                }}
                value={rampsList.find(
                  (item) => item.value === formik.values.ramp_code
                )}
              />
              {formik.touched.ramp_code && formik.errors.ramp_code && (
                <StyledErrorMessage>
                  {formik.errors.ramp_code}
                </StyledErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <DynamicSelect<FZoneParams>
                payload={{ id: formik.values.warehouse_id.toString() }}
                action={getAllFZonesWarehoseAction}
                options={fzoneList}
                placeholder={t("columns.functional_zone_code")}
                editMode={editMode}
                onChange={(value) => {
                  formik.setFieldValue("functional_zone_code", value?.value);
                }}
                value={fzoneList.find(
                  (item) => item.value === formik.values.functional_zone_code
                )}
              />
              {formik.touched.functional_zone_code &&
                formik.errors.functional_zone_code && (
                  <StyledErrorMessage>
                    {formik.errors.functional_zone_code}
                  </StyledErrorMessage>
                )}
            </FormGroup>

            <FormGroup>
              <InputWithLabel
                id={"note"}
                name={"note"}
                type={"text"}
                label={t("columns.note")}
                value={formik.values.note}
                onChange={(e) => formik.setFieldValue("note", e.target.value)}
                disabled={false}
              />
              {formik.touched.note && formik.errors.note && (
                <StyledErrorMessage>{formik.errors.note}</StyledErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id={"route"}
                name={"route"}
                type={"text"}
                label={t("columns.route")}
                value={formik.values.route}
                onChange={(e) => formik.setFieldValue("route", e.target.value)}
                disabled={false}
              />
              {formik.touched.route && formik.errors.route && (
                <StyledErrorMessage>{formik.errors.route}</StyledErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id={"periodic_reservation_code"}
                name={"periodic_reservation_code"}
                type={"text"}
                label={t("columns.periodic_reservation_code")}
                value={formik.values.periodic_reservation_code}
                onChange={(e) =>
                  formik.setFieldValue(
                    "periodic_reservation_code",
                    e.target.value
                  )
                }
                disabled={false}
              />
              {formik.touched.periodic_reservation_code &&
                formik.errors.periodic_reservation_code && (
                  <StyledErrorMessage>
                    {formik.errors.periodic_reservation_code}
                  </StyledErrorMessage>
                )}
            </FormGroup>
            <FormGroup>
              <Checkbox
                label={t("columns.is_picking_allowed")}
                value={formik.values.is_picking_allowed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue(
                    "is_picking_allowed",
                    e.currentTarget.checked
                  );
                }}
              />
            </FormGroup>

            <FormGroup>
              <InputWithLabel
                id={"weight"}
                name={"weight"}
                type={"number"}
                label={t("columns.weight")}
                value={formik.values.weight.toString()}
                onChange={(e) => formik.setFieldValue("weight", e.target.value)}
                disabled={false}
              />
              {formik.touched.weight && formik.errors.weight && (
                <StyledErrorMessage>{formik.errors.weight}</StyledErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id={"volume"}
                name={"volume"}
                type={"number"}
                label={t("columns.volume")}
                value={formik.values.volume.toString()}
                onChange={(e) => formik.setFieldValue("volume", e.target.value)}
                disabled={false}
              />
              {formik.touched.volume && formik.errors.volume && (
                <StyledErrorMessage>{formik.errors.volume}</StyledErrorMessage>
              )}
            </FormGroup>
          </TabPanel>
          <TabPanel>
            <FormGroup>
              <InputWithLabel
                id={"date"}
                name={"date"}
                type={"text"}
                label={t("columns.date")}
                value={
                  editMode
                    ? formatDate(new Date(formik.values.date))
                    : formatDate(date)
                }
                onChange={() => null}
                onFocus={onFocus}
              />

              {formik.touched.date && formik.errors.date && (
                <StyledErrorMessage>{formik.errors.date}</StyledErrorMessage>
              )}
            </FormGroup>
            {openCalendar && (
              <Calendar
                onChange={setDate}
                onClickDay={() => {
                  formik.setFieldValue("date", formatDate(date));
                }}
                value={formik.values.date ? new Date(formik.values.date) : date}
                locale={"ru-RU"}
                minDate={new Date()}
              />
            )}
          </TabPanel>
          <TabPanel>
            <FormGroup>
              <InputWithLabel
                id={"plate_number"}
                name={"plate_number"}
                type={"text"}
                label={t("columns.plate_number")}
                value={formik.values.plate_number}
                onChange={(e) =>
                  formik.setFieldValue("plate_number", e.target.value)
                }
                disabled={false}
              />
              {formik.touched.plate_number && formik.errors.plate_number && (
                <StyledErrorMessage>
                  {formik.errors.plate_number.trim()}
                </StyledErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <InputWithLabel
                id={"carrier"}
                name={"carrier"}
                type={"text"}
                label={t("columns.carrier")}
                value={formik.values.carrier}
                onChange={(e) =>
                  formik.setFieldValue("carrier", e.target.value)
                }
                disabled={false}
              />
              {formik.touched.carrier && formik.errors.carrier && (
                <StyledErrorMessage>{formik.errors.carrier}</StyledErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <InputWithLabel
                id={"carrier_code"}
                name={"carrier_code"}
                type={"text"}
                label={t("columns.carrier_code")}
                value={formik.values.carrier_code}
                onChange={(e) =>
                  formik.setFieldValue("carrier_code", e.target.value)
                }
                disabled={false}
              />
              {formik.touched.carrier_code && formik.errors.carrier_code && (
                <StyledErrorMessage>
                  {formik.errors.carrier_code}
                </StyledErrorMessage>
              )}
            </FormGroup>
          </TabPanel>
        </Tabs>

        <FormGroup className={"form-btns d-flex"}>
          <Button
            colors={{
              bgColor: appColors.silver,
              textColor: appColors.black,
            }}
            onClick={onClose}
            type={"button"}
          >
            <span className={"btn-text"}>{t("buttons.cancel")}</span>
          </Button>
          <Button
            colors={{ bgColor: appColors.primary, textColor: appColors.white }}
            type={"submit"}
          >
            <span className={"btn-text"}>
              {isFetchingPostShipment === "pending" ||
              isFetchingPutShipment === "pending"
                ? t("buttons.wait")
                : editMode
                ? t("buttons.save")
                : t("buttons.add")}
            </span>
          </Button>
        </FormGroup>
      </form>
    </>
  );
};
