/// <reference types="vite/client" />

type LangType = "ja" | "hi" | "es" | "fr" | "en";
interface Language {
  name: string;
  code: string;
}

type WordType = {
  word: string;
  meaning: string;
  options?: string[];
};
interface StateType {
  loading: boolean;
  result: string[];
  words: WordType[];
  error?: string;
}

type FetchDataType = {
  translations: {
    text: string;
  }[];
};
