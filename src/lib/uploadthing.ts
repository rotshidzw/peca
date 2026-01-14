import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const fileRouter = {
  coverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } }).onUploadComplete(async () => {
    return { uploaded: true };
  })
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;
