export interface Tab {
  label: string;
  href: string;
}
export interface Messages {
  login: string;
  signup: string;
  story_paragraphs?: string[];
  [key: string]: string | string[] | undefined;
}

export const getTabs = (messages: Messages): Tab[] => [
  { label: messages.login, href: "/login" },
  { label: messages.signup, href: "/signup" },
];
