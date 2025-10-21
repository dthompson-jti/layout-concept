// src/types.ts

export interface BoundData {
  fieldName: string;
  path: string;
  sourceId: string;
}

export interface ComponentNode {
    id: string;
    parentId: string | null;
    name: string;
    type: 'screen' | 'container' | 'component' | 'data-source';
}