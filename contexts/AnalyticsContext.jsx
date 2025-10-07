import React, { createContext, useContext } from 'react';
import { usePostHog } from 'posthog-react-native';

const AnalyticsContext = createContext(null);

export const AnalyticsProvider = ({ children }) => {
  const posthog = usePostHog();

  const trackEvent = (eventName, properties = {}) => {
    if (posthog) {
      console.log(`PostHog: Capturing event "${eventName}" with properties:`, properties);
      posthog.capture(eventName, properties);
      console.log(`PostHog: Event "${eventName}" captured successfully`);
    } else {
      console.warn(`PostHog: Cannot track event "${eventName}" - client not initialized`);
    }
  };

  const identifyUser = (userId, userProperties = {}) => {
    if (posthog) {
      posthog.identify(userId, userProperties);
    }
  };

  const resetUser = () => {
    if (posthog) {
      posthog.reset();
    }
  };

  const value = {
    trackEvent,
    identifyUser,
    resetUser,
    posthog,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
