"use client";
import { createStore } from "jotai";
import type { PropsWithChildren } from "react";
import { Provider as JotaiProvider } from "jotai/react";
const store = createStore();

export const Provider = (props: PropsWithChildren) => {
  return <JotaiProvider store={store}>{props.children}</JotaiProvider>;
};
