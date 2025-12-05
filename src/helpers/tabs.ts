export interface Tab {
  label: string;
  href: string;
}
export interface Messages {
  login: string;
  signup: string;
}

const getString = (value: string | string[] | undefined, fallback: string) =>
  (value as string) || fallback;

export const getTabs = (messages: Messages): Tab[] => [
  { label: getString(messages.login, "Login"), href: "/login" },
  { label: getString(messages.signup, "Signup"), href: "/signup" },
];
