import superb from 'superb';
import { getRepository } from 'typeorm';
import { View } from '../orm/entity/view';
import { ViewAnnotation } from '../orm/entity/view-annotation';
import { exceptionWithHttpStatus } from '../utils/request';

export const save = async (viewId, base) => {
  const viewRepo = getRepository(View);
  const viewAnnotationRepo = getRepository(ViewAnnotation);

  const view = await viewRepo.findOne(viewId);
  if (!view) {
    throw exceptionWithHttpStatus(
      `Cannot add annotation to non existent view.`,
      404
    );
  }
  const annotation = base;
  annotation.view = view;
  annotation.text = annotation.text || `${superb.random()} Annotation`;
  return viewAnnotationRepo.save(annotation);
};

export const findById = async id => {
  const viewAnnotationRepo = getRepository(ViewAnnotation);

  const annotation = await viewAnnotationRepo.findOne(id);
  if (!annotation) {
    throw exceptionWithHttpStatus(
      `ViewAnnotation with ID ${id} not found.`,
      404
    );
  }
  return annotation;
};

export const remove = async id => {
  const viewAnnotationRepo = getRepository(ViewAnnotation);
  return viewAnnotationRepo.delete(id);
};

export const replace = async (id, base) => {
  const viewAnnotationRepo = getRepository(ViewAnnotation);
  const annotation = await viewAnnotationRepo.findOne(id);

  if (!annotation) {
    throw exceptionWithHttpStatus(
      `Cannot replace ViewAnnotation with ID ${id}`,
      404
    );
  }

  annotation.text = base.text;
  annotation.viewportSize = base.viewportSize;
  annotation.x = base.x;
  annotation.y = base.y;

  return viewAnnotationRepo.save(annotation);
};
