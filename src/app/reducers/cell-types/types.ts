import { PostResponse, PutResponse } from "../../commonTypes"

export interface CellTypesBase {
  name_kk: string
  name_ru: string
  name_en: string
  type: string
  length: number
  width: number
  height: number
  volume: number
  weight: number
  tolerance: number
  storage_type: string
  rotation: string
  is_follow_the_sequence: boolean
  name?: string
}

export interface CellTypesFormValues extends CellTypesBase {
  code: string
}
export interface CellTypesParams {
  data: CellTypesBase
  code: string
}

export interface CellTypesContentType extends CellTypesBase {
  id: number
  code: string
}

export interface CellTypesWithPage {
  content: CellTypesContentType[]
  number: number
  number_of_elements: number
  total_elements: number
  total_pages: number
}
export interface CellTypesInitials {
  allCellTypes: CellTypesWithPage
  detailedCellType: CellTypesContentType | null
  createCellType: PostResponse | null
  putCellType: PutResponse | null
}

export enum CellTypeEnums {
  getAllCellTypes = "cell-types/get/all",
  getSearchAllCellTypes = "cell-types/get/search",
  getDetailedCellTypes = "cell-types/get/one",
  postCellTypes = "cell-types/post/one",
  putCellTypes = "cell-types/put/one",
}
