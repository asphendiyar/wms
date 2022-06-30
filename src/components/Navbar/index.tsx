import React, { Fragment, useEffect, useMemo, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { NavLink } from "react-router-dom"
import { RouteEnums } from "../../app/commonTypes"
import { StyledInput } from "../Common/styled"
import {
  NavbarItemsWrapper,
  NavbarWrapper,
  NavLinksGroupTitle,
  NavLinksItems,
  NavLinksWrapper,
} from "./style"

import { ReactComponent as ManagingIcon } from "../../assets/icons/administration.svg"
import { ReactComponent as CouriersIcons } from "../../assets/icons/couriers.svg"
import { ReactComponent as InboundIcon } from "../../assets/icons/inbound.svg"
import { ReactComponent as NomenklaturaIcon } from "../../assets/icons/nomenklatura.svg"
import { ReactComponent as OrderingIcon } from "../../assets/icons/ordering.svg"
import { ReactComponent as OstatkiIcon } from "../../assets/icons/remains.svg"

import { useTranslation } from "react-i18next"
import { EmptyString } from "../../app/helpers"

type NavInnerLinks = { text: string; to: string }
type NavLinks = {
  text: string
  icon?: JSX.Element
  iconPrimary?: JSX.Element
  innerLinks: Array<NavInnerLinks | null>
}

export const Links: React.FC<{ title: string; to: string; index: number }> = ({
  title,
  to,
}) => {
  return (
    <NavLink
      to={to}
      exact={!to.startsWith("/users")}
      className="linkWrapper"
      activeClassName="active"
      target={process.env.NODE_ENV === "production" ? "_blank" : "_self"}
    >
      {title}
    </NavLink>
  )
}

export const NavbarItems: React.FC<{
  onClick?: void
  title: string
  icon?: JSX.Element
  items: Array<NavInnerLinks | null>
  isOpen: boolean
}> = ({ title, icon, items, isOpen }) => {
  const [opened, setOpened] = useState<boolean>(false)

  useEffect(() => {
    setOpened(isOpen)
  }, [isOpen])

  return (
    <Fragment>
      <NavLinksWrapper>
        <NavLinksGroupTitle
          className={`d-flex ${opened ? "opened" : ""}`}
          onClick={() => setOpened(!opened)}
        >
          <div className="title-info d-flex">
            <span>{icon}</span>
            <span>{title}</span>
          </div>
          {opened ? <BsChevronUp /> : <BsChevronDown />}
        </NavLinksGroupTitle>
        <NavLinksItems className={opened ? "opened" : ""}>
          {items.map((i, index) => {
            return (
              i && <Links key={i.to} title={i.text} to={i.to} index={index} />
            )
          })}
        </NavLinksItems>
      </NavLinksWrapper>
    </Fragment>
  )
}
export const Navbar: React.FC = () => {
  const scope = JSON.parse(localStorage.getItem("scope") || "")
  const { t } = useTranslation()

  let links: Array<NavLinks> = useMemo(
    () => [
      {
        text: t("navbarGroups.remains"),
        icon: <OstatkiIcon />,
        innerLinks: [
          scope?.Containersbrw
            ? {
                text: t("pageTitle.tradeItemDocuments"),
                to: RouteEnums.tradeItemDocuments,
              }
            : null,
          scope?.InventoryLocationTreeBrw
            ? {
                text: t("pageTitle.warehouseProducts"),
                to: RouteEnums.warehouseProducts,
              }
            : null,
          scope?.InventoryLocationTreeBrw
            ? {
                text: t("pageTitle.inventories"),
                to: RouteEnums.inventories,
              }
            : null,
        ],
      },

      {
        text: t("navbarGroups.inbound"),
        icon: <InboundIcon />,
        innerLinks: [
          scope?.InOrdersbrw
            ? { text: t("pageTitle.inbound"), to: RouteEnums.inbound }
            : null,
        ],
      },
      {
        text: t("navbarGroups.orderProcess"),
        icon: <OrderingIcon />,
        innerLinks: [
          scope?.DistOrders
            ? { text: t("pageTitle.outbound"), to: RouteEnums.outbound }
            : null,
          scope?.Shipments
            ? { text: t("pageTitle.shipments"), to: RouteEnums.shipments }
            : null,
          scope?.SysOrders
            ? {
                text: t("pageTitle.pickingOrders"),
                to: RouteEnums.pickingOrders,
              }
            : null,
        ],
      },
      // {
      //   text: t("navbarGroups.reportManagement"),
      //   icon: <ControlAuditIcon />,
      //   innerLinks: [],
      // },
      {
        text: t("navbarGroups.administration"),
        icon: <ManagingIcon />,
        innerLinks: [
          scope?.Sku
            ? {
                text: t("pageTitle.productCatalog"),
                to: RouteEnums.productCatalog,
              }
            : null,
          scope?.UserManagerbrw
            ? { text: t("pageTitle.users"), to: RouteEnums.users }
            : null,
          scope?.LocationListTreeBrw
            ? { text: t("pageTitle.warehouseMap"), to: RouteEnums.warehouseMap }
            : null,
          scope?.Partners
            ? { text: t("pageTitle.partners"), to: RouteEnums.partners }
            : null,
          scope?.WarehouseBrw
            ? { text: t("pageTitle.warehouses"), to: RouteEnums.warehouses }
            : null,
          scope?.LocTypeBrw
            ? { text: t("pageTitle.cellTypes"), to: RouteEnums.cellTypes }
            : null,
          scope?.SysOrders
            ? {
                text: t("pageTitle.pickingPriorities"),
                to: RouteEnums.pickingPriorities,
              }
            : null,
          scope?.JobsBrw
            ? {
                text: t("pageTitle.backgroundTasks"),
                to: RouteEnums.backgroundTasks,
              }
            : null,
          scope?.PermReservationsBrw
            ? {
                text: t("pageTitle.periodicReservations"),
                to: RouteEnums.periodicReservations,
              }
            : null,

          {
            text: t("pageTitle.emailNotification"),
            to: RouteEnums.emailNotification,
          },
          scope?.PrintersBrw
            ? {
                text: t("pageTitle.printers"),
                to: RouteEnums.printers,
              }
            : null,
        ],
      },
      {
        text: t("navbarGroups.nomenclature"),
        icon: <NomenklaturaIcon />,
        innerLinks: [
          scope?.Skutreebrw
            ? { text: t("pageTitle.productsTree"), to: RouteEnums.productsTree }
            : null,
          scope?.PackTypebrw
            ? { text: t("pageTitle.tradeItems"), to: RouteEnums.tradeItems }
            : null,
          scope?.Erpwarehousesbrw
            ? {
                text: t("pageTitle.erpWarehouses"),
                to: RouteEnums.erpWarehouses,
              }
            : null,
          scope?.MeasureUnits
            ? { text: t("pageTitle.measureUnits"), to: RouteEnums.measureUnits }
            : null,
          scope?.EquipmentTypesbrw
            ? { text: t("pageTitle.equipments"), to: RouteEnums.equipments }
            : null,
          scope?.EquipmentTypesbrw
            ? { text: t("pageTitle.popularities"), to: RouteEnums.popularities }
            : null,
          scope?.EquipmentTypesbrw
            ? { text: t("pageTitle.commodities"), to: RouteEnums.commodities }
            : null,
        ],
      },
      {
        text: t("navbarGroups.couriers"),
        icon: <CouriersIcons />,
        innerLinks: [
          scope?.CouriersBrw
            ? { text: t("pageTitle.couriers"), to: RouteEnums.couriers }
            : null,
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [focused, setFocused] = useState<boolean>(false)
  const [query, setQuery] = useState<string>(EmptyString)
  const [isOpenOnChange, setIsOpenOnChange] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase())
    if (e.target.value.length > 0) setIsOpenOnChange(true)
    else setIsOpenOnChange(false)
  }

  if (query.length > 0) {
    links = links.filter((x) =>
      x.innerLinks.find((i) => {
        return (
          i && i.text.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
        )
      })
    )
  }

  return (
    <NavbarWrapper>
      <NavbarItemsWrapper>
        <div className="search-wrapper">
          <BiSearch className="search-icon" />
          <StyledInput
            style={{ paddingLeft: 25 }}
            placeholder={t("placeholders.search")}
            className={`${focused ? "focus" : EmptyString}`}
            onFocus={() => {
              setFocused(true)
            }}
            onBlur={() => {
              setFocused(false)
            }}
            onChange={handleChange}
            value={query}
          />
        </div>

        {links.map((item) => (
          <NavbarItems
            key={item.text}
            icon={item.icon}
            title={item.text}
            items={item.innerLinks}
            isOpen={isOpenOnChange}
          />
        ))}
      </NavbarItemsWrapper>
    </NavbarWrapper>
  )
}
