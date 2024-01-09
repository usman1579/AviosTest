import {Factory} from 'miragejs';
import {faker} from '@faker-js/faker';

export const categoryFactory = Factory.extend({
  name(): string {
    return faker.person.firstName();
  },
  slug(): string {
    return this.name.toString().replace(' ', '-').toLowerCase();
  },
});
