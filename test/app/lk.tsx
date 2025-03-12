import { atom, useAtom } from "jotai";

export const create = (i: any) => {
  const at = atom(i);
  const useGet = () => useAtom(at);
  return [useGet, at];
};
