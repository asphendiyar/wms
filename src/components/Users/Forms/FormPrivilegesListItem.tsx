import { ChangeEvent, useState } from "react"
import {
  PrivilegeListItemChildrenWrapper,
  PrivilegeListItemTitle,
} from "../../../pages/Users/style"
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrow-down.svg"
import { ReactComponent as ArrowUp } from "../../../assets/icons/arrow-up.svg"
import Checkbox from "../../Common/Checkbox"
import { useAppDispatch } from "../../../app/hooks"
import { setFormPrivileges } from "../../../app/reducers/users"
import { FormPrivilegesGroup } from "../../../app/reducers/users/types"

const FormPrivilegesListItem: React.FC<FormPrivilegesGroup> = ({
  id,
  name,
  privileges,
  checked,
}) => {
  const dispatch = useAppDispatch()

  const [collapsed, setCollapsed] = useState<boolean>(true)

  const handleClickItem = () => {
    privileges && setCollapsed(!collapsed)
  }

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormPrivileges({ id, checked: e.target.checked }))
  }

  return (
    <div className="form-privileges__list-item">
      <PrivilegeListItemTitle
        onClick={handleClickItem}
        className={collapsed ? "collapsed" : "expanded"}
      >
        <Checkbox
          label={name}
          value={checked}
          onChange={handleChangeCheckbox}
        />
        {privileges && (
          <span className="collapse-item__arrow">
            {!collapsed ? <ArrowUp /> : <ArrowDown />}
          </span>
        )}
      </PrivilegeListItemTitle>

      {privileges && (
        <PrivilegeListItemChildrenWrapper
          className={`${collapsed ? "collapsed" : "expanded"}`}
        >
          {privileges.map((privilege) => (
            <FormPrivilegesListItem
              key={privilege.code || privilege.id}
              {...privilege}
            />
          ))}
        </PrivilegeListItemChildrenWrapper>
      )}
    </div>
  )
}

export default FormPrivilegesListItem
