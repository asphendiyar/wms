import { ReactSelectValues } from "../../commonTypes";

const empty: ReactSelectValues[] = [];

export const lists = {
  background: {
    type: empty,
    periodicReservationType: empty,
  },
  systemParam: {
    type: empty,
  },
  courier: {
    state: empty,
  },
  email: {
    states: empty,
  },
  general: {
    state: empty,
  },
  inbound: {
    state: empty,
    processing: empty,
    creatonSource: empty,
    type: empty,
  },
  movement: {
    states: empty,
  },
  outbound: {
    type: empty,
    state: empty,
    shipmentState: empty,
  },
  packaging: {
    state: empty,
  },
  partner: {
    type: empty,
  },
  picking: {
    state: empty,
    tasks: empty,
    taskStates: empty,
  },
  productCard: {
    state: empty,
    kitType: empty,
    processingType: empty,
    rotation: empty,
    measure_state: empty,
    accuracy_of_production_date: empty,
    accuracy_of_expiration_date: empty,
    account_serial_number: empty,
  },
  sso: {
    locale: empty,
    state: empty,
    gender: empty,
  },
  tradeItem: {
    states: empty,
  },
  warehouse: {
    cell: empty,
    cellState: empty,
    cellType: empty,
    storageType: empty,
    rotationType: empty,
    functionalZoneFunctions: empty,
    packing_station_type: empty,
    pickingMethod: empty,
    replenishmentMethod: empty,
    commodityUnitDisassemblyRules: empty,
    packageDisassemblyRules: empty,
    tradeItemTypes: empty,
    tradeItemContents: empty,
    retentionRules: empty,
    deliveryStates: empty,
    rampTypes: empty,
    erpWarehouseTypes: empty,
    cellChainMethods: empty,
    cellChainTypes: empty,
    cellChainChangeElements: empty,
    cellChainPositions: empty,
    cellChainSorting: empty,
    storeWithoutTradeItem: empty,
    storeInTradeItemSameLevel: empty,
  },
};

export const dictionaryCodes = {
  background: {
    self: "background",
    type: "type",
    periodicReservationType: "periodic-reservation-type",
  },
  systemParam: {
    self: "system-param",
    type: "type",
  },
  courier: {
    self: "courier",
    state: "state",
  },
  email: {
    self: "email",
    states: "states",
  },
  general: {
    self: "general",
    state: "state",
  },
  inbound: {
    self: "inbound",
    state: "state",
    processing: "processing",
    creatonSource: "creaton-source",
    type: "type",
  },
  movement: {
    self: "movement",
    states: "states",
  },
  outbound: {
    self: "outbound",
    type: "type",
    state: "state",
    shipmentState: "shipment-state",
  },
  packaging: {
    self: "packaging",
    state: "state",
  },
  partner: {
    self: "partner",
    type: "type",
  },
  picking: {
    self: "picking",
    state: "state",
    tasks: "tasks",
    taskStates: "task-states",
  },
  productCard: {
    self: "product-card",
    state: "state",
    kitType: "kit-type",
    processingType: "processing-type",
    rotation: "rotation",
    measure_state: "measure_state",
    accuracy_of_production_date: "accuracy_of_production_date",
    accuracy_of_expiration_date: "accuracy_of_expiration_date",
    account_serial_number: "account_serial_number",
  },
  sso: {
    self: "sso",
    locale: "locale",
    state: "state",
    gender: "gender",
  },
  tradeItem: {
    self: "trade-item",
    states: "states",
  },
  warehouse: {
    self: "warehouse",
    cell: "cell",
    cellState: "cell-state",
    cellType: "cell-type",
    storageType: "storage-type",
    rotationType: "rotation-type",
    functionalZoneFunctions: "functional-zone-functions",
    packing_station_type: "packing_station_type",
    pickingMethod: "picking-method",
    replenishmentMethod: "replenishment-method",
    commodityUnitDisassemblyRules: "commodity-unit-disassembly-rules",
    packageDisassemblyRules: "package-disassembly-rules",
    tradeItemTypes: "trade-item-types",
    tradeItemContents: "trade-item-contents",
    retentionRules: "retention-rules",
    deliveryStates: "delivery-states",
    rampTypes: "ramp-types",
    erpWarehouseTypes: "erp-warehouse-types",
    cellChainMethods: "cell-chain-methods",
    cellChainTypes: "cell-chain-types",
    cellChainChangeElements: "cell-chain-change-elements",
    cellChainPositions: "cell-chain-positions",
    cellChainSorting: "cell-chain-sorting",
    storeWithoutTradeItem: "store-without-trade-item",
    storeInTradeItemSameLevel: "store-in-trade-item-same-level",
  },
};
