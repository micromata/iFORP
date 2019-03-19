import { randomSuperbWord } from '../utils/superb-words';
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
      `Anmerkung kan zu einer nicht existierenden View nicht hinzugefügt werden.`,
      404
    );
  }

  const annotation = base;
  annotation.view = view;
  annotation.text = annotation.text || `${randomSuperbWord()}e Anmerkung`;
  const savedAnnotation = await viewAnnotationRepo.save(annotation);
  return {
    id: savedAnnotation.id,
    author: savedAnnotation.author,
    text: savedAnnotation.text,
    isoDate: savedAnnotation.isoDate,
    viewportSize: savedAnnotation.viewportSize,
    x: savedAnnotation.x,
    y: savedAnnotation.y
  };
};

export const findById = async id => {
  const viewAnnotationRepo = getRepository(ViewAnnotation);

  const annotation = await viewAnnotationRepo.findOne(id);
  if (!annotation) {
    throw exceptionWithHttpStatus(
      `Anmerkung mit ID ${id} nicht gefunden.`,
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
      `Anmerkung mit ${id} kann nicht aktualisiert werden.`,
      404
    );
  }

  annotation.text = base.text;
  annotation.viewportSize = base.viewportSize;
  annotation.x = base.x;
  annotation.y = base.y;

  return viewAnnotationRepo.save(annotation);
};
