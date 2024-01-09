import {createServer, Model, belongsTo, hasMany} from 'miragejs';
import {offerFactory, memberFactory, categoryFactory} from './factories';
import {
  registerOfferRoutes,
  registerMemberRoutes,
  registerCategoryRoutes,
  registerFavouriteRoutes,
} from './routes';
import {server} from '@/config';

export function startServer(environment = 'development') {
  if (server.initialised) {
    server.initialised.shutdown();
  }

  server.initialised = createServer({
    environment,
    models: {
      offer: Model.extend({
        category: belongsTo(),
      }),
      category: Model.extend({
        offers: hasMany(),
      }),
      member: Model.extend({
        favourites: hasMany('offer'),
      }),
    },
    factories: {
      offer: offerFactory,
      member: memberFactory,
      category: categoryFactory,
    },
    seeds: _server => {
      const foodAndDrinkCategory = _server.create('category', {
        name: 'Food and Drink',
        slug: 'food-and-drink',
      });

      const electricals = _server.create('category', {
        name: 'Electricals',
        slug: 'electricals',
      });

      const travel = _server.create('category', {
        name: 'Travel',
        slug: 'travel',
      });

      const sportAndFitness = _server.create('category', {
        name: 'Sport and Fitness',
        slug: 'sport-and-fitness',
      });

      const healthAndBeauty = _server.create('category', {
        name: 'Health and Beauty',
        slug: 'health-and-beauty',
      });

      _server.createList('offer', 10, {category: foodAndDrinkCategory});
      _server.createList('offer', 10, {category: electricals});
      _server.createList('offer', 10, {category: travel});
      _server.createList('offer', 10, {category: sportAndFitness});
      _server.createList('offer', 10, {category: healthAndBeauty});

      _server.create('member', {
        firstName: 'Alex',
        lastName: 'Bailey',
        email: 'alex.bailey.test@avios.com',
        password: 'Test@1234!',
        avios: 15000,
        favourites: [
          _server.create('offer', {category: sportAndFitness}),
          _server.create('offer', {category: sportAndFitness}),
          _server.create('offer', {category: foodAndDrinkCategory}),
          _server.create('offer', {category: foodAndDrinkCategory}),
          _server.create('offer', {category: electricals}),
          _server.create('offer', {category: electricals}),
        ],
      });
    },
    routes() {
      this.urlPrefix = '/api';
      registerOfferRoutes(this);
      registerMemberRoutes(this);
      registerCategoryRoutes(this);
      registerFavouriteRoutes(this);
    },
  });
}
