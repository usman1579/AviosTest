import {Category} from './category';

export type Offer = {
  id: string;
  merchantName: string;
  logo: string;
  rate: string;
  wasRate: string;
  startDate: string;
  endDate: string;
  isSpecial: boolean;
  categories: Category[];
};
