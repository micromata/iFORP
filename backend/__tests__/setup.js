import { View } from '../src/orm/entity/view';
import { Asset } from '../src/orm/entity/asset';
import { Image } from '../src/orm/entity/image';
import { ViewImageInteractionElement } from '../src/orm/entity/view-image-interaction-element';
import { Project } from '../src/orm/entity/project';
import { Whiteboard } from '../src/orm/entity/whiteboard';
import { getConnectionManager } from 'typeorm';
import { Page } from '../src/orm/entity/page';
import { Directory } from '../src/orm/entity/directory';
import { User } from '../src/orm/entity/user';
import { ViewLink } from '../src/orm/entity/view-link';
import { ViewAnnotation } from '../src/orm/entity/view-annotation';

export const createTestDatabaseConnection = () => {
  const connectionManager = getConnectionManager();
  return connectionManager.create({
    type: 'sqljs',
    synchronize: true,
    dropSchema: true,
    entities: [
      Asset,
      Image,
      Directory,
      ViewImageInteractionElement,
      Page,
      Project,
      User,
      View,
      ViewLink,
      ViewAnnotation,
      Whiteboard
    ]
  });
};
