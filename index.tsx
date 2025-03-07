import {
  useAtom as useJotaiAtom,
  Provider as JotaiProvider,
  useStore,
} from "jotai/react";
import { atom, createStore as createJotaiStore } from "jotai";
import type { PrimitiveAtom, SetStateAction } from "jotai";
import type { PropsWithChildren } from "react";

type WithInitialValue<Value> = {
  init: Value;
};
type SetAtom<Args extends unknown[], Result> = <A extends Args>(
  ...args: A
) => Result;

export type StoreAtom<T> = PrimitiveAtom<T> & WithInitialValue<T>;
export type UseAtom<T, M> = [Awaited<T>, M, SetAtom<[SetStateAction<T>], void>];

export const createStore = <TInitial = {}, TMethods = {}>(
  initial: TInitial,
  methods: (
    set: (newValue: Partial<TInitial>) => void,
    states: TInitial
  ) => TMethods
) => {
  const storeAtom = atom(initial);

  function useAtom(): UseAtom<TInitial, TMethods> {
    const states = useJotaiAtom(storeAtom);
    const store = useStore();
    const set = (newValue: Partial<TInitial>) =>
      store.set(storeAtom, newValue as TInitial);
    const methodsObj = methods(set, states[0]);

    return [states[0], methodsObj, states[1]];
  }

  return useAtom;
};

export const Provider = (props: PropsWithChildren) => {
  const store = createJotaiStore();

  return <JotaiProvider store={store}>{props.children}</JotaiProvider>;
};
