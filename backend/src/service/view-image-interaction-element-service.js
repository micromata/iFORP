import { getRepository } from 'typeorm';
import { View } from '../orm/entity/view';
import { ViewImageInteractionElement } from '../orm/entity/view-image-interaction-element';
import { exceptionWithHttpStatus } from '../utils/request';

export const save = async (viewId, base) => {
  const viewRepo = getRepository(View);
  const interactionElementRepo = getRepository(ViewImageInteractionElement);

  const view = await viewRepo.findOne(viewId);
  if (!view) {
    throw exceptionWithHttpStatus(
      `Cannot add interaction element to non existent view.`,
      404
    );
  }
  const interactionElement = base;
  interactionElement.view = view;
  return interactionElementRepo.save(interactionElement);
};
