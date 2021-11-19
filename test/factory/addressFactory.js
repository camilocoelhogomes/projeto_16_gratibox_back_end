import faker from 'faker';

const addressFactory = () => ({
  cep: '89010025',
  state: 'SC',
  city: 'Blumenau',
  neighborhood: 'Centro',
  street: 'Rua Doutor Luiz de Freitas Melro',
  number: '20',
});

export default addressFactory;
