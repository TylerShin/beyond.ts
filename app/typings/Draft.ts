import { List, OrderedMap, OrderedSet } from "immutable";

export type DraftBlockType = "unstyled" | "paragraph" | "header-one" | "header-two" | "header-three" |
  "header-four" | "header-five" | "header-six" | "unordered-list-item" | "ordered-list-item" |
  "blockquote" | "code-block" | "atomic";

export type InlineStyleRange = {
  style: string;
  offset: number;
  length: number;
};

export type EntityRange = {
  key: string | number;
  offset: number;
  length: number;
};

export type RawDraftContentBlock = {
  key?: string;
  type: DraftBlockType;
  text: string;
  depth?: number;
  inlineStyleRanges?: InlineStyleRange[];
  entityRanges?: EntityRange[];
  data?: Object;
};

export type DraftEntityMutability = "MUTABLE" | "IMMUTABLE" | "SEGMENTED";
export type DraftEntityType = "LINK" | "TOKEN" | "PHOTO" | "IMAGE";

export type RawDraftEntity = {
  type: DraftEntityType;
  mutability: DraftEntityMutability;
  data?: { [key: string]: any };
};

export type RawDraftContentState = {
  blocks: RawDraftContentBlock[];
  entityMap: { [key: string]: RawDraftEntity };
};

export type CharacterMetadata = {
  getStyle: () => OrderedSet<string>;
  getEntity: () => string;
  hasStyle: (style: string) => boolean;
};

export type BlockMap = OrderedMap<string, IContentBlock>;

type SelectionStateRecordProp = "anchorKey" | "anchorOffset" | "focusKey" | "focusOffset" | "isBackward" | "hasFocus";

export type ISelectionState = {
  getAnchorKey: () => string;
  serialize: () => string;
  getAnchorOffset: () => number;
  getFocusKey: () => string;
  getFocusOffset: () => number;
  getIsBackward: () => boolean;
  getHasFocus: () => boolean;
  isCollapsed: () => boolean;
  getStartKey: () => string;
  getStartOffset: () => number;
  getEndKey: () => string;
  getEndOffset: () => number;
  hasEdgeWithin: (blockKey: string, start: number, end: number) => boolean;
  get: (key: SelectionStateRecordProp) => any;
  set: (key: SelectionStateRecordProp, value: any) => ISelectionState;
};

export type IEditorState = {
  getCurrentContent: () => IContentState;
  getSelection: () => ISelectionState;
  getCurrentInlineStyle: () => OrderedSet<string>;
  getInlineStyleOverride: () => OrderedSet<string>;
  getLastChangeType: () => string;
};

export interface IContentBlock {
  getKey: () => string;
  getType: () => DraftBlockType;
  getText: () => string;
  getCharacterList: () => List<CharacterMetadata>;
  getLength: () => number;
  getDepth: () => number;
  getData: () => Map<any, any>;
  getInlineStyleAt: (offset: number) => any;
  getEntityAt: (offset: number) => string;
  findStyleRanges: (
    filterFn: (value: CharacterMetadata) => boolean,
    callback: (start: number, end: number) => void,
  ) => void;
  findEntityRanges: (
    filterFn: (value: CharacterMetadata) => boolean,
    callback: (start: number, end: number) => void,
  ) => void;
  set: (key: any, value: any) => IContentBlock;
  toJS: () => any;
  merge: (param: any) => IContentBlock;
};

export type IContentState = {
  getEntityMap: () => any
  getBlockMap: () => BlockMap;
  getSelectionBefore: () => ISelectionState;
  getSelectionAfter: () => ISelectionState;
  getBlockForKey(key: string): IContentBlock;
  getKeyBefore(key: string): string;
  getKeyAfter(key: string): string;
  getBlockAfter(key: string): IContentBlock;
  getBlockBefore(key: string): IContentBlock;
  getBlocksAsArray: () => IContentBlock[];
  getFirstBlock: () => IContentBlock;
  getLastBlock: () => IContentBlock;
  getPlainText(delimiter?: string): string;
  getLastCreatedEntityKey: () => string;
  hasText: () => boolean;
  createEntity: (type: DraftEntityType, mutability: DraftEntityMutability, data?: Object) => IContentState;
  mergeEntityData: (key: string, toMerge: { [key: string]: any }) => IContentState;
  replaceEntityData: (key: string, newData: { [key: string]: any }) => IContentState;
  addEntity: (instance: IDraftEntityInstance) => IContentState;
  getEntity: (key: string) => IDraftEntityInstance;
  get: (key: string) => any;
  merge: (properties: any) => IContentState;
  update: (key: string, value: any) => IContentState;
  set: (key: string, value: any) => IContentState;
};

export type IDraftEntityInstance = {
  getType(): DraftEntityType;
  getMutability(): DraftEntityMutability;
  getData(): Object;
};
