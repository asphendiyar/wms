import styled from "styled-components";
import { appColors } from "../../app/helpers";

export const AllProductCatalogWrapper = styled.div`
  background: ${appColors.white};
  border-radius: 16px;
  padding: 8px;
  height: calc(100vh - 160px);
  .barcodes {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid red;
  }
  .hello {
    width: 300px;
  }
  .blocks-body__wrapper {
    padding: 10px 20px;
  }
`;
