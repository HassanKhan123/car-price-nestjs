import { Test } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('Auth Service', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('jhahjsa@jk.asd', 'sdd');

    expect(user.password).not.toEqual('sdd');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    service.signup('asdf@asdf.com', 'asdf').catch((e) => done());
  });

  it('throws if signin is called with an unused email', (done) => {
    service.signin('asdf@asdfsddsdsdsds.com', 'asdf').catch((e) => done());
  });

  it('throws if an invalid password is provided', (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'jhahjsa@jk.asd', password: 'sdd' } as User,
      ]);
    service.signin('jhahjsa@jk.asd', 'password').catch((e) => done());
  });
});
