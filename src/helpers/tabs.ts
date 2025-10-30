export interface Tab {
  label: string;
  href: string;
}
export interface Messages {
  login: string;
  signup: string;
  [key: string]: string | undefined;
}

export const getTabs = (messages: Messages): Tab[] => [
  { label: messages.login, href: "/login" },
  { label: messages.signup, href: "/signup" },
];
