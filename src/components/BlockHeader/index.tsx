import { AiOutlineLoading } from "react-icons/ai";
import styled from "styled-components";
import { appColors } from "../../app/helpers";
import { Title } from "../Common/styled";

export type BlockHeaderProps = {
  title: string;
  isFetching?: boolean;
};

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background-color: ${appColors.white};
  top: 0;
  z-index: 1;
  box-shadow: 1px -1px 10px -1px rgba(138, 127, 127, 0.24);
  border-radius: 16px 16px 0 0;
  .block-header__actions {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    gap: 10px;
  }
`;

const BlockHeader: React.FC<BlockHeaderProps> = ({
  title,
  children,
  isFetching,
}) => {
  return (
    <Wrapper>
      <Title>
        {title} {isFetching && <AiOutlineLoading className="loading-icon" />}
      </Title>
      <div className="block-header__actions">{children}</div>
    </Wrapper>
  );
};

export default BlockHeader;
