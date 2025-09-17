import { useState, useEffect, useCallback } from 'react';
import apiSubscription, { UserSubscription } from '@/services/apiSubscription';

export function useSubscription(userIdentifier: string) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!userIdentifier || userIdentifier === 'guest') {
      setSubscription({ hasAccess: false, activePackages: [] });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiSubscription.checkUserAccess(userIdentifier);
      setSubscription(data);
    } catch (err) {
      setError('Failed to load subscription status');
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  }, [userIdentifier]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    loading,
    error,
    refresh: fetchSubscription
  };
}
