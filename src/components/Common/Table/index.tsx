import {
  MouseEvent as MouseEventReact,
  PropsWithChildren,
  useEffect,
} from "react"
import { useTranslation } from "react-i18next"
import { Column, useFlexLayout, useTable } from "react-table"
import { classNameGenerator, EmptyString } from "../../../app/helpers"
import { STable, STd } from "../styled"
import { useClickPrevention } from "./useClickPrevention"

type CustomTableProps<TableData extends {}> = {
  columns: Column<TableData>[]
  data: TableData[]
  handleClickRow?: (params: TableData) => void
  handleDoubleClickRow?: (params: TableData) => void
  selectedRow?: string | number
  selectedRowChecker?: string // This param used as key of selectedRow
  rowStateChecker?: string
  rowStateCheckerValue?: string
  columnIndex?: number
}

function CustomTable<TableData extends {}>({
  columns,
  data,
  handleClickRow,
  handleDoubleClickRow,
  selectedRowChecker,
  selectedRow,
  columnIndex,
  rowStateChecker,
  rowStateCheckerValue,
}: PropsWithChildren<CustomTableProps<TableData>>): JSX.Element {
  const [handleClick, handleDoubleClick] = useClickPrevention<TableData>({
    onClick: handleClickRow,
    onDoubleClick: handleDoubleClickRow,
    delay: 200,
  })

  const { t } = useTranslation()

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<TableData>({ columns, data }, useFlexLayout)

  useEffect(() => {
    const tableRows = document.querySelectorAll("tr")
    const cellsLeftValues: number[] = []
    const styleElem = document.createElement("style")
    tableRows.forEach((tableRow) => {
      const cells = tableRow.querySelectorAll(".sticky-cell")
      cells.forEach((cell) => {
        const leftValue = cell.previousElementSibling
          ? cell.previousElementSibling?.clientWidth + cell.clientWidth
          : cell.clientWidth

        !cellsLeftValues.includes(leftValue) && cellsLeftValues.push(leftValue)
        cell.nextElementSibling?.classList.add(`left-${leftValue}`)
      })
    })
    cellsLeftValues.forEach((item) => {
      styleElem.innerText += `.left-${item} {left: ${item}px !important;}`
    })
    styleElem.innerText && document.head.appendChild(styleElem)
  })

  return (
    <STable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              const isSticky: boolean = column.id.endsWith("sticky")
              return (
                <STd
                  {...column.getHeaderProps()}
                  className={
                    isSticky
                      ? `sticky-cell ${
                          index === columnIndex ? "shadow" : EmptyString
                        }`
                      : EmptyString
                  }
                >
                  {column.render("Header")}
                </STd>
              )
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length ? (
          rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleClickRow && handleClick(row.original)}
                onDoubleClick={(e: MouseEventReact) => {
                  handleDoubleClickRow && handleDoubleClick(row.original)
                }}
                className={classNameGenerator([
                  // @ts-ignore
                  row.original[selectedRowChecker] === selectedRow
                    ? "selected-row"
                    : EmptyString,
                  rowStateChecker &&
                  // @ts-ignore
                  row.original[rowStateChecker] === rowStateCheckerValue
                    ? "exceptional-row"
                    : EmptyString,
                ])}
              >
                {row.cells.map((cell, index) => {
                  const isSticky: boolean = cell.column.id.endsWith("sticky")
                  return (
                    <STd
                      className={
                        isSticky
                          ? `sticky-cell ${
                              index === columnIndex ? "shadow" : EmptyString
                            }`
                          : EmptyString
                      }
                      {...cell.getCellProps()}
                      title={`${cell.value}`}
                    >
                      {cell.render("Cell")}
                    </STd>
                  )
                })}
              </tr>
            )
          })
        ) : (
          <tr>
            <td rowSpan={5} colSpan={columns.length}>
              {t("alerts.noData")}
            </td>
          </tr>
        )}
      </tbody>
    </STable>
  )
}

export default CustomTable
