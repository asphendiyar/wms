import { useTranslation } from "react-i18next"
import { Column } from "react-table"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { EmptyString } from "../../app/helpers"
import { useAppSelector } from "../../app/hooks"
import i18n from "../../app/i18n"
import {
  selectCommoditiesFromCellData,
  selectEquipmentsFromCellData,
  selectPopularitiesFromCellData,
} from "../../app/reducers/warehouse-map/selectors"
import { WarehouseECPType } from "../../app/reducers/warehouse/types"
import { FieldWithLabel } from "../Common/DetailsComponent"
import CustomTable from "../Common/Table"
const allTypesTableColumns: Array<Column<WarehouseECPType>> = [
  { Header: () => i18n.t("columns.code"), accessor: "code" },
  { Header: () => i18n.t("columns.state"), accessor: "state" },
  { Header: () => i18n.t("columns.description"), accessor: "description" },
  { Header: () => i18n.t("pageTitle.action"), accessor: "action" },
]
const CellDetails: React.FC = () => {
  const { t } = useTranslation()
  const cellData = useAppSelector((state) => state.warehouseMap.cellData)
  const comodities = useAppSelector(selectCommoditiesFromCellData)
  const equipments = useAppSelector(selectEquipmentsFromCellData)
  const popularities = useAppSelector(selectPopularitiesFromCellData)
  return (
    <Tabs>
      <TabList>
        <Tab>{t("tabs.general")}</Tab>
        <Tab>{t("tabs.measurements")}</Tab>
        <Tab>{t("pageTitle.popularities")}</Tab>
        <Tab>{t("pageTitle.equipments")}</Tab>
        <Tab>{t("pageTitle.commodities")}</Tab>
      </TabList>

      <TabPanel>
        <FieldWithLabel label={t("columns.cell")} name={cellData?.address} />
        <FieldWithLabel
          label={t("columns.state")}
          name={cellData?.state_title}
        />
        <FieldWithLabel label={t("columns.region")} name={cellData?.region} />
        <FieldWithLabel label={t("columns.floor")} name={cellData?.floor} />
        <FieldWithLabel label={t("columns.shelf")} name={cellData?.shelf} />
        <FieldWithLabel
          label={t("columns.cell_types")}
          name={cellData?.general.cell_type.code}
        />
        <FieldWithLabel
          label={t("columns.actual_pallet")}
          name={cellData?.general.actual_pallet}
        />
        <FieldWithLabel
          label={t("columns.pallet_left")}
          name={cellData?.general.pallet_left}
        />
        <FieldWithLabel
          label={t("columns.high_rise")}
          name={cellData?.general.high_rise}
        />
      </TabPanel>
      <TabPanel>
        <FieldWithLabel
          label={t("columns.length")}
          name={cellData?.measurement.length}
        />
        <FieldWithLabel
          label={t("columns.width")}
          name={cellData?.measurement.width}
        />
        <FieldWithLabel
          label={t("columns.height")}
          name={cellData?.measurement.height}
        />
        <FieldWithLabel
          label={t("columns.volume")}
          name={cellData?.measurement.volume}
        />
        <FieldWithLabel
          label={t("columns.remaining_volume")}
          name={cellData?.measurement.remaining_volume}
        />
      </TabPanel>
      <TabPanel>
        <CustomTable
          selectedRow={EmptyString}
          data={popularities ?? []}
          columns={allTypesTableColumns}
        />
      </TabPanel>
      <TabPanel>
        <CustomTable
          selectedRow={EmptyString}
          data={equipments ?? []}
          columns={allTypesTableColumns}
        />
      </TabPanel>
      <TabPanel>
        <CustomTable
          selectedRow={EmptyString}
          data={comodities ?? []}
          columns={allTypesTableColumns}
        />
      </TabPanel>
    </Tabs>
  )
}

export default CellDetails
