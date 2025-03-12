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

export const createAtom = <TInitial, TMethods>(
  initial: TInitial,
  methods?: (
    set: (newValue: Partial<TInitial>) => void,
    states: TInitial,
    get: <T>(atom: Atom<T>) => T
  ) => TMethods
): [() => UseAtom<TInitial, TMethods>, StoreAtom<TInitial>] => {
  const storeAtom = atom(initial);
  statesSet.add(storeAtom);
  (storeAtom as any).reformName = "store-" + statesSet.size;
  function useAtom(): UseAtom<TInitial, TMethods> {
    const [states, setStates] = useJotaiAtom(storeAtom);
    const store = useStore();

    const methodsObj = methods?.(
      (newValue: Partial<TInitial>) => setStates(newValue as TInitial),
      states,
      <T>(atom: Atom<T>) => store.get<T>(atom)
    );

    return [
      states,
      methodsObj || ({} as any),
      setStates,
      () => setStates(storeAtom.init),
    ];
  }

  return [useAtom, storeAtom];
};
