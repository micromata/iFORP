import { View } from '../src/orm/entity/view';
import { Asset } from '../src/orm/entity/asset';
import { InteractionElement } from '../src/orm/entity/interaction-element';
import { Project } from '../src/orm/entity/project';
import { Whiteboard } from '../src/orm/entity/whiteboard';
import { getConnectionManager } from 'typeorm';
import { Page } from '../src/orm/entity/page';
import { Directory } from '../src/orm/entity/directory';
import { User } from '../src/orm/entity/user';

export const createTestDatabaseConnection = () => {
  const connectionManager = getConnectionManager();
  return connectionManager.create({
    type: 'sqljs',
    synchronize: true,
    dropSchema: true,
    entities: [
      Asset,
      Directory,
      InteractionElement,
      Page,
      Project,
      User,
      View,
      Whiteboard
    ]
  });
};
