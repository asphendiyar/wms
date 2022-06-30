import { Dispatch, Fragment, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FilterPayloadTypes, ReactSelectValues } from "../../../app/commonTypes"
import { appColors, EmptyString } from "../../../app/helpers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { SelectedWarehouses } from "../../../app/reducers/users/types"
import { setAllFZones } from "../../../app/reducers/warehouse"
import {
  getAllFZonesWarehoseAction,
  getAllWarehouseAction,
} from "../../../app/reducers/warehouse/actions"
import {
  selectFZonesList,
  selectWarehouseList,
} from "../../../app/reducers/warehouse/selectors"
import { FZoneParams } from "../../../app/reducers/warehouse/types"
import { Button } from "../../Common/Button"
import IconButton from "../../Common/Button/icon"
import DynamicSelect from "../../Common/DynamicSelect"
import { FormGroup, STable, STd, StyledErrorMessage } from "../../Common/styled"

type UserWarehousesProps = {
  warehousesList: SelectedWarehouses[]
  setWarehousesList: Dispatch<SetStateAction<SelectedWarehouses[]>>
  editMode: boolean
}

const UserWarehouses: React.FC<UserWarehousesProps> = ({
  warehousesList,
  setWarehousesList,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const warehouses = useAppSelector(selectWarehouseList)
  const fZones = useAppSelector(selectFZonesList)

  const [hasEmptyFields, setHasEmptyFields] = useState<boolean>(false)
  const [hasWarehouse, setHasWarehouse] = useState<boolean>(false)
  const [values, setValues] = useState<SelectedWarehouses>({
    warehouseId: 0,
    warehouseName: EmptyString,
    fZones: [],
  })

  const handleClickAdd = () => {
    if (!values.fZones.length || !values.warehouseId) setHasEmptyFields(true)
    else {
      if (
        warehousesList.find((item) => item.warehouseId === values.warehouseId)
      ) {
        setHasWarehouse(true)
      } else {
        setWarehousesList([
          ...warehousesList,
          {
            warehouseId: values.warehouseId,
            warehouseName: values.warehouseName,
            fZones: values.fZones,
          },
        ])
      }
    }
  }

  function handleChangeWarehouse(option: ReactSelectValues | null) {
    hasEmptyFields && setHasEmptyFields(false)
    hasWarehouse && setHasWarehouse(false)
    fZones.length && dispatch(setAllFZones([]))
    if (option) {
      setValues({
        ...values,
        warehouseId: Number(option.value),
        warehouseName: option.label,
      })
    }
  }
  function handleChangeFZones(options: ReactSelectValues[]) {
    hasEmptyFields && setHasEmptyFields(false)
    hasWarehouse && setHasWarehouse(false)
    if (options) {
      setValues({
        ...values,
        fZones: options.map((item) => ({
          fZoneId: Number(item.value),
          fZoneName: item.label,
        })),
      })
    }
  }
  const handleRemove = (id: number) => {
    setWarehousesList(warehousesList.filter((item) => item.warehouseId !== id))
  }

  return (
    <Fragment>
      <FormGroup>
        <STable>
          <thead>
            <tr>
              <th>Склады</th>
              <th>Ф.зоны</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {warehousesList.map((item) => (
              <tr key={item.warehouseId}>
                <STd>{item.warehouseName}</STd>
                <STd>{item.fZones.map((fZone) => `${fZone.fZoneName}, `)}</STd>
                <STd className={"align-center"}>
                  <IconButton
                    onClick={() => handleRemove(item.warehouseId)}
                    className="remove"
                  >
                    <AiOutlineCloseCircle />
                  </IconButton>
                </STd>
              </tr>
            ))}
          </tbody>
        </STable>
      </FormGroup>
      <FormGroup>
        <DynamicSelect<FilterPayloadTypes>
          options={warehouses}
          payload={{ page: 1 }}
          action={getAllWarehouseAction}
          value={undefined}
          editMode={false}
          onChange={handleChangeWarehouse}
          placeholder={`Склад`}
          isClearable
        />
      </FormGroup>
      <FormGroup>
        <DynamicSelect<FZoneParams>
          options={fZones}
          payload={{ id: values.warehouseId.toString() }}
          action={getAllFZonesWarehoseAction}
          editMode={false}
          value={undefined}
          //@ts-ignore
          onChange={handleChangeFZones}
          placeholder={`Ф.зона`}
          isMultiple
        />
      </FormGroup>
      <FormGroup>
        <Button
          colors={{ bgColor: appColors.green, textColor: appColors.white }}
          onClick={handleClickAdd}
        >
          {t("buttons.add")}
        </Button>
      </FormGroup>
      {hasEmptyFields && (
        <StyledErrorMessage>Заполните все поля</StyledErrorMessage>
      )}
      {hasWarehouse && (
        <StyledErrorMessage>Такой склад уже существует</StyledErrorMessage>
      )}
    </Fragment>
  )
}

export default UserWarehouses
