import { AiOutlineLogin } from "react-icons/ai";
import { ImInfo } from "react-icons/im";
import styled from "styled-components";
import { appColors } from "../../../app/helpers";
import { Button } from "../Button";
import { StyledIcon } from "../styled";

const StyledMessage = styled.div`
  font-size: 17px;
  font-weight: 400;
  .message-info {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    gap: 20px;
  }
  .centered {
    margin: 0 auto;
    margin-top: 20px;
  }
`;
export const ExpiredTokenMessage: React.FC<{
  setIsTokenExp: Function;
}> = () => {
  return (
    <StyledMessage>
      <div className="message-info">
        <StyledIcon>
          <ImInfo />
        </StyledIcon>
        <span>Ваше время истекло, вы должны заново авторизоваться</span>
      </div>
      <Button
        type="button"
        colors={{
          bgColor: appColors.primary,
          textColor: appColors.white,
        }}
        className="centered"
      >
        <AiOutlineLogin />
        <span>Войти</span>
      </Button>
    </StyledMessage>
  );
};
