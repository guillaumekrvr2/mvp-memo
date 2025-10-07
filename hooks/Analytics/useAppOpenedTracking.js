import { useEffect } from 'react';
import { useAnalytics } from '../../contexts/AnalyticsContext';

/**
 * Hook pour tracker l'événement app_opened
 * À utiliser dans le composant racine (App.js)
 */
export const useAppOpenedTracking = () => {
  const { trackEvent, posthog } = useAnalytics();

  useEffect(() => {
    // Attendre que PostHog soit initialisé avant de tracker
    if (posthog) {
      console.log('PostHog: Tracking app_opened event');
      trackEvent('app_opened', {
        timestamp: new Date().toISOString(),
      });

      // Forcer l'envoi immédiat
      setTimeout(() => {
        console.log('PostHog: Flushing events to server');
        posthog.flush();
      }, 500);
    } else {
      console.warn('PostHog: Not initialized yet, retrying app_opened...');
      // Retry après un court délai si PostHog n'est pas prêt
      const timer = setTimeout(() => {
        if (posthog) {
          console.log('PostHog: Tracking app_opened event (retry)');
          trackEvent('app_opened', {
            timestamp: new Date().toISOString(),
          });

          // Forcer l'envoi immédiat
          setTimeout(() => {
            console.log('PostHog: Flushing events to server');
            posthog.flush();
          }, 500);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [posthog, trackEvent]);
};
