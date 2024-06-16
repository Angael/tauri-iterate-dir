export enum FileType {
  Image,
  Video,
}

export const getFileType = (filename: string): FileType | undefined => {
  const isImg = filename.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
  const isVideo = filename.match(/\.(mp4|webm|ogg)$/i);

  if (isImg) return FileType.Image;
  if (isVideo) return FileType.Video;
  return undefined;
};
