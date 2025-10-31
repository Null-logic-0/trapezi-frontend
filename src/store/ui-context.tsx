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
  toggleMenu: boolean;
  openModal: boolean;
}

type UIAction =
  | { type: "TOGGLE_MENU" }
  | { type: "TOGGLE_MODAL" }
  | { type: "CLOSE_MODAL" };

interface UIContextType extends UIState {
  handleToggleModal: () => void;
  handleToggleMenu: () => void;
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
    case "TOGGLE_MENU":
      return { ...state, toggleMenu: !state.toggleMenu };
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
  toggleMenu: false,
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

  const handleToggleMenu = useCallback(
    () => dispatch({ type: "TOGGLE_MENU" }),
    []
  );

  const handleCloseModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    []
  );

  const contextValue: UIContextType = {
    toggleMenu: state.toggleMenu,
    openModal: state.openModal,
    handleCloseModal,
    handleToggleModal,
    handleToggleMenu,
  };

  return <UIContext value={contextValue}>{children}</UIContext>;
}
