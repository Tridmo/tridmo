declare global {
  interface Window {
    gtag: any;
  }
}

export const GA_TRACKING_ID = "AW-17014212621";

export const event = ({ action, params }: { action: string; params: any }) => {
  if (window){
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", action, params);
    }
  }
};
