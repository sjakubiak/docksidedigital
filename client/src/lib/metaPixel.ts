type MetaPixelFunction = {
  (command: "track", eventName: "PageView"): void;
  (
    command: "track",
    eventName: "Lead",
    data: { content_name: string },
    options: { eventID: string },
  ): void;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
  }
}

export function trackMetaPageView() {
  window.fbq?.("track", "PageView");
}

export function trackMetaLead(eventID: string) {
  window.fbq?.(
    "track",
    "Lead",
    { content_name: "Contact form" },
    { eventID },
  );
}
