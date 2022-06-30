import { AnyAction } from "@reduxjs/toolkit";
import React, { Fragment, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFolderOpen, FaFolderPlus, FaFolderMinus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { TreeNode as TreeNodeTypes } from "../../../app/commonTypes";
import { EmptyString } from "../../../app/helpers";
import { useAppDispatch } from "../../../app/hooks";
import { LoadingIcon } from "../LoadingIcon";
import { TreeNodeChildrenWrapper, TreeNodeTitle } from "./style";

const TreeNode: React.FC<{
  node: TreeNodeTypes | undefined;
  fetchingNodeId?: string;
  handleClick?: (node: TreeNodeTypes) => void;
  selected?: string;
  childrenCleaner: (id: string) => AnyAction;
}> = ({ ...props }) => {
  const { node, fetchingNodeId, handleClick, selected, childrenCleaner } =
    props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleClickTitle = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
    if (node) {
      handleClick && !expanded && handleClick(node);
      expanded && node.hasChild && dispatch(childrenCleaner(node.id));
    }
  };

  if (!node) return <div> {t("alerts.noData")}</div>;

  return (
    <Fragment>
      <div className="tree-node__wrapper">
        <NavLink to={node.routePath} onClick={handleClickTitle}>
          <TreeNodeTitle
            className={selected === node.id ? "selected" : EmptyString}
          >
            <span className="tree-title__icon">
              {fetchingNodeId === node.id ? (
                <LoadingIcon fontSize="23px" />
              ) : node.hasChild ? (
                expanded ? (
                  <FaFolderOpen />
                ) : (
                  <FaFolderPlus />
                )
              ) : (
                <FaFolderMinus />
              )}
            </span>
            <span>{node.title}</span>
          </TreeNodeTitle>
        </NavLink>
        <TreeNodeChildrenWrapper
          nodeId={node.id}
          className={expanded ? "node-" + node.id + "-expanded" : EmptyString}
        >
          {node.childNodes.map((item) => (
            <TreeNode
              key={item.id}
              node={item}
              fetchingNodeId={fetchingNodeId}
              handleClick={handleClick}
              selected={selected}
              childrenCleaner={childrenCleaner}
            />
          ))}
        </TreeNodeChildrenWrapper>
      </div>
    </Fragment>
  );
};

export default React.memo(TreeNode);
