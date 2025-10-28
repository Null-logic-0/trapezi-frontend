"use client";
import React, { createContext, use, useReducer, ReactNode } from "react";

// --- Types ---
interface UIState {
  toggleSideBar: boolean;
  openModal: boolean;
}

type UIAction = { type: "TOGGLE_SIDEBAR" } | { type: "TOGGLE_MODAL" };

interface UIContextType extends UIState {
  handleToggleModal: () => void;
  handleToggleSideBar: () => void;
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

  const contextValue: UIContextType = {
    toggleSideBar: state.toggleSideBar,
    openModal: state.openModal,
    handleToggleModal: () => dispatch({ type: "TOGGLE_MODAL" }),
    handleToggleSideBar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
  };

  return <UIContext value={contextValue}>{children}</UIContext>;
}
