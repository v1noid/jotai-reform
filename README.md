## Jotai Reform

This library aims to provide a new way of using Jotai.

Jotai in itself is an awesome state manager with the convenience of using atoms and making a store instantly. Although using Jotai is kind of different than other state management libraries.

Here are a few common issues with Jotai I face in my projects:

Bad code management. Because of the simple approach of using atom and useAtom hook, Jotai made it easy to mutate a state but soon in larger projects, devs start to lose track of their code. Look at this simple code example:
```javascript
  const [result, setResult] = useAtom(resultAtom)

setResult((prev) => ({ ...prev, open: false }))

```
Do you have any idea what this code is about? Me neither! But I wrote that. Now this issue can be solved by wrapping the state change in a meaningfully named function:
```javascript
 const closeModal = () => {
    setResult((prev) => ({ ...prev, open: false }))
  }
```

Great, now I know it's being used to close the modal. But wait, what about reusability like reducers or like we do in Zustand?

```javascript
const useStore = create((set) => ({
  count: 1,
  closeModal: () => set((state) => ({ ...state, open: false })),
}))
```

Now Jotai doesn't give us this out of the box. Well, that's why you need to start using `jotai-reform` from now on. `jotai-reform` provides you multiple benefits of using Jotai with ease.

Let's see some of the functions of `jotai-reform`:

## createStore
`createStore` is a wrapper around atom:
```javascript
    const [useStore, storeAtom] = createStore(initialState, (set, states, get) => ({...methods}));
```
`createStore` has 2 arguments: 1st is your initialState, 2nd is your methods.

#### What are methods?
Methods are like reducers to perform any actions in your store.

### Return type of `createStore`
`createStore` returns an array with 2 elements:

```javascript
const [useStore, storeAtom] = createStore(initialState, (set, states, get) => ({
  increment() {
    set({ count: states.count + 1 });
  },
}))
```

Let's see it in action:

```javascript
const [useStore, storeAtom] = createStore({ count: 0 }, (set, states, get) => ({
  increment() {
    set({ count: states.count + 1 });
  },
}));

// use storeAtom with useAtom
const [state, setStates] = useAtom(storeAtom);

```

### `useStore`
```javascript
// calling useStore hook will give an array 
const [states, methods, setStates, resetStore] = useStore()

// get the states from states
console.log(states.count);

// use methods to call any methods
methods.increment()

// use setState to manually update the states
setStates(p => ({count: p + 1}))

// resetStore will reset the store to its initial state
resetStore()
```

### Using methods in `jotai-reform`
```javascript
// in createStore you have to pass your methods to the callback function

createStore({count: 0}, (set, states, get) => ({}))

// this callback should return an object with methods

createStore({count: 0}, (set, states, get) => ({
    increment: () => set({count: 1}) // use set to update the state
}))

// by default set reassigns the store value with the new given value
// so the new value will be {count: 1}; if you had another value in that object, it will be removed

//Example
createStore({count1: 0, count2: 0}, (set, states, get) => ({
    increment: () => set({count1: 1}) // new store value {count1: 1} (count2 is removed)
}))

// to fix this issue you can pass the states to the set function

//Example
createStore({count1: 0, count2: 0}, (set, states, get) => ({
    increment: () => set({...states, count1: 1}) // new store value {count1: 1, count2: 0}
}))

// the states parameter gives you all the current states of that store

// use of `get`
// Now sometimes you need a value from another store/atom; for that, you can use the get function

//Example 
createStore({count1: 0, count2: 0}, (set, states, get) => ({
    increment: () => set({...states, count1: get(anotherStoreAtom).anyValueFromThatStore}) 
}))
```

### `useResetAtoms`
Now out of the box, `jotai` doesn't support resetting selective atoms (not talking about resettable atoms) or resetting the entire store.

Imagine this: you have 5 atoms you have to reset after a user logs out. You can use `atomWithReset`, but yeah, good luck calling `const reset = useResetAtom(myAtom)` 5 times and the reset function 5 times as well.

Well, well, well, we have a new approach to reset multiple atoms:
```javascript
const reset = useResetAtoms();

// call the reset function
reset();
// that's it; it will now reset the entire store

// but what if I just want to reset some particular atoms/stores? It's easy:
reset({resetAtoms: [atom1, atom2]})

// that's it; atom1 and atom2 will now be reset

// but what if I want to reset the entire store excluding some particular atoms?

// easy:
reset({ignoreAtoms: [atom1, atom2]})

// the entire store will now be reset except atom1 and atom2
```