import faker from 'faker';

const addressFactory = () => ({
  completeName: faker.name.findName(),
  cep: '89010025',
  state: 'SC',
  city: 'Blumenau',
  neighborhood: 'Centro',
  street: 'Rua Doutor Luiz de Freitas Melro',
  number: '20',
});

export default addressFactory;
