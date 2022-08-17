import { SortOrderOption } from './Database';

export const ItemSortKey = {
  ID: 'ID',
  TITLE: 'TITLE',
  PRICE: 'PRICE',
  TITLE_PRICE_0: 'TITLEPRICE0',
  TITLE_PRICE_1: 'TITLEPRICE1'
} as const;

export type ItemSortKeyOption = typeof ItemSortKey[keyof typeof ItemSortKey];

export interface SelectItem {
  catCode?: string;
  maxPrice?: number;
  memberNum?: number;
  minPrice?: number;
  skip?: number;
  sortKey?: ItemSortKeyOption;
  sortOrder?: SortOrderOption;
  stateCode?: string;
  take?: number;
  title?: string;
}

export interface UpdateItem {
  title?: string;
  description?: string;
  price?: number;
}

export interface Item {
  itemNum: number;
  catCode: string;
  price: number;
  title: string;
  imgUrl: string;
  description: string;
  memberNickName: string;
  memberThumbImgUrl: string;
}
