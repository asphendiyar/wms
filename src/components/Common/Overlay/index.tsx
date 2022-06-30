import styled from "styled-components";
import { appColors } from "../../../app/helpers";

const OverlayWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${appColors.overlay};
`;

export const Overlay: React.FC = ({ children }) => {
  return <OverlayWrapper>{children}</OverlayWrapper>;
};
