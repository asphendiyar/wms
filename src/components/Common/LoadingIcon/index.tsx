import { AiOutlineLoading } from "react-icons/ai";
import styled from "styled-components";

type LoadingIconPropTypes = {
  fontSize?: string;
};

const LoadingIconWrapper = styled.div<LoadingIconPropTypes>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-weight: 900;
  font-size: ${(p) => (p.fontSize ? p.fontSize : "32px")};
`;
export const LoadingIcon: React.FC<LoadingIconPropTypes> = ({ fontSize }) => {
  return (
    <LoadingIconWrapper fontSize={fontSize}>
      <AiOutlineLoading className="loading-icon" />
    </LoadingIconWrapper>
  );
};
