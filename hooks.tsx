import { useStore } from "jotai/react";
import { statesSet, type StoreAtom } from "./create";

type UseResetAtomsProps =
  | {
      ignoreAtoms: StoreAtom<any>[];
      resetAtoms?: never;
    }
  | {
      ignoreAtoms?: never;
      resetAtoms: StoreAtom<any>[];
    };

export function useResetAtoms() {
  const store = useStore();
  return (config?: UseResetAtomsProps) => {
    const { ignoreAtoms, resetAtoms } = config || {};
    const ignoreAtomsName = ignoreAtoms?.map((atom) => atom.debugLabel);
    if (resetAtoms?.length)
      for (const atom of resetAtoms) store.set(atom, atom.init);
    else
      for (const atom of statesSet)
        if (!ignoreAtomsName?.includes(atom.debugLabel))
          store.set(atom, atom.init);
  };
}
