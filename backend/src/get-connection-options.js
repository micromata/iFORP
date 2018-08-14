import path from 'path';
import os from 'os';

export default () => {
  return {
    type: 'sqlite',
    database: path.resolve(os.homedir(), '.iforp/database.sqlite'),
    synchronize: true,
    logging: true,
    entities: [path.resolve(__dirname, 'orm/entity/**/*.js')],
    migrations: [path.resolve(__dirname, 'orm/migration/**/*.js')],
    subscribers: [path.resolve(__dirname, 'orm/subscriber/**/*.js')]
  };
};
