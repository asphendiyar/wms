import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { appColors, EmptyString } from "../../app/helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { patchInboundOpenAction } from "../../app/reducers/inbound/actions";
import { InboundEnums } from "../../app/reducers/inbound/types";
import { namedRequestsInProgress } from "../../app/reducers/requests";
import { RampsContentType } from "../../app/reducers/warehouse/types";
import { RootState } from "../../app/store";
import { Button } from "../Common/Button";
import Modal from "../Common/Modal";
import { Picker } from "../Common/Picker";
import { FormGroup } from "../Common/styled";
import { InboundsTableData } from "./Inbounds";
import { RampsInboundForm } from "./RampsInbound";

export const OpenInboundForm: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const isPatchOpenInboundFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, InboundEnums.patchInboundOpen)
  );

  const selectedRamps: RampsContentType | null = useAppSelector(
    (state: RootState) => state.inbound.selectedRampsInbound
  );

  const selectedInbound: InboundsTableData | null = useAppSelector(
    (state: RootState) => state.inbound.selectedInbound
  );

  const [rampsModal, setRampsModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      ramp_code: EmptyString,
    },
    onSubmit: (data) => {
      dispatch(
        patchInboundOpenAction({
          data: data,
          id: selectedInbound?.id.toString(),
        })
      );
    },
  });

  const handleCloseRampsModal = () => {
    setRampsModal(false);
    formik.setFieldValue("ramp_code", selectedRamps?.code);
  };

  return (
    <>
      <Modal
        title={t("columns.ramp")}
        className="side"
        open={rampsModal}
        onClose={() => setRampsModal(false)}
      >
        <RampsInboundForm onClose={handleCloseRampsModal} />
      </Modal>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Picker
            onClick={() => {
              setRampsModal(true);
            }}
            value={selectedRamps ? selectedRamps.code : EmptyString}
            label={t("columns.ramp")}
            disabled={false}
            hasValue={!!selectedRamps}
          />
        </FormGroup>

        <FormGroup className="form-btns d-flex">
          <Button
            colors={{
              bgColor: appColors.silver,
              textColor: appColors.black,
            }}
            onClick={onClose}
            type="button"
          >
            <span className="btn-text">{t("buttons.cancel")}</span>
          </Button>
          <Button
            colors={{ bgColor: appColors.primary, textColor: appColors.white }}
            type="submit"
          >
            <span className="btn-text">
              {isPatchOpenInboundFetching === "pending"
                ? t("buttons.wait")
                : t("buttons.save")}
            </span>
          </Button>
        </FormGroup>
      </form>
    </>
  );
};
