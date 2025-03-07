import { useAtom as useJotaiAtom, useStore } from "jotai/react";
import { atom } from "jotai";
import type { PrimitiveAtom, SetStateAction } from "jotai";
import type { Atom } from "jotai";

type WithInitialValue<Value> = {
  init: Value;
};
type SetAtom<Args extends unknown[], Result> = <A extends Args>(
  ...args: A
) => Result;

export type StoreAtom<T> = PrimitiveAtom<T> & WithInitialValue<T>;
export type UseAtom<T, M> = [
  Awaited<T>,
  M,
  SetAtom<[SetStateAction<T>], void>,
  () => void
];

export const statesSet = new Set<StoreAtom<any>>();

export const createStore = <TInitial = {}, TMethods = {}>(
  initial: TInitial,
  methods: (
    set: (newValue: Partial<TInitial>) => void,
    states: TInitial,
    get: <T>(atom: Atom<T>) => T
  ) => TMethods
): [() => UseAtom<TInitial, TMethods>, StoreAtom<TInitial>] => {
  const storeAtom = atom(initial);
  statesSet.add(storeAtom);
  storeAtom.debugLabel = "store-" + statesSet.size;
  function useAtom(): UseAtom<TInitial, TMethods> {
    const [states, setStates] = useJotaiAtom(storeAtom);
    const store = useStore();

    const set = (newValue: Partial<TInitial>) =>
      setStates(newValue as TInitial);
    const get = <T>(atom: Atom<T>) => store.get<T>(atom);

    const methodsObj = methods(set, states, get);

    const reset = () => setStates(storeAtom.init);

    return [states, methodsObj, setStates, reset];
  }

  return [useAtom, storeAtom];
};
