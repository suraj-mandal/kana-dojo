'use client';
import { useState } from 'react';
import clsx from 'clsx';
import SimpleProgress from './SimpleProgress';
import StreakProgress from './StreakProgress';
import AchievementProgress from '@/features/Achievements/components/AchievementProgress';
import { TrendingUp, Flame, Trophy } from 'lucide-react';
import { useClick } from '@/shared/hooks/useAudio';
import SidebarLayout from '@/shared/components/layout/SidebarLayout';

type ViewType = 'statistics' | 'streak' | 'achievements';

const viewOptions: { value: ViewType; label: string; icon: React.ReactNode }[] =
  [
    {
      value: 'statistics',
      label: 'Stats',
      icon: <TrendingUp className='w-5 h-5' />
    },
    { value: 'streak', label: 'Streak', icon: <Flame className='w-5 h-5' /> },
    {
      value: 'achievements',
      label: 'Achievements',
      icon: <Trophy className='w-5 h-5' />
    }
  ];

const ProgressWithSidebar = () => {
  const { playClick } = useClick();
  const [currentView, setCurrentView] = useState<ViewType>('statistics');

  return (
    <SidebarLayout>
      {/* View Toggle Switch */}
      <div className='flex justify-center px-2'>
        <div className='inline-flex flex-wrap justify-center rounded-2xl bg-[var(--card-color)] border border-[var(--border-color)] p-2 gap-2 '>
          {viewOptions.map(option => (
            <button
              key={option.value}
              onClick={() => {
                setCurrentView(option.value);
                playClick();
              }}
              className={clsx(
                'relative  px-8 sm:px-5 py-3 rounded-2xl text-sm font-medium transition-all hover:cursor-pointer flex items-center gap-1.5 sm:gap-2',
                currentView === option.value
                  ? 'bg-[var(--main-color)] text-[var(--background-color)] border-b-6 border-[var(--main-color-accent)]'
                  : 'text-[var(--secondary-color)] hover:text-[var(--main-color)] border-b-4 border-[var(--card-color)] hover:border-[var(--border-color)]/50 hover:bg-[var(--border-color)]/50'
              )}
            >
              {option.icon}
              <span className='max-sm:hidden'>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      {currentView === 'statistics' && <SimpleProgress />}
      {currentView === 'streak' && <StreakProgress />}
      {currentView === 'achievements' && <AchievementProgress />}
    </SidebarLayout>
  );
};

export default ProgressWithSidebar;
