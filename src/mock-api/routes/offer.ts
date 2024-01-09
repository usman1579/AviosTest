import {Server} from 'miragejs';

export function registerOfferRoutes(server: Server) {
  return [
    server.get('/offer'),
    server.get('/offer/:id'),
    server.get('/offer/search', (schema, request) => {
      const attrs = request.queryParams;
      return schema.where('offer', attrs);
    }),
  ];
}
