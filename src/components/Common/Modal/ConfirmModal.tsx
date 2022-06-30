import { useTranslation } from "react-i18next";
import Modal from ".";
import { appColors } from "../../../app/helpers";
import { Button } from "../Button";
import { FormGroup } from "../styled";

type ConfirmModalPropTypes = {
  opened: boolean;
  onClose: () => void;
  onAllClose?: () => void;
  headerText: string;
  message: string;
};

const ModalConfirmModal: React.FC<ConfirmModalPropTypes> = ({
  opened,
  onClose,
  onAllClose,
  message,
  headerText,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      open={opened}
      title={headerText}
      className="centered"
      onClose={onClose}
    >
      <p>{message}</p>
      <FormGroup className={"d-flex"}>
        <Button
          colors={{
            bgColor: appColors.silver,
            textColor: appColors.black,
          }}
          onClick={onAllClose}
          type="button"
        >
          <span className="btn-text">{t("buttons.yes")}</span>
        </Button>
        <Button
          colors={{ bgColor: appColors.primary, textColor: appColors.white }}
          onClick={onClose}
        >
          <span>{t("buttons.no")}</span>
        </Button>
      </FormGroup>
    </Modal>
  );
};
export default ModalConfirmModal;
