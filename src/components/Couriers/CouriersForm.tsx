import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as Yup from "yup";
import { FormPropTypes } from "../../app/commonTypes";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  postCouriersAction,
  putCouriersAction,
} from "../../app/reducers/couriers/actions";
import {
  CourierEnums,
  CouriersConfigurations,
  CouriersContentType,
} from "../../app/reducers/couriers/types";
import { getDictionaryContentAction } from "../../app/reducers/dictionary/actions";
import { dictionaryCodes } from "../../app/reducers/dictionary/initials";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import DynamicSelect from "../Common/DynamicSelect";
import i18n from "../../app/i18n";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage, TableWrapper } from "../Common/styled";
import CustomTable from "../Common/Table";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Обязательное поле"),
  name: Yup.string().required("Обязательное поле"),
  create_manifest: Yup.string().required("Обязательное поле"),
  create_parcel: Yup.string().required("Обязательное поле"),
  barcode_parcel: Yup.string().required("Обязательное поле"),
  create_service: Yup.string().required("Обязательное поле"),
  configurations: Yup.array().min(
    1,
    "В списке конфигурации должен быть минимум один элемент"
  ),
});

const tableColumns: Array<Column<CouriersConfigurations>> = [
  {
    Header: () => i18n.t("columns.code"),
    accessor: "code",
  },
  {
    Header: () => i18n.t("columns.name"),
    accessor: "name",
  },
  {
    Header: () => i18n.t("columns.url"),
    accessor: "url",
  },
  {
    Header: () => i18n.t("columns.username"),
    accessor: "username",
  },
  {
    Header: () => i18n.t("columns.password"),
    accessor: "password",
  },
];
export const CouriersForm: React.FC<FormPropTypes> = ({
  onClose,
  editMode,
}) => {
  const detailedCouriers: CouriersContentType | null = useAppSelector(
    (state: RootState) => state.couriers.detailedCouriers
  );
  const isFetchingPostCourier = useAppSelector((state) =>
    namedRequestsInProgress(state, CourierEnums.postCouriers)
  );
  const isFetchingPutCourier = useAppSelector((state) =>
    namedRequestsInProgress(state, CourierEnums.putCouriers)
  );

  const dictionaryList = useAppSelector(
    (state) => state.dictionary.lists.courier.state
  );

  const [configurations, setConfigurations] = useState<CouriersConfigurations>({
    code: "",
    name: "",
    url: "",
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues:
      editMode && detailedCouriers
        ? {
            ...detailedCouriers,
          }
        : {
            state: EmptyString,
            code: EmptyString,
            name: EmptyString,
            create_manifest: EmptyString,
            create_parcel: EmptyString,
            barcode_parcel: EmptyString,
            create_service: EmptyString,
            configurations: [],
          },
    validationSchema,
    onSubmit: (data) => {
      editMode
        ? dispatch(
            putCouriersAction({
              data: {
                ...data,
              },
              code: detailedCouriers?.code || EmptyString,
            })
          )
        : dispatch(
            postCouriersAction({
              ...data,
            })
          );
    },
  });

  const dataConfigurations: CouriersConfigurations[] = useMemo(
    (): CouriersConfigurations[] =>
      formik.values.configurations
        ? formik.values.configurations.map((item) => ({
            ...item,
          }))
        : [],
    [formik.values.configurations]
  );

  const handleClickRow = (args: CouriersConfigurations) => {
    formik.setFieldValue(
      "configurations",
      formik.values.configurations.filter((i) => i.code !== args.code)
    );
  };

  const handleAddConfigurations = () => {
    formik.setFieldValue("configurations", [
      ...formik.values.configurations,
      configurations,
    ]);
    setConfigurations({
      code: "",
      name: "",
      url: "",
      username: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Tabs>
          <TabList>
            <Tab>{t("tabs.general")}</Tab>
            <Tab>Конфигурации</Tab>
          </TabList>
          <TabPanel>
            <div>
              <FormGroup>
                <InputWithLabel
                  id={"name"}
                  name={"name"}
                  type={"text"}
                  label={t("columns.name")}
                  value={formik.values.name}
                  onChange={(e) => formik.setFieldValue("name", e.target.value)}
                  disabled={false}
                />
                {formik.touched.name && formik.errors.name && (
                  <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>
                )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id={"code"}
                  name={"code"}
                  type={"text"}
                  label={t("columns.code")}
                  value={formik.values.code}
                  onChange={(e) => formik.setFieldValue("code", e.target.value)}
                  disabled={false}
                />
                {formik.touched.code && formik.errors.code && (
                  <StyledErrorMessage>{formik.errors.code}</StyledErrorMessage>
                )}
              </FormGroup>

              {editMode && (
                <FormGroup>
                  <DynamicSelect<string>
                    payload={`${dictionaryCodes.courier.self}.${dictionaryCodes.courier.state}`}
                    options={dictionaryList}
                    action={getDictionaryContentAction}
                    placeholder={t("columns.state")}
                    editMode={editMode}
                    onChange={(value) => {
                      formik.setFieldValue("state", value?.value);
                    }}
                    value={dictionaryList.find(
                      (item) => item.value === formik.values.state
                    )}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <StyledErrorMessage>
                      {formik.errors.state}
                    </StyledErrorMessage>
                  )}
                </FormGroup>
              )}

              <FormGroup>
                <InputWithLabel
                  id={"create_manifest"}
                  name={"create_manifest"}
                  type={"text"}
                  label={t("columns.create_manifest")}
                  value={formik.values.create_manifest}
                  onChange={(e) =>
                    formik.setFieldValue("create_manifest", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.create_manifest &&
                  formik.errors.create_manifest && (
                    <StyledErrorMessage>
                      {formik.errors.create_manifest}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id={"create_parcel"}
                  name={"create_parcel"}
                  type={"text"}
                  label={t("columns.create_parcel")}
                  value={formik.values.create_parcel}
                  onChange={(e) =>
                    formik.setFieldValue("create_parcel", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.create_parcel &&
                  formik.errors.create_parcel && (
                    <StyledErrorMessage>
                      {formik.errors.create_parcel}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id={"barcode_parcel"}
                  name={"barcode_parcel"}
                  type={"text"}
                  label={t("columns.barcode_parcel")}
                  value={formik.values.barcode_parcel}
                  onChange={(e) =>
                    formik.setFieldValue("barcode_parcel", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.barcode_parcel &&
                  formik.errors.barcode_parcel && (
                    <StyledErrorMessage>
                      {formik.errors.barcode_parcel}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
              <FormGroup>
                <InputWithLabel
                  id={"create_service"}
                  name={"create_service"}
                  type={"text"}
                  label={t("columns.create_service")}
                  value={formik.values.create_service}
                  onChange={(e) =>
                    formik.setFieldValue("create_service", e.target.value)
                  }
                  disabled={false}
                />
                {formik.touched.create_service &&
                  formik.errors.create_service && (
                    <StyledErrorMessage>
                      {formik.errors.create_service}
                    </StyledErrorMessage>
                  )}
              </FormGroup>
            </div>
          </TabPanel>
          <TabPanel>
            <FormGroup className={"d-flex"}>
              <InputWithLabel
                id={"config.code"}
                name={"config.code"}
                type={"text"}
                label={t("columns.code")}
                value={configurations.code || EmptyString}
                onChange={(e) =>
                  setConfigurations({
                    ...configurations,
                    code: e.target.value,
                  })
                }
                disabled={false}
              />
              <InputWithLabel
                id={"config.name"}
                name={"config.name"}
                type={"text"}
                label={t("columns.name")}
                value={configurations.name || EmptyString}
                onChange={(e) =>
                  setConfigurations({
                    ...configurations,
                    name: e.target.value,
                  })
                }
                disabled={false}
              />
              <InputWithLabel
                id={"config.url"}
                name={"config.url"}
                type={"text"}
                label={t("columns.url")}
                value={configurations.url || EmptyString}
                onChange={(e) =>
                  setConfigurations({
                    ...configurations,
                    url: e.target.value,
                  })
                }
                disabled={false}
              />
              <InputWithLabel
                id={"config.username"}
                name={"config.username"}
                type={"text"}
                label={t("columns.login")}
                value={configurations.username || EmptyString}
                onChange={(e) =>
                  setConfigurations({
                    ...configurations,
                    username: e.target.value,
                  })
                }
                disabled={false}
              />
              <InputWithLabel
                id={"config.password"}
                name={"config.password"}
                type={"text"}
                label={t("columns.password")}
                value={configurations.password || EmptyString}
                onChange={(e) =>
                  setConfigurations({
                    ...configurations,
                    password: e.target.value,
                  })
                }
                disabled={false}
              />
              <Button
                width="auto"
                colors={{
                  bgColor: appColors.primary,
                  textColor: appColors.white,
                }}
                onClick={handleAddConfigurations}
                type={"button"}
              >
                <span className={"btn-text"}>+</span>
              </Button>
            </FormGroup>

            <TableWrapper>
              <CustomTable<CouriersConfigurations>
                columns={tableColumns}
                data={dataConfigurations}
                handleClickRow={handleClickRow}
                selectedRow={EmptyString}
              />
            </TableWrapper>
            {formik.errors.configurations && (
              <StyledErrorMessage>
                {formik.errors.configurations}
              </StyledErrorMessage>
            )}
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
              {isFetchingPostCourier === "pending" ||
              isFetchingPutCourier === "pending"
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
