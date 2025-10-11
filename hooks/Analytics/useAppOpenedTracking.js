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
      trackEvent('app_opened', {
        timestamp: new Date().toISOString(),
      });

      // Forcer l'envoi immédiat
      setTimeout(() => {
        posthog.flush();
      }, 500);
    } else {
      // Retry après un court délai si PostHog n'est pas prêt
      const timer = setTimeout(() => {
        if (posthog) {
          trackEvent('app_opened', {
            timestamp: new Date().toISOString(),
          });

          // Forcer l'envoi immédiat
          setTimeout(() => {
            posthog.flush();
          }, 500);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [posthog, trackEvent]);
};
