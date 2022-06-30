import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Column } from "react-table"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { appColors, EmptyString } from "../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import { namedRequestsInProgress } from "../../app/reducers/requests"
import {
  getCellByIdAction,
  getECPAction,
  postPutECPInCellsAction,
} from "../../app/reducers/warehouse-map/actions"
import {
  selectCommoditiesFromCellData,
  selectECPData,
  selectEquipmentsFromCellData,
  selectPopularitiesFromCellData,
} from "../../app/reducers/warehouse-map/selectors"
import {
  ECPSelectorReturns,
  PostPutECPInCellsType,
  WarehouseMapEnums,
} from "../../app/reducers/warehouse-map/types"
import { WarehouseECPType } from "../../app/reducers/warehouse/types"
import { Button } from "../Common/Button"
import { FormGroup } from "../Common/styled"
import CustomTable from "../Common/Table"

const allTypesTableColumns: Array<Column<WarehouseECPType>> = [
  { Header: () => i18n.t("columns.code"), accessor: "code" },
  { Header: () => i18n.t("columns.state"), accessor: "state" },
  { Header: () => i18n.t("columns.description"), accessor: "description" },
]
const selectedTypesTableColumns: Array<Column<WarehouseECPType>> = [
  ...allTypesTableColumns,
  {
    Header: () => i18n.t("buttons.active"),
    accessor: "action",
  },
]

// This component used to add equipments\commodities\popularities to cell item
const ECPTableInModal: React.FC<{
  ecpType: PostPutECPInCellsType
  handleClose: () => void
}> = ({ ecpType, handleClose }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const isFetching = useAppSelector((state) =>
    namedRequestsInProgress(state, WarehouseMapEnums.postPutECPInCells)
  )
  const ecpData: ECPSelectorReturns = useAppSelector(selectECPData)
  const editableECPData = useAppSelector(
    ecpType === "commodities"
      ? selectCommoditiesFromCellData
      : ecpType === "equipments"
      ? selectEquipmentsFromCellData
      : selectPopularitiesFromCellData
  )
  const selectedNode = useAppSelector(
    (state) => state.warehouseMap.selectedNode
  )

  const [selectedRow, setSelectedRow] = useState<string>(EmptyString)
  const [editMode, setEditMode] = useState<boolean>(true)

  const handleClickRow = (args: WarehouseECPType) => {
    setSelectedRow(args.code)
  }

  const handleClickSubmit = () => {
    if (!editMode && selectedNode && selectedNode.originalId)
      dispatch(
        postPutECPInCellsAction({
          id: selectedNode.originalId,
          type: ecpType,
          payload: { code: selectedRow },
        })
      )
    else if (editMode) handleClose()
  }

  const handleClickSelectedsTab = () => {
    setEditMode(true)
    dispatch(getECPAction(ecpType))
  }

  useEffect(() => {
    dispatch(getECPAction(ecpType))
    selectedNode &&
      selectedNode.originalId &&
      dispatch(getCellByIdAction(selectedNode.originalId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <Fragment>
      <form>
        <Tabs>
          <TabList>
            <Tab onClick={handleClickSelectedsTab}>{t("tabs.choosen")}</Tab>
            <Tab onClick={() => setEditMode(false)}>{t("tabs.added")}</Tab>
          </TabList>
          <TabPanel>
            <CustomTable<WarehouseECPType>
              data={editableECPData || []}
              columns={selectedTypesTableColumns}
              selectedRowChecker={"code"}
              selectedRow={selectedRow}
              handleClickRow={handleClickRow}
            />
          </TabPanel>
          <TabPanel>
            <CustomTable<WarehouseECPType>
              data={ecpType !== EmptyString ? ecpData[ecpType] : []}
              columns={allTypesTableColumns}
              selectedRowChecker={"code"}
              selectedRow={selectedRow}
              handleClickRow={handleClickRow}
            />
          </TabPanel>
        </Tabs>
        <FormGroup className="form-btns d-flex">
          <Button
            colors={{
              bgColor: appColors.silver,
              textColor: appColors.black,
            }}
            onClick={handleClose}
            type="button"
          >
            <span className="btn-text">{t("buttons.cancel")}</span>
          </Button>
          <Button
            colors={{ bgColor: appColors.primary, textColor: appColors.white }}
            type="button"
            disabled={!selectedRow.length || isFetching === "pending"}
            onClick={handleClickSubmit}
          >
            <span>{editMode ? t("buttons.save") : t("buttons.add")}</span>
          </Button>
        </FormGroup>
      </form>
    </Fragment>
  )
}

export default ECPTableInModal
