import {Factory} from 'miragejs';
import {faker} from '@faker-js/faker';

function isSpecial(index: number) {
  return index % 3 === 0 || index % 7 === 0;
}

export const offerFactory = Factory.extend({
  merchantName(): string {
    return faker.company.name();
  },
  logo(): string {
    return faker.image.urlLoremFlickr({width: 120, height: 120});
  },
  rate(): string {
    const ratePrefix = faker.datatype.boolean(0.5) ? 'Up to ' : '';
    return `${ratePrefix}${faker.number.int({min: 3, max: 10})} Avios / £1`;
  },
  wasRate(index: number): string | null {
    const ratePrefix = faker.datatype.boolean(0.5) ? 'Up to ' : '';
    return isSpecial(index)
      ? `${ratePrefix}${faker.number.int({min: 1, max: 3})} Avios / £1`
      : null;
  },
  startDate(index: number): string | null {
    return isSpecial(index)
      ? faker.date.recent({days: faker.number.int({min: 1, max: 10})}).toLocaleDateString()
      : null;
  },
  endDate(index: number): string | null {
    return isSpecial(index)
      ? faker.date.soon({days: faker.number.int({min: 5, max: 20})}).toLocaleDateString()
      : null;
  },
  isSpecial(index: number): boolean {
    return isSpecial(index);
  },
});
