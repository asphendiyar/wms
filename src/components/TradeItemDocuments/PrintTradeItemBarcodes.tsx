import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { appColors, EmptyString } from "../../app/helpers";
import { BASE_URL, pathnames } from "../../app/pathnames";
import { Button } from "../Common/Button";
import { InputWithLabel } from "../Common/Input";
import { FormGroup, StyledErrorMessage } from "../Common/styled";

const PrintTradeItemBarcodes: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [value, setValue] = useState<number>(0);

  const handlePrint = () => {
    value > 0 &&
      window.open(`${BASE_URL + pathnames.printing}trade-item/${value}`);
  };
  const { t } = useTranslation();

  return (
    <>
      <FormGroup>
        <InputWithLabel
          id={"copy"}
          name={"copy"}
          type={"number"}
          label={"Количество копий"}
          value={value === 0 ? EmptyString : value.toString()}
          onChange={(e) => setValue(parseInt(e.target.value))}
          disabled={false}
        />
        {value === 0 && (
          <StyledErrorMessage>
            Количество копий должна быть минимум 1
          </StyledErrorMessage>
        )}
      </FormGroup>

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
          type={"button"}
          onClick={handlePrint}
        >
          <span className={"btn-text"}>Печать</span>
        </Button>
      </FormGroup>
    </>
  );
};

export default PrintTradeItemBarcodes;
