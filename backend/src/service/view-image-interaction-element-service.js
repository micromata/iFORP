import { getConnection, getRepository } from 'typeorm';
import { View } from '../orm/entity/view';
import { ViewLink } from '../orm/entity/view-link';
import { ViewImageInteractionElement } from '../orm/entity/view-image-interaction-element';
import { exceptionWithHttpStatus } from '../utils/request';
import { getConfiguration } from '../get-configuration';
const { whiteboard: whiteboardOptions } = getConfiguration();

export const save = async (viewId, base) => {
  const viewRepo = getRepository(View);
  const interactionElementRepo = getRepository(ViewImageInteractionElement);

  const view = await viewRepo.findOne(viewId);
  if (!view) {
    throw exceptionWithHttpStatus(
      `Interaktionselement kann zu nicht existierender View nicht hinzugefügt werden.`,
      404
    );
  }

  if (whiteboardOptions.clickflow === 'linear') {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(ViewLink)
      .where('fromViewId = :viewId', { viewId: `${viewId}` })
      .execute();

    getConnection()
      .createQueryBuilder()
      .delete()
      .from(ViewImageInteractionElement)
      .where('viewId = :viewId', { viewId: `${viewId}` })
      .execute();
  }

  const interactionElement = base;
  interactionElement.view = view;
  const saved = await interactionElementRepo.save(interactionElement);

  return {
    id: saved.id,
    x: saved.x,
    y: saved.y,
    width: saved.width,
    height: saved.height
  };
};

export const remove = async id => {
  const interactionElementRepo = getRepository(ViewImageInteractionElement);

  getConnection()
    .createQueryBuilder()
    .delete()
    .from(ViewLink)
    .where('interactionId = :interactionId', { interactionId: `${id}` })
    .execute();

  return interactionElementRepo.delete(id);
};
