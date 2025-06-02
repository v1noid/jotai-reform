"use client";

import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useRef } from "react";

const at = atom({ count1: 0, count2: 0 });

export default function Home() {
  const [st, setSt] = useAtom(at);

  const ref = useRef(0);

  ref.current++;

  console.log(ref.current, "app");
  return (
    <>
      <Cmp1 />
      <Cmp2 />
    </>
  );
}

function Cmp1() {
  const [state, setSt] = useAtom(at);

  const ref = useRef(0);

  ref.current++;

  console.log(ref.current, "cm 1");

  return (
    <div className="card">
      <button onClick={() => setSt((p) => ({ ...p, count1: p.count1 + 1 }))}>
        count is {state.count1}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}
function Cmp2() {
  const [state, setSt] = useAtom(at);

  const ref = useRef(0);
  ref.current++;

  console.log(ref.current, "cm 2");

  return (
    <div className="card">
      <button onClick={() => setSt((p) => ({ ...p, count2: p.count2 + 1 }))}>
        count is {state.count2}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  );
}
