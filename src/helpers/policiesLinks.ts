export interface Messages {
  [key: string]: string | undefined;
}

export const POLICIES_LINKS = (messages: Messages) => [
  {
    key: "terms",
    href: "/terms",
    text: messages.terms,
  },
  {
    key: "privacy",
    href: "/privacy",
    text: messages.privacy,
  },
  {
    key: "cookies",
    href: "/cookies",
    text: messages.cookies,
  },
];
