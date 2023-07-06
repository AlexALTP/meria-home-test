import {createServer} from 'miragejs';

export function makeServer({environment = 'test'}) {
  return createServer({
    environment,
    routes() {
      this.get('/api/users', () => [
        {
          id: 1,
          firstName: 'user1',
          lastName: 'toto',
          picture: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000',
        },
        {
          id: 2,
          firstName: 'user2',
          lastName: 'toto',
          picture: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000',
        },
        {
          id: 3,
          firstName: 'user3',
          lastName: 'toto',
          picture: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000',
        },
      ]);
      this.get('/api/projects', () => [
        {
          id: 1,
          name: 'Projet 1',
          description: 'La belle description',
          picture: 'https://cryptoast.fr/wp-content/uploads/2019/10/altcoins-crypto-monnaies.jpg',
          ownersList: [{
            id: 2,
            firstName: 'user2',
            lastName: 'toto',
            picture: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000',
          },
            {
              id: 3,
              firstName: 'user3',
              lastName: 'toto',
              picture: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000',
            }],
        },
        {
          id: 2,
          name: 'Projet 2',
          description: 'La belle description',
          picture: 'https://cryptoast.fr/wp-content/uploads/2019/10/altcoins-crypto-monnaies.jpg',
        },
        {
          id: 3,
          name: 'Projet 3',
          description: 'La belle description',
          picture: 'https://cryptoast.fr/wp-content/uploads/2019/10/altcoins-crypto-monnaies.jpg',
          ownersList: [{
            id: 1,
            firstName: 'user1',
            lastName: 'toto',
            picture: 'https://img.freepik.com/vecteurs-libre/homme-affaires-caractere-avatar-isole_24877-60111.jpg?w=2000',
          }],
        },
      ]);
      this.post('/api/newProject', () => {
        return 'ok';
      });
      this.patch('/api/project/:id', () => {
        return 'ok';
      });
      this.delete('/api/project/:id', () => {
        return 'ok';
      });
    },
  });
}
