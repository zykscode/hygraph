'use client';

import { FaEnvelopeOpenText } from '@react-icons/all-files/fa/FaEnvelopeOpenText';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { FaYoutube } from '@react-icons/all-files/fa/FaYoutube';
import { FaZhihu } from '@react-icons/all-files/fa/FaZhihu';
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp';
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline';
import { useTheme } from 'next-themes';
import { memo, useCallback, useEffect, useState } from 'react';

import { useDarkMode } from '#/lib/use-dark-mode';
import styles from './styles.module.css';

const github = 'zykson';
const youtube = 'zykson';
const twitter = 'zykson';
const newsletter = 'zykson';
const author = 'zykson';
const zhihu = null;
const linkedin = null;

export const FooterImpl = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { setTheme } = useTheme();

  const onToggleDarkMode = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (isDarkMode) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
      toggleDarkMode();
    },
    [isDarkMode, setTheme, toggleDarkMode],
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>copyright 2022 zyk</div>
      <div className={styles.settings}>
        {hasMounted && (
          <a
            className={styles.toggleDarkMode}
            href="#"
            role="button"
            onClick={onToggleDarkMode}
            title="Toggle dark mode"
          >
            {isDarkMode ? <IoSunnyOutline /> : <IoMoonSharp />}
          </a>
        )}
      </div>
      <div className={styles.social}>
        {twitter && (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${twitter}`}
            title={`Twitter @${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        )}

        {zhihu && (
          <a
            className={styles.zhihu}
            href={`https://zhihu.com/people/${zhihu}`}
            title={`Zhihu @${zhihu}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaZhihu />
          </a>
        )}

        {github && (
          <a
            className={styles.github}
            href={`https://github.com/${github}`}
            title={`GitHub @${github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        )}

        {linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${linkedin}`}
            title={`LinkedIn ${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        )}

        {newsletter && (
          <a
            className={styles.newsletter}
            href={`${newsletter}`}
            title={`Newsletter ${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelopeOpenText />
          </a>
        )}

        {youtube && (
          <a
            className={styles.youtube}
            href={`https://www.youtube.com/${youtube}`}
            title={`YouTube ${author}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        )}
      </div>
    </footer>
  );
};

export const Footer = memo(FooterImpl);
