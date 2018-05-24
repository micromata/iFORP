import { View } from '../../src/orm/entity/View';
import { PageAsset, ViewAsset } from '../../src/orm/entity/Asset';
import { InteractionElement } from '../../src/orm/entity/InteractionElement';
import { Project } from '../../src/orm/entity/Project';
import { Whiteboard } from '../../src/orm/entity/Whiteboard';
import { getConnectionManager } from 'typeorm';
import { Page } from '../../src/orm/entity/Page';
import { Directory } from '../../src/orm/entity/Directory';

export const createTestDatabaseConnection = () => {
  const connectionManager = getConnectionManager();
  return connectionManager.create({
    type: 'sqljs',
    synchronize: true,
    entities: [
      PageAsset,
      ViewAsset,
      Directory,
      InteractionElement,
      Page,
      Project,
      View,
      Whiteboard
    ]
  });
};
