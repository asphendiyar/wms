import { useState } from "react";
import {
  CollapseItemChildrenWrapper,
  CollapseItemTitle,
  CollapseViewWrapper,
} from "../../pages/Users/style";
import { ReactComponent as ShieldLockIcon } from "../../assets/icons/shield_lock.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as Lock } from "../../assets/icons/lock.svg";

export type CollapseItemProps = {
  id: string | number;
  code?: string;
  title: string;
  children?: CollapseItemProps[];
  handleClickParent?: (id: number) => void;
};

const CollapseItem: React.FC<CollapseItemProps> = ({
  id,
  title,
  children,
  handleClickParent,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const handleClickItem = () => {
    if (children) {
      setCollapsed(!collapsed);
      handleClickParent && collapsed && handleClickParent(Number(id));
    }
  };

  return (
    <div className="collapse-item__wrapper">
      <CollapseItemTitle
        onClick={handleClickItem}
        className={collapsed ? "collapsed" : "expanded"}
      >
        <div className="collapse-item__title">
          {children ? <ShieldLockIcon /> : <Lock />}
          <h4 className="collapse-item__title-text">{title}</h4>
        </div>
        {children && (
          <span className="collapse-item__arrow">
            {!collapsed ? <ArrowUp /> : <ArrowDown />}
          </span>
        )}
      </CollapseItemTitle>
      {children && (
        <CollapseItemChildrenWrapper
          className={collapsed ? "collapsed" : "expanded"}
        >
          {children.map((child) => (
            <CollapseItem
              key={child.code || child.id}
              id={child.id}
              title={child.title}
            />
          ))}
        </CollapseItemChildrenWrapper>
      )}
    </div>
  );
};

const CollapseView: React.FC<{
  items: CollapseItemProps[];
  handleClickParent?: (id: number) => void;
}> = ({ items, handleClickParent }) => {
  return (
    <CollapseViewWrapper maxHeight="calc(100vh - 215px)">
      {items.map((item) => (
        <CollapseItem
          key={item.code}
          handleClickParent={handleClickParent}
          {...item}
        />
      ))}
    </CollapseViewWrapper>
  );
};

export default CollapseView;
