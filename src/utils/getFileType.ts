export const FileType = {
  Image: "Image",
  Video: "Video",
} as const;

export const getFileType = (
  filename: string,
): keyof typeof FileType | undefined => {
  const isImg = filename.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
  const isVideo = filename.match(/\.(mp4|webm|ogg)$/i);

  if (isImg) return FileType.Image;
  if (isVideo) return FileType.Video;
  return undefined;
};
