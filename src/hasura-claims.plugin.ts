import { Inject, Injectable } from '@nestjs/common';
import { BasePlugin } from '@brewww/authentication-service/dist/src/plugin/abstract/base-plugin.plugin';
import { TokenService } from '@brewww/authentication-service/dist/src/token/token.service';
import { authenticationService } from '../package.json';
import { HasuraCustomClaimsImporter } from './concrete/hasura-custom-claims-importer.type';

@Injectable()
export class HasuraClaimsPlugin extends BasePlugin {
  @Inject('TokenService')
  private tokenService: TokenService;
  constructor() {
    super(authenticationService);
  }

  async load(): Promise<void> {
    this.tokenService.addCustomClaimImporter(new HasuraCustomClaimsImporter());
    return Promise.resolve();
  }
}
