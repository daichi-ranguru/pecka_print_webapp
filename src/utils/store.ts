import { writable } from 'svelte/store';



function createAppStore() {
	const { subscribe, set, update } = writable({
  });

  function deleteItem (itemName, prev) {
    const n = {...prev};
    delete n[itemName];
    return n;
  }

	return {
		subscribe,
		increment: (itemName) => update( prev => ({
        ...prev,
        [itemName]: !!prev[itemName] ? prev[itemName]+1 : 1
    })),
		decrement: (itemName) => update( prev => {
      if (prev[itemName] === 1) {
        return deleteItem(itemName, prev);
      }
      return {
        ...prev,
        [itemName]: prev[itemName]-1
      };
    }),
		delete: (itemName) => update( prev => {

      return deleteItem(itemName, prev);
    }),
    reset: () => set({})
	};
}

export const appStore = createAppStore();
