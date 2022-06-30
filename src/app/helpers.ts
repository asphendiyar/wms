import { StylesConfig, ThemeConfig } from "react-select"
import { FetchMethod, ReactSelectValues } from "./commonTypes"

export const EmptyString = ""
// Helpers for styled components
export const appColors = {
  white: "#fff",
  primary: "#FF681D",
  primaryTransparent: "#ff681d3d",
  navbarText: "#777777",
  lightGray: "#eaeaea",
  primaryDark: "#b64208",
  silver: "#e5e5e5",
  darkGray: "rgb(179, 179, 179)",
  black: "#000",
  skyBlue: "#42BBF8",
  green: "#73BE6F",
  error: "red",
  warning: "#f0ad4e",
  gray: "#d0d0d0",
  overlay: "#00000060",
  wheat: "#FDF8E2",
  lightSkyBlue: "#9ddffe",
  ligherGray: "#F7F7F7",
  darkerGray: "rgba(22, 22, 22, 0.75)",
}

// Custom theme for React Select Library
export const customTheme: ThemeConfig = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: appColors.gray,
    primary25: appColors.ligherGray,
  },
})

export type CustomStylesArgs = {
  width?: number
}
export const customStyles = (
  args: CustomStylesArgs | undefined = {}
): StylesConfig<ReactSelectValues> => ({
  singleValue: (styles, state) => ({
    ...styles,
    color: appColors.black,
  }),
  control: (styles, state) => ({
    ...styles,
    cursor: "pointer",
    color: appColors.black,
    backgroundColor: appColors.white,
    width: args?.width || "auto",
    borderWidth: 2,
    borderColor: appColors.silver,
  }),
  menuPortal: (styles, state) => ({
    ...styles,
    zIndex: 9999,
  }),
  option: (styles, state) => ({
    ...styles,
    cursor: "pointer",
    color: state.isSelected ? appColors.white : appColors.black,
  }),
  indicatorSeparator: (styles, state) => ({
    ...styles,
    display: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: "unset",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    position: "absolute",
    padding: "0 5px",
    top: state.hasValue || state.selectProps.inputValue ? -14 : "17%",
    transition: "top 0.1s, font-size 0.1s",
    fontSize: (state.hasValue || state.selectProps.inputValue) && 12,
    fontWeight: state.hasValue || state.selectProps.inputValue ? 500 : 400,
    color:
      state.hasValue || state.selectProps.inputValue
        ? appColors.primary
        : appColors.black,
    backgroundColor: appColors.white,
    left: -5,
  }),
})

// Fetch method helper
export async function fetchHelper<DataType>(
  path: string,
  method: FetchMethod,
  data?: DataType
) {
  return fetch(path, {
    method,
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
      Cache: "no-cache",
    }),
  })
}

// Used to modify number, for example: 1000000 => 1 000 000
export const modifyNumbers = (numbers: number) => {
  const str: Array<string> = numbers.toString().split(".")
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1 ")
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ")
  }

  return str.join(".")
}

// Normalize date from server
export const normalizeDate = (datetime: string) => {
  if (datetime) {
    const date = datetime.substring(0, 10).split("-").reverse().join("-")
    const time = datetime.substring(11, 19).split("-").reverse().join("-")
    return `${date} ${time}`
  } else return EmptyString
}

// Normalize date to the server
export const formatDate = (datetime: Date) => {
  const dateString = datetime.toLocaleDateString("en-GB", { hour12: false })
  const timeString = datetime.toLocaleTimeString("en-IT", { hour12: false })
  const dateArr = dateString.split("/").reverse()
  const timeArr = timeString.split(":")

  for (let i = 0; i < dateArr.length; i++) {
    if (dateArr[i].length == 1) {
      dateArr[i] = "0" + dateArr[i]
    }
  }
  for (let j = 0; j < timeArr.length; j++) {
    timeArr[j] = "00"
  }
  const formattedDateString = dateArr.join("-")
  const formattedTimeString = timeArr.join(":").substring(0, 8)

  return `${formattedDateString}T${formattedTimeString}`
}

export const classNameGenerator = (classNames: string[]) => classNames.join(" ")

// 3/15/2022T12:00:00 AM

// Random ID generator
export const randomNumberIdGenerator = () => Math.floor(Math.random() * 10000)

// Transformation the firtst letter of a string to upper case
export const transformToUppercase = (str: string): string => {
  const array = str.split("-")
  if (array.length === 1) {
    return array.join()
  }
  const newArray = array.map((item, index) =>
    index === 0 ? item : `${item[0].toUpperCase() + item.slice(1)}`
  )
  return newArray.join(EmptyString)
}

export const checkPrivilege = (
  checkingKey: string,
  method: string
): boolean => {
  const parsedScope = JSON.parse(
    localStorage.getItem("scope")?.toString() || ""
  )[checkingKey]
  let count = 0
  for (let i = 0; i < parsedScope.length; i++) {
    if (parsedScope[i] === method) {
      count += 1
    }
  }
  return count > 0
}
