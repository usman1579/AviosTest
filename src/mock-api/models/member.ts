import {Offer} from './offer';

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avios: number;
  favourites: Offer[];
};
