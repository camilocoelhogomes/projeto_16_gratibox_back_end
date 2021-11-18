import faker from 'faker';
import RandExp from 'randexp';

const userFactory = () => ({
  userName: faker.name.firstName(),
  userEmail: faker.internet.email(),
  userPassword: new RandExp(/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}).*$/).gen(),
});

export default userFactory;
