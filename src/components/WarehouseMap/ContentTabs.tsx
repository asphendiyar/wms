import { Dispatch, Fragment, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineWarning } from "react-icons/ai"
import { Column } from "react-table"
import {
  appColors,
  EmptyString,
  randomNumberIdGenerator,
} from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  getCellByIdAction,
  getFiniteCellsAction,
} from "../../app/reducers/warehouse-map/actions"
import { selectTableDataFromFiniteCells } from "../../app/reducers/warehouse-map/selectors"
import { CellsTableColumns } from "../../app/reducers/warehouse-map/types"
import { ReactComponent as DetailsIcon } from "../../assets/icons/info.svg"
import { AlertListItem } from "../Common/Alert"
import IconButton from "../Common/Button/icon"
import Modal from "../Common/Modal"
import { ActionGroupWrapper, MoreButton, TableWrapper } from "../Common/styled"
import CustomTable from "../Common/Table"
import CellDetails from "./CellDetails"

const cellsTableColumns: Array<Column<CellsTableColumns>> = [
  { Header: "ID", accessor: "id" },
  { Header: () => i18n.t("columns.cell"), accessor: "address" },
  { Header: () => i18n.t("columns.cell_types"), accessor: "cell_type" },
  {
    Header: () => i18n.t("columns.functional_zone_code"),
    accessor: "functional_zone",
  },
  { Header: () => i18n.t("columns.state"), accessor: "state" },
]

const ContentTabs: React.FC<{
  setAlertList: Dispatch<SetStateAction<AlertListItem[]>>
}> = ({ setAlertList }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectTableDataFromFiniteCells)
  const { total_pages, number } = useAppSelector(
    (state) => state.warehouseMap.finiteCellsResponse
  )
  const warehouseId = useAppSelector(
    (state) => state.warehouseMap.selectedRootWarehouseId
  )
  const selectedNode = useAppSelector(
    (state) => state.warehouseMap.selectedNode
  )

  const [selectedRow, setSelectedRow] = useState<{
    address: string
    id: string
  }>({ address: EmptyString, id: EmptyString })
  const [detailsState, setDetailsState] = useState<boolean>(false)

  const handleClickRow = (args: CellsTableColumns) => {
    setSelectedRow({ address: args.address, id: args.id.toString() })
  }

  const handleClickDetailInfo = () => {
    if (selectedRow) {
      setDetailsState(true)
      dispatch(getCellByIdAction(selectedRow.id))
    } else {
      setAlertList((prev) => [
        ...prev,
        {
          id: randomNumberIdGenerator(),
          title: t("alerts.warning"),
          message: t("alerts.chooseCell"),
          icon: AiOutlineWarning,
          bgColor: appColors.warning,
        },
      ])
    }
  }
  const handleCloseDetailModal = () => {
    setDetailsState(false)
  }

  const handleClickMoreBtn = () => {
    dispatch(
      getFiniteCellsAction({
        warehouse_id: warehouseId,
        page: number + 1,
        address: selectedNode?.id ?? EmptyString,
      })
    )
  }
  return (
    <Fragment>
      <Modal
        open={detailsState}
        title={t("buttons.details")}
        onClose={handleCloseDetailModal}
        className="side"
      >
        <CellDetails />
      </Modal>
      <ActionGroupWrapper className="mb-20">
        <IconButton
          onClick={handleClickDetailInfo}
          popupText={t("buttons.details")}
        >
          <DetailsIcon />
        </IconButton>
      </ActionGroupWrapper>
      <TableWrapper height="calc(100vh - 250px)">
        <CustomTable
          data={data}
          columns={cellsTableColumns}
          selectedRow={selectedRow.address}
          selectedRowChecker={"address"}
          handleClickRow={handleClickRow}
        />
      </TableWrapper>
      {total_pages !== number && data.length !== 0 && (
        <MoreButton onClick={handleClickMoreBtn}>
          {t("buttons.showMore")}
        </MoreButton>
      )}
    </Fragment>
  )
}

export default ContentTabs
