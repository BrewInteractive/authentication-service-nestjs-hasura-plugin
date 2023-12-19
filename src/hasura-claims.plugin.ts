import { Inject, Injectable } from '@nestjs/common';

import { BasePlugin } from '@brewww/nestjs-plugin-module';
import { HasuraCustomClaimsImporter } from './concrete/hasura-custom-claims-importer.type';
import { TokenService } from '@brewww/authentication-service/dist/src/token/token.service';
import { pluginModule } from '../package.json';

@Injectable()
export class HasuraClaimsPlugin extends BasePlugin {
  @Inject('TokenService')
  private tokenService: TokenService;
  constructor() {
    super(pluginModule);
  }

  async load(): Promise<void> {
    this.tokenService.addCustomClaimImporter(new HasuraCustomClaimsImporter());
    return Promise.resolve();
  }
}
