import styled from "styled-components";
import Checkbox from ".";
import { EmptyString } from "../../../app/helpers";

const DetailedCheckBoxWrapper = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  &.description {
    margin-left: 1rem;
  }
`;

export const DetailedCheckbox: React.FC<{
  desc?: string;
  checkedd: boolean;
}> = ({ desc, checkedd }) => {
  return (
    <DetailedCheckBoxWrapper>
      <Checkbox value={checkedd} onChange={() => null} />
      {desc ? <p className="description">{desc}</p> : EmptyString}
    </DetailedCheckBoxWrapper>
  );
};
