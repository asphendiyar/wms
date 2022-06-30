import { useEffect, useState } from "react"
import { IconType } from "react-icons"
import { AiOutlineCloseCircle } from "react-icons/ai"
import {
  AlertCloserButton,
  AlertContainer,
  AlertIcon,
  AlertInfo,
  AlertMessage,
  AlertTitle,
  AlertWrapper,
} from "./style"

export type AlertListItem = {
  id: number
  icon: IconType
  title: string
  message: string
  bgColor: string
  onDelete?: (id: number) => void
}

type AlertProps = {
  alertList: AlertListItem[]
  autoDelete: boolean
  timeout: number
}

const Alert: React.FC<AlertProps> = ({ alertList, autoDelete, timeout }) => {
  const [list, setList] = useState<AlertListItem[]>(alertList)

  const deleteAlert = (id: number) => {
    const index = list.findIndex((e) => e.id === id)
    list.splice(index, 1)
    setList([...list])
    const AlertListItem = alertList.findIndex((item) => item.id === id)
    alertList.splice(AlertListItem, 1)
  }

  useEffect(() => {
    setList(alertList)
  }, [alertList, list])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (autoDelete && alertList.length && list.length) {
        alertList[0].onDelete && alertList[0].onDelete(alertList[0].id)
        deleteAlert(alertList[0].id)
      }
    }, timeout)
    return () => {
      clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDelete, list, timeout, alertList])

  return (
    <AlertContainer className="bottom-left">
      {list.map(({ icon: Icon, ...item }) => (
        <AlertWrapper
          key={item.id}
          className={`Alert bottom-left d-flex`}
          style={{ backgroundColor: item.bgColor }}
        >
          <AlertIcon>
            <Icon />
          </AlertIcon>
          <AlertInfo>
            <AlertTitle>{item.title}</AlertTitle>
            <AlertMessage>{item.message}</AlertMessage>
          </AlertInfo>
          <AlertCloserButton
            type="button"
            onClick={() => {
              item.onDelete && item.onDelete(item.id)
              deleteAlert(item.id)
            }}
          >
            <AiOutlineCloseCircle />
          </AlertCloserButton>
        </AlertWrapper>
      ))}
    </AlertContainer>
  )
}
export default Alert
