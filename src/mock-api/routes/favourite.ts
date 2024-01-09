import {Server, Response} from 'miragejs';

export function registerFavouriteRoutes(server: Server) {
  return [
    server.get('/favourite/:memberId', (schema, request) => {
      const memberId = request.params.memberId;
      const member = schema.find('member', memberId);

      if (!member) {
        return new Response(200, {}, {});
      }

      // @ts-ignore
      return member.favourites;
    }),
  ];
}
