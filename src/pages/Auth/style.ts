import styled from "styled-components";
import { appColors } from "../../app/helpers";
import banner from "../../assets/images/auth-bg.jpg";

export const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  & > * {
    flex: 1;
  }
`;
export const BannerWrapper = styled.div`
  height: 100%;
  background-image: url(${banner});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  & .logo {
    padding: 20px;
    display: -webkit-flex;
    align-items: center;
    gap: 5px;
  }
  & .vertical-line {
    color: ${appColors.primary};
  }
  & .logo__text {
    font-size: 16px;
    font-weight: 600;
    color: ${appColors.white};
  }
  & img {
    height: 30px;
  }
`;
export const AuthFormWrapper = styled.div`
  background-color: ${appColors.lightGray};
  border-radius: 10px 0 0 10px;
  & .language {
    padding: 20px;
    width: 150px;
    margin-left: auto;
  }
  & h3 {
    font-weight: 600;
    font-size: 24px;
    text-align: center;
  }
  & .form {
    margin-top: 100px;
  }
  & h4 {
    margin-top: 0;
    font-weight: 400;
    font-size: 24px;
  }
`;

export const StyledAuthForm = styled.form`
  width: 420px;
  background-color: ${appColors.white};
  padding: 40px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
`;
