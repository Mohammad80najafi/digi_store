'use client';

import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';

import { useEffect, useState } from 'react';

const DarkMode = () => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    localStorage.setItem('theme', theme!);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme);
    } else {
      setTheme('dark');
    }
  });
  return (
    <div className='relative'>
      {theme === 'dark' ? (
        <FiSun
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
          className='cursor-pointer text-2xl text-white transition-all duration-300 dark:text-white'
        />
      ) : (
        <FiMoon
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
          className='cursor-pointer text-2xl text-black transition-all duration-300 dark:text-white'
        />
      )}
    </div>
  );
};

export default DarkMode;
