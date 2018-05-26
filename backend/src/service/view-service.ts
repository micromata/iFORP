import { getRepository } from 'typeorm';
import { Whiteboard } from '../orm/entity/Whiteboard';
import { View } from '../orm/entity/View';
import { exceptionWithHttpStatus } from '../lib/utils';

export const getByWhiteboardId = async whiteboardId => {
  const viewRepo = getRepository(View);
  const byWhiteboardId = await viewRepo.find({ whiteboard: whiteboardId });
  if (!byWhiteboardId) {
    throw exceptionWithHttpStatus(
      `Found no views associated with whiteboard ID ${whiteboardId}.`,
      404
    );
  }
  return byWhiteboardId.map(view => ({
    id: view.id,
    name: view.name
  }));
};

export const save = async (whiteboardId, base) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const viewRepo = getRepository(View);

  const whiteboard = await whiteboardRepo.findOne(whiteboardId);
  if (!whiteboard) {
    throw exceptionWithHttpStatus(
      `Cannot add view to non existent whiteboard.`,
      404
    );
  }
  const view = base as View;
  view.whiteboard = whiteboard;
  return viewRepo.save(view);
};

export const findById = async id => {
  const viewRepo = getRepository(View);

  const view = await viewRepo.findOne(id);
  if (!view) {
    throw exceptionWithHttpStatus(`View with ID ${id} not found.`, 404);
  }
  return view;
};

export const remove = async id => {
  const viewRepo = getRepository(View);
  return viewRepo.delete(id);
};

export const replace = async (id, base) => {
  const viewRepo = getRepository(View);
  const view = (await viewRepo.findOne(id)) as View | any;

  if (!view) {
    throw exceptionWithHttpStatus(`Cannot replace view with ID ${id}`, 404);
  }

  view.head = base.head;
  view.body = base.body;
  view.htmlElementAttributes = base.htmlElementAttributes;

  return viewRepo.save(view);
};
