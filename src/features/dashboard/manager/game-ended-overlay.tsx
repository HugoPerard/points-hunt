import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { envClient } from '@/env/client';

export const GameEndedOverlay = () => {
  const { t } = useTranslation(['dashboard']);
  const endDate = envClient.VITE_EVENT_END_DATE;
  const isEnded = dayjs().isAfter(endDate);

  if (!isEnded) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      data-testid="game-ended-overlay"
    >
      <div className="flex -rotate-8 items-center justify-center rounded-xl bg-muted/80 p-8 shadow-lg shadow-accent/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-bold">
            {t('dashboard:gameEnded.title')} 🎉
          </h2>
          <p className="max-w-md text-muted-foreground">
            {t('dashboard:gameEnded.description')}
          </p>
          <p className="font-bold text-muted-foreground">
            {t('dashboard:gameEnded.thankYou')} ♥️
          </p>
        </div>
      </div>
    </div>
  );
};
