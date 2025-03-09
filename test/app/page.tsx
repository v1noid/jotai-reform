"use client";
import { createAtom } from "@/dist";
import { useAtom } from "jotai/react";
import { useHydrateAtoms } from "jotai/utils";
import { useEffect } from "react";

const [useAtom_, aom] = createAtom({ count: 0 }, (set) => ({
  inc: (e: number) => set({ count: e }),
}));

export default function Home() {
  useHydrateAtoms([[aom, { count: 10 }]]);

  const [count_, e, setA] = useAtom_();
  const [count, setAtom] = useAtom(aom);
  console.log(count, count_);
  useEffect(() => {
    setAtom({ count: 100 });
    setA({ count: 1000 });
    return () => {};
  }, [setAtom]);

  return (
    <>
      <Comp />
    </>
  );
}

function Comp() {
  const [count_] = useAtom_();
  const [count] = useAtom(aom);
  console.log("comp", count, count_);
  return <></>;
}
