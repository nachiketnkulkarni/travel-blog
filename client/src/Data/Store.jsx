import create from "zustand";

const useStore = create((set) => ({
  userToken: null,
  setUserToken: (userToken) => set({ userToken }),
  deleteUserToken: () => set({ userToken: null }),
}));

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: (no) => set({ bears: no }),
//   removeAllBears: () => set({ bears: 0 }),
// }));

export default useStore;
