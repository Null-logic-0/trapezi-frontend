"use client";
import React, {
  createContext,
  use,
  useReducer,
  ReactNode,
  useCallback,
} from "react";

// --- Types ---
interface UIState {
  toggleSideBar: boolean;
  openModal: boolean;
}

type UIAction =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "TOGGLE_MODAL" }
  | { type: "CLOSE_MODAL" };

interface UIContextType extends UIState {
  handleToggleModal: () => void;
  handleToggleSideBar: () => void;
  handleCloseModal: () => void;
}

// --- Context ---
const UIContext = createContext<UIContextType | undefined>(undefined);

// --- Hook ---
export function useUIContext(): UIContextType {
  const context = use(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UiContextProvider");
  }
  return context;
}

// --- Reducer ---
function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, toggleSideBar: !state.toggleSideBar };
    case "TOGGLE_MODAL":
      return { ...state, openModal: !state.openModal };
    case "CLOSE_MODAL":
      return { ...state, openModal: false };
    default:
      return state;
  }
}

// --- Initial State ---
const initialState: UIState = {
  toggleSideBar: false,
  openModal: false,
};

// --- Provider ---
interface UiContextProviderProps {
  children: ReactNode;
}

export function UiContextProvider({ children }: UiContextProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const handleToggleModal = useCallback(
    () => dispatch({ type: "TOGGLE_MODAL" }),
    []
  );

  const handleToggleSideBar = useCallback(
    () => dispatch({ type: "TOGGLE_SIDEBAR" }),
    []
  );

  const handleCloseModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    []
  );

  const contextValue: UIContextType = {
    toggleSideBar: state.toggleSideBar,
    openModal: state.openModal,
    handleCloseModal,
    handleToggleModal,
    handleToggleSideBar,
  };

  return <UIContext value={contextValue}>{children}</UIContext>;
}
