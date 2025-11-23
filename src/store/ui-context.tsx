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
  openModalId: string | number | null;
  writeReview: boolean;
}

type UIAction =
  | { type: "TOGGLE_MENU" }
  | { type: "OPEN_MODAL"; payload: string | number }
  | { type: "CLOSE_MODAL" }
  | { type: "TOGGLE_REVIEW_FORM" };

interface UIContextType extends UIState {
  handleOpenModal: (id: string | number) => void;
  handleCloseModal: () => void;
  handleToggleMenu: () => void;
  handleToggleReviewForm: () => void;
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
    case "OPEN_MODAL":
      return { ...state, openModalId: action.payload };
    case "CLOSE_MODAL":
      return { ...state, openModalId: null };
    case "TOGGLE_REVIEW_FORM":
      return { ...state, writeReview: !state.writeReview };
    default:
      return state;
  }
}

// --- Initial State ---
const initialState: UIState = {
  toggleMenu: false,
  openModalId: null,
  writeReview: false,
};

// --- Provider ---
interface UiContextProviderProps {
  children: ReactNode;
}

export function UiContextProvider({ children }: UiContextProviderProps) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const handleOpenModal = useCallback(
    (id: string | number) => dispatch({ type: "OPEN_MODAL", payload: id }),
    []
  );

  const handleCloseModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    []
  );

  const handleToggleMenu = useCallback(
    () => dispatch({ type: "TOGGLE_MENU" }),
    []
  );

  const handleToggleReviewForm = useCallback(
    () => dispatch({ type: "TOGGLE_REVIEW_FORM" }),
    []
  );

  const contextValue: UIContextType = {
    toggleMenu: state.toggleMenu,
    openModalId: state.openModalId,
    writeReview: state.writeReview,
    handleOpenModal,
    handleCloseModal,
    handleToggleMenu,
    handleToggleReviewForm,
  };

  return <UIContext value={contextValue}>{children}</UIContext>;
}
