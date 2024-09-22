import { create } from "zustand";

interface UIState {
    isSideBarCollapsed: boolean;
    isMinScreen: boolean;
    toggleSideBar: () => void;
    openSideBar: () => void;
    closeSideBar: () => void;
    setSideBar: (isSideBarCollapsed: boolean) => void;
    setMinScreen: (isMinScreen: boolean) => void;
}

const useUIStore = create<UIState>((set) => ({
    isSideBarCollapsed: false,
    isMinScreen: false,
    setMinScreen: (isMinScreen: boolean) => set({ isMinScreen }),
    toggleSideBar: () =>
        set((state) => ({ isSideBarCollapsed: !state.isSideBarCollapsed })),
    openSideBar: () => set({ isSideBarCollapsed: false }),
    closeSideBar: () => set({ isSideBarCollapsed: true }),
    setSideBar: (isSideBarCollapsed: boolean) => set({ isSideBarCollapsed }),
}));

export default useUIStore;
