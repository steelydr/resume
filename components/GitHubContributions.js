import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const colors = {
  primary: '#8A2BE2', // Violet
  secondary: '#4B0082', // Indigo
  accent: '#DA70D6', // Orchid
  text: '#E9E9E9', // Light Grey
  background: '#1F1F1F', // Dark Background
  white: '#FFFFFF',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const GitHubContributions = ({ username }) => {
  const [contributionCount, setContributionCount] = useState(null);
  const [dateRange, setDateRange] = useState('');
  const [error, setError] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const mainControls = useAnimation();

  // Function to fetch contributions
  const fetchContributions = async () => {
    try {
      const corsProxy = 'https://corsproxy.io/?';
      const githubUrl = `https://github.com/users/${username}/contributions`;
      const response = await fetch(corsProxy + encodeURIComponent(githubUrl), {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch contributions');
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const contributionElement = doc.querySelector('.f4.text-normal.mb-2'); // Using only the class names

      if (contributionElement) {
        const countText = contributionElement.textContent.trim().split(' ')[0];
        setContributionCount(countText);

        const currentDate = new Date();
        const oneYearAgo = new Date(currentDate);
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
        oneYearAgo.setDate(oneYearAgo.getDate() + 1);

        const formatDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        setDateRange(`${formatDate(oneYearAgo)} to ${formatDate(currentDate)}`);
      } else {
        throw new Error('Could not find contribution count');
      }
    } catch (err) {
      console.error('Error fetching GitHub contributions:', err);
      setError('Failed to load contribution data');
    }
  };

  useEffect(() => {
    fetchContributions();

    // Poll for new data every 24 hours
    const dailyIntervalId = setInterval(() => {
      fetchContributions();
    }, 86400000); // 24 hours

    // Check contribution count every 9 seconds
    const checkIntervalId = setInterval(() => {
      fetchContributions(); // Re-fetch data to update contribution count
    }, 9000); // 9 seconds

    return () => {
      clearInterval(dailyIntervalId);
      clearInterval(checkIntervalId);
    };
  }, [username]);

  // Animation control
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={mainControls}
      style={{
        backgroundColor: colors.background,
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: '0 auto',
        color: colors.text,
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.h2
        variants={itemVariants}
        style={{ color: colors.accent, marginBottom: '20px' }}
      >
        Version Control Contributions
      </motion.h2>
      {error ? (
        <motion.p variants={itemVariants} style={{ color: colors.accent }}>{error}</motion.p>
      ) : contributionCount !== null ? (
        <motion.p
          variants={itemVariants}
          style={{ color: colors.white, fontSize: '1.2em', marginBottom: '30px' }}
        >
          <strong style={{ color: colors.accent }}>{contributionCount}</strong> contributions from{' '}
          <strong style={{ color: colors.accent }}>{dateRange}</strong>
        </motion.p>
      ) : (
        <motion.p variants={itemVariants} style={{ color: colors.white }}>Loading contributions...</motion.p>
      )}
      <motion.img
        variants={itemVariants}
        src={`https://ghchart.rshah.org/${colors.primary.replace('#', '')}/${username}`}
        alt={`${username}'s GitHub Contribution Chart`}
        style={{
          width: '100%',
          maxWidth: '760px',
          height: 'auto',
        }}
      />
      <motion.p
        variants={itemVariants}
        style={{ marginTop: '20px', color: colors.text }}
      >
        GitHub contributions for <strong style={{ color: colors.accent }}>{username}</strong>
      </motion.p>
    </motion.div>
  );
};

export default GitHubContributions;
