import { Test, TestingModule } from '@nestjs/testing';
import { HasuraClaimsPlugin } from './hasura-claims.plugin';
import { TokenService } from '@brewww/authentication-service/dist/src/token/token.service';
import { TokenModule } from '@brewww/authentication-service/dist/src/token/token.module';
import { User } from '@brewww/authentication-service/dist/src/models/user.entity';

describe('HasuraClaimsPlugin', () => {
  let plugin: HasuraClaimsPlugin;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TokenModule],
      providers: [HasuraClaimsPlugin],
    }).compile();

    plugin = module.get<HasuraClaimsPlugin>(HasuraClaimsPlugin);
    await plugin.load();
    tokenService = module.get<TokenService>('TokenService');
  });

  it('Should be defined', () => {
    expect(plugin).toBeDefined();
  });

  it('Should override getCustomClaims method of TokenService', () => {
    const user: User = <User>(<unknown>{
      id: '1',
      username: 'john.doe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      passwordHash: 'hashedPassword123',
      passwordSalt: 'passwordSalt456',
      emailVerified: true,
      createdAt: '2023-05-31T12:34:56.789Z',
      updatedAt: '2023-05-31T12:34:56.789Z',
    });

    const customClaims = tokenService.getCustomClaims(user);
    expect(customClaims['https://hasura.io/jwt/claims']).toBeDefined();
  });
});
