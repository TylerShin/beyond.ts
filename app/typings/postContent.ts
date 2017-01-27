export interface IContentItem {
  type: string;
}

export interface IInlineStyleRange {
  length: number;
  offset: number;
  style: "BOLD" | "ITALIC";
}

// link element
export interface ILinkSegment {
  type: "link";
  text: string;
  href: string;
}

// blockquote, h2 element
export type ExtraTextType = "blockquote" | "header-two";
export interface IExtraTextContentItem {
  type: ExtraTextType;
  text: string;
}

// og-object element
export type AtomicBlockItem<T> = {
  type: "atomic",
  text: "",
  data: T;
};

export type LinkPreviewData = {
  type: "link-preview";
  url: string;
  title?: string;
  description?: string;
  image?: string;
};

export type ImageContentData = {
  type: "image";
  imageId: string;
  src: string;
  height: number;
  width: number;
  previewColor?: string;
  originalSrc: string;
};

export type ImagePreviewData = {
  type: "image-preview";
  src: string;
  failed: boolean;
};

export type VideoContentData = {
  id: string;
  type: "video";
  height: number;
  poster: string;
  sources: string[];
  width: number;
  originalType: "image/gif" | "video/mp4";
  previewColor?: string;
};

export type EmbeddedVideoData = {
  type: "embedded-video";
  embedUrl: string;
  height: number;
  poster: string;
  provider: string;
  src: string;
  width: number;
};
