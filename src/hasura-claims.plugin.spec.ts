import { Test, TestingModule } from '@nestjs/testing';

import { DataSource } from 'typeorm';
import { HasuraClaimsPlugin } from './hasura-claims.plugin';
import { HasuraCustomClaimsImporter } from './concrete/hasura-custom-claims-importer.type';
import { TokenModule } from '@brewww/authentication-service/dist/src/token/token.module';
import { TokenService } from '@brewww/authentication-service/dist/src/token/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@brewww/authentication-service/dist/db/data-source';
import { setupTestDataSourceAsync } from '../test/test-db';

describe('HasuraClaimsPlugin', () => {
  let plugin: HasuraClaimsPlugin;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dataSourceOptions), TokenModule],
      providers: [HasuraClaimsPlugin],
    })
      .overrideProvider(DataSource)
      .useValue(await setupTestDataSourceAsync())
      .compile();

    plugin = module.get<HasuraClaimsPlugin>(HasuraClaimsPlugin);
    await plugin.load();
    tokenService = module.get<TokenService>('TokenService');
  });

  it('Should be defined', () => {
    expect(plugin).toBeDefined();
  });

  it('should add HasuraCustomClaimsImporter to TokenService', async () => {
    const addCustomClaimImporterSpy = jest.spyOn(
      tokenService,
      'addCustomClaimImporter',
    );

    await plugin.load();

    expect(addCustomClaimImporterSpy).toHaveBeenCalledWith(
      new HasuraCustomClaimsImporter(),
    );
  });
});
