import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';

import { envClient } from '@/env/client';

export const CountdownDisplay = () => {
  const { t } = useTranslation(['dashboard']);
  const [remaining, setRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isEnded: boolean;
  } | null>(null);

  /* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect -- countdown requires per-second state updates */
  useEffect(() => {
    const update = () => {
      const now = dayjs();
      const endDate = envClient.VITE_EVENT_END_DATE;

      if (now.isAfter(endDate)) {
        setRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true,
        });
        return;
      }

      const diffMs = endDate.diff(now);
      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setRemaining({
        days,
        hours,
        minutes,
        seconds,
        isEnded: false,
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  /* eslint-enable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */

  if (remaining === null) return null;
  if (remaining.isEnded) return null;

  const parts: string[] = [];
  if (remaining.days > 0) {
    parts.push(t('dashboard:countdown.days', { count: remaining.days }));
  }
  parts.push(t('dashboard:countdown.hours', { count: remaining.hours }));
  parts.push(t('dashboard:countdown.minutes', { count: remaining.minutes }));
  parts.push(t('dashboard:countdown.seconds', { count: remaining.seconds }));

  return (
    <Badge variant="accent" className="font-mono font-bold">
      {parts.join(' ')}
    </Badge>
  );
};
