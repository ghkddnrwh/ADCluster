import mongoose from 'mongoose';
import Joi from '@hapi/joi';

import Video from '../../models/video';

const { ObjectId } = mongoose.Types;

export const getVideoById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const video = await Video.findById(id);
    if (!video) {
      ctx.status = 404;
      return;
    }
    ctx.state.video = video;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnVideo = (ctx, next) => {
  const { user, video } = ctx.state;
  if (video.user_id.toString() !== user._id.toString()) {
    ctx.status = 403;
    return;
  }
  return next();
};

export const add = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    thumbnail_url: Joi.string().required(),
    video_url: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {
    title,
    description,
    tags,
    thumbnail_url,
    video_url,
  } = ctx.request.body;

  const { _id } = ctx.state.user;
  try {
    const video = new Video({
      title,
      description,
      tags,
      thumbnail_url,
      video_url,
      user_id: _id,
    });
    await video.save();
    ctx.body = video;
  } catch (e) {
    throw (500, e);
  }
};

export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const videoCountInPage = 10;
    const videos = await Video.find()
      .limit(videoCountInPage)
      .skip((page - 1) * videoCountInPage)
      .exec();

    const videoCount = await Video.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(videoCount / videoCountInPage));
    ctx.body = videos;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const read = async (ctx) => {
  ctx.body = ctx.state.video;
};

export const update = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const video = await Video.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!video) {
      ctx.status = 404;
      return;
    }

    ctx.body = video;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Video.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
