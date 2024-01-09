import {Factory} from 'miragejs';
import {faker} from '@faker-js/faker';

export const memberFactory = Factory.extend({
  firstName(): string {
    return faker.person.firstName();
  },
  lastName(): string {
    return faker.person.lastName();
  },
  email(): string {
    const firstName = this.firstName.toString().toLowerCase();
    const lastName = this.lastName.toString().toLowerCase();
    return faker.internet.email({firstName, lastName});
  },
  password(): string {
    return faker.internet.password({length: 9});
  },
  avios(): number {
    return faker.number.int({max: 15000});
  },
});
