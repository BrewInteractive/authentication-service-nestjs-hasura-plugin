import { HasuraCustomClaimsImporter } from './hasura-custom-claims-importer.type';
import { User } from '@brewww/authentication-service/dist/src/entities';

describe('HasuraCustomClaimsImporter', () => {
  let hasuraCustomClaimsImporter: HasuraCustomClaimsImporter;

  beforeEach(() => {
    hasuraCustomClaimsImporter = new HasuraCustomClaimsImporter();
  });

  it('should generate custom claims correctly', async () => {
    const user = {
      id: '12345',
      email: 'test@example.com',
      username: 'testuser',
      roles: [
        {
          role: {
            name: 'admin',
          },
        },
        {
          role: {
            name: 'user',
          },
        },
      ],
    };

    const expectedCustomClaims = [
      {
        name: 'https://hasura.io/jwt/claims',
        value: {
          'x-hasura-user-id': '12345',
          'x-hasura-email': 'test@example.com',
          'x-hasura-username': 'testuser',
          'x-hasura-default-role': 'admin',
          'x-hasura-allowed-roles': ['admin', 'user'],
        },
      },
    ];

    const customClaims = await hasuraCustomClaimsImporter.getCustomClaimsAsync(
      user as User,
    );

    expect(customClaims).toEqual(expectedCustomClaims);
  });
});
