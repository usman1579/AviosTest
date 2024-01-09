import {Server, Response} from 'miragejs';
import {faker} from '@faker-js/faker';

export function registerMemberRoutes(server: Server) {
  return [
    server.post('/member/signup', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const member = schema.create('member', attrs);

      if (!member) {
        return new Response(400);
      }

      // @ts-ignore
      delete member.password;

      return member;
    }),
    server.post('/member/signin', (schema, request) => {
      const attrs = JSON.parse(request.requestBody);
      const member = schema.findBy('member', attrs);

      if (!member) {
        return new Response(401);
      }

      // @ts-ignore
      delete member.password;

      const token = faker.internet.password({length: 20});

      return {member, token};
    }),
    server.get('/member/:id', (schema, request) => {
      const id = request.params.id;
      const member = schema.find('member', id);

      if (!member) {
        return new Response(404);
      }

      // @ts-ignore
      delete member.password;

      return member;
    }),
  ];
}
