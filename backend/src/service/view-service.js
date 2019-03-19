import { randomSuperbWord } from '../utils/superb-words';
import { getConnection, getRepository } from 'typeorm';
import { Whiteboard } from '../orm/entity/whiteboard';
import { View } from '../orm/entity/view';
import { ViewLink } from '../orm/entity/view-link';
import { exceptionWithHttpStatus } from '../utils/request';

export const getByWhiteboardId = async whiteboardId => {
  const viewRepo = getRepository(View);
  const byWhiteboardId = await viewRepo.find({ whiteboard: whiteboardId });
  if (!byWhiteboardId) {
    throw exceptionWithHttpStatus(
      `Es sind keine View zu Whiteboard ${whiteboardId} zugeordnet.`,
      404
    );
  }

  return byWhiteboardId;
};

export const save = async (whiteboardId, base) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const viewRepo = getRepository(View);

  const whiteboard = await whiteboardRepo.findOne(whiteboardId);
  if (!whiteboard) {
    throw exceptionWithHttpStatus(
      `View kann zu nicht existierendem Whiteboard nicht hinzugefügt werden.`,
      404
    );
  }

  const view = base;
  view.whiteboard = whiteboard;
  view.hasFile = false;
  view.fileType = null;
  view.name = view.name || `${randomSuperbWord()}e View`;
  return viewRepo.save(view);
};

export const findById = async id => {
  const viewRepo = getRepository(View);

  const view = await viewRepo.findOne(id);
  if (!view) {
    throw exceptionWithHttpStatus(`View mit ${id} nicht gefunden.`, 404);
  }

  return view;
};

export const remove = async id => {
  const viewRepo = getRepository(View);
  return viewRepo.delete(id);
};

export const replace = async (id, base) => {
  const viewRepo = getRepository(View);
  const view = await viewRepo.findOne(id);

  if (!view) {
    throw exceptionWithHttpStatus(
      `View mit ID ${id} kann nicht ersetzt werden`,
      404
    );
  }

  view.hasFile = true;
  view.fileType = base.fileType;
  view.head = base.head;
  view.body = base.body;
  view.htmlElementAttributes = base.htmlElementAttributes;
  view.htmlThumbnailPath = base.htmlThumbnailPath;
  view.assets = base.assets;
  view.imageName = base.imageName;
  view.imageWidth = base.imageWidth;
  view.imageHeight = base.imageHeight;
  view.viewLinks = base.viewLinks;
  view.annotations = base.annotations;

  getConnection()
    .createQueryBuilder()
    .delete()
    .from(ViewLink)
    .where('fromView = :viewId', { viewId: id })
    .execute();

  return viewRepo.save(view);
};
