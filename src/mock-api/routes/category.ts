import {Server, Response} from 'miragejs';

export function registerCategoryRoutes(server: Server) {
  return [
    server.get('/category', schema => schema.all('category')),
    server.get('/category/:id', (schema, request) => {
      const id = request.params.id;
      const category = schema.find('category', id);

      if (!category) {
        return new Response(404);
      }

      return category;
    }),
    server.get('/category/:id/offers', (schema, request) => {
      const id = request.params.id;
      const category = schema.find('category', id);

      if (!category) {
        return new Response(404);
      }

      // @ts-ignore
      return category.offers;
    }),
  ];
}
