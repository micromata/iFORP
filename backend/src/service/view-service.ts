import { getRepository } from 'typeorm';
import { Whiteboard } from '../orm/entity/Whiteboard';
import { View } from '../orm/entity/View';

export const getByWhiteboardId = async whiteboardId => {
  const whiteboardRepo = getRepository(Whiteboard);
  return whiteboardRepo.findOne(whiteboardId);
};

export const save = async (whiteboardId, base) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const viewRepo = getRepository(View);

  const whiteboard = await whiteboardRepo.findOne(whiteboardId);
  const view = base as View;
  view.whiteboard = whiteboard;
  return viewRepo.save(view);
};

export const findById = async id => {
  const viewRepo = getRepository(View);
  return viewRepo.findOne(id);
};

export const remove = async id => {
  const viewRepo = getRepository(View);
  return viewRepo.delete(id);
};

export const replace = async (id, base) => {
  const viewRepo = getRepository(View);
  const view = {
    id,
    ...base
  } as View;
  return viewRepo.save(view);
};
