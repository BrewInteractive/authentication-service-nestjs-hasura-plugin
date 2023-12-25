import { CustomClaim } from '@brewww/authentication-service/dist/src/token/concrete/custom-claim.type';
import { ICustomClaimsImporter } from '@brewww/authentication-service/dist/src/token/interfaces/custom-claims-importer.interface';
import { User } from '@brewww/authentication-service/dist/src/entities';

export class HasuraCustomClaimsImporter implements ICustomClaimsImporter {
  async getCustomClaimsAsync(user: User): Promise<CustomClaim[]> {
    const customClaims = {};

    customClaims['x-hasura-user-id'] = user.id;
    if (user.email) customClaims['x-hasura-email'] = user.email;
    if (user.username) customClaims['x-hasura-username'] = user.username;
    if (user?.roles?.length > 0) {
      const roles = user.roles.map((userRole) => userRole.role.name);
      customClaims['x-hasura-default-role'] = roles[0];
      customClaims['x-hasura-allowed-roles'] = roles;
    }

    return [new CustomClaim('https://hasura.io/jwt/claims', customClaims)];
  }
}
