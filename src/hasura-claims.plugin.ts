import { Inject, Injectable } from '@nestjs/common';
import { BasePlugin } from '@brewww/authentication-service/dist/src/plugin/abstract/base-plugin.plugin';
import { TokenService } from '@brewww/authentication-service/dist/src/token/token.service';
import { User } from '@brewww/authentication-service/dist/src/models/user.entity';
import { authenticationService } from '../package.json';

@Injectable()
export class HasuraClaimsPlugin extends BasePlugin {
  @Inject('TokenService')
  private tokenService: TokenService;
  private hasuraClaims: object = {};
  constructor() {
    super(authenticationService);
  }

  async load(): Promise<void> {
    this.tokenService.getCustomClaims = this._getCustomClaims.bind(this);
    return Promise.resolve();
  }

  private _getCustomClaims(user: User): object {
    this._addCustomHasuraClaims('x-hasura-user-id', user.id);
    if (user.email) this._addCustomHasuraClaims('x-hasura-email', user.email);
    if (user.username)
      this._addCustomHasuraClaims('x-hasura-username', user.username);
    if (user?.roles?.length > 0) {
      const roles = user.roles.map((userRole) => userRole.role.name);
      this._addCustomHasuraClaims('x-hasura-default-role', roles[0]);
      this._addCustomHasuraClaims('x-hasura-allowed-roles', roles);
    }
    return { 'https://hasura.io/jwt/claims': this.hasuraClaims };
  }

  private _addCustomHasuraClaims(claimsName: string, claimsValue: any) {
    this.hasuraClaims[claimsName] = claimsValue;
  }
}
