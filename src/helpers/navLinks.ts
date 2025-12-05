const getString = (value: string | string[] | undefined, fallback: string) =>
  (value as string) || fallback;

type MenuMessages = {
  home?: string;
  discover_food?: string;
  about?: string;
  help?: string;
};

export const NAV_LINKS = (messages: MenuMessages) => [
  {
    key: "home",
    href: "/",
    text: getString(messages.home, "Home"),
  },
  {
    key: "discover",
    href: "/discover-places",
    text: getString(messages.discover_food, "Discover"),
  },
  {
    key: "about",
    href: "/about",
    text: getString(messages.about, "About"),
  },
  {
    key: "help",
    href: "/help",
    text: getString(messages.help, "Help"),
  },
];
