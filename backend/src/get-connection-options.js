import path from 'path';

export default () => {
  return {
    type: 'sqlite',
    database: path.resolve(__dirname, '../database.sqlite'),
    synchronize: true,
    logging: false,
    entities: [path.resolve(__dirname, 'orm/entity/**/*.js')],
    migrations: [path.resolve(__dirname, 'orm/migration/**/*.js')],
    subscribers: [path.resolve(__dirname, 'orm/subscriber/**/*.js')]
  };
};
