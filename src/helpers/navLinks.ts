export interface Messages {
  [key: string]: string | undefined;
}

export const NAV_LINKS = (messages: Messages) => [
  {
    key: "home",
    href: "/",
    text: messages.home,
  },
  {
    key: "discover",
    href: "/discover",
    text: messages.discover_food,
  },
  {
    key: "about",
    href: "/about",
    text: messages.about,
  },
  {
    key: "help",
    href: "/help",
    text: messages.help,
  },
];
