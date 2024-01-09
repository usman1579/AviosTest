import {Offer} from './offer';

export type Category = {
  id: string;
  name: string;
  offers: Offer[];
};
