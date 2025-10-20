/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_SUBPATH_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
