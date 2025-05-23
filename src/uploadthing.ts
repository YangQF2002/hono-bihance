// FileRouter 
// Enable our server to upload files to uploadthing server

import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();
export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug (eg: imageUploader)
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadError(({ error, fileKey }) => {
    console.log("upload error", { message: error.message, fileKey });
    throw error;
  }).onUploadComplete((data) => {
    console.log("upload completed", data);
  }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;