"use client";

import { createAtom } from "@/dist";
import { useAtom } from "jotai/react";
import { useHydrateAtoms } from "jotai/utils";
import { useEffect } from "react";

const [useAtom_, aom] = createAtom({ count: 0 }, (set) => ({
  inc: () => set({ count: 100 }),
}));

export default function Home() {
  useHydrateAtoms([[aom, { count: 10 }]]);

  const [count_, methods, setA] = useAtom_();
  const [count, setAtom] = useAtom(aom);
  // using import in dist/index.js gives {count:1000} {count:1000} which is correct but if i use require() it gives {count:100} {count:1000} which is wrong why is that
  console.log(count, count_);
  methods.inc();
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
