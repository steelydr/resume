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
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const GitHubContributions = ({ username, token }) => {
  // Always call hooks in the same order:
  const [mounted, setMounted] = useState(false);
  const [contributionCount, setContributionCount] = useState(null);
  const [dateRange, setDateRange] = useState('');
  const [error, setError] = useState(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const mainControls = useAnimation();

  // Function to fetch contributions.
  const fetchContributions = async () => {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                firstDay
              }
            }
          }
        }
      }
    `;
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables: { username } }),
      });
      if (!response.ok) throw new Error('Failed to fetch contributions');
      const data = await response.json();
      const contributionData =
        data.data.user.contributionsCollection.contributionCalendar;
      setContributionCount(contributionData.totalContributions);
      const weeks = contributionData.weeks;
      const startDate = new Date(weeks[0]?.firstDay || Date.now());
      const endDate = new Date(weeks[weeks.length - 1]?.firstDay || Date.now());
      endDate.setDate(endDate.getDate() + 6);
      const formatDate = (date) =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
          date.getDate()
        ).padStart(2, '0')}`;
      setDateRange(`${formatDate(startDate)} to ${formatDate(endDate)}`);
    } catch (err) {
      console.error('Error fetching GitHub contributions:', err);
      setError('Failed to load contribution data');
    }
  };

  // Set mounted flag on client (runs on every render, but state update happens only once).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always call this hook, but only fetch when mounted.
  useEffect(() => {
    if (token && mounted) {
      fetchContributions();
      const hourlyIntervalId = setInterval(() => {
        fetchContributions();
      }, 3600000); // 1 hour
      return () => {
        clearInterval(hourlyIntervalId);
      };
    } else if (!token) {
      setError('GitHub token is required');
    }
  }, [username, token, mounted]);

  // Animation control when component comes into view.
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
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
      {mounted ? (
        <>
          <motion.h2
            variants={itemVariants}
            style={{ color: colors.accent, marginBottom: '20px' }}
          >
            Version Control Contributions
          </motion.h2>
          {error ? (
            <motion.p variants={itemVariants} style={{ color: colors.accent }}>
              {error}
            </motion.p>
          ) : contributionCount !== null ? (
            <motion.p
              variants={itemVariants}
              style={{
                color: colors.white,
                fontSize: '1.2em',
                marginBottom: '30px',
              }}
            >
              <strong style={{ color: colors.accent }}>
                {contributionCount}
              </strong>{' '}
              contributions from{' '}
              <strong style={{ color: colors.accent }}>{dateRange}</strong>
            </motion.p>
          ) : (
            <motion.p variants={itemVariants} style={{ color: colors.white }}>
              Loading contributions...
            </motion.p>
          )}
          <motion.img
            variants={itemVariants}
            src={`https://ghchart.rshah.org/${colors.primary.replace(
              '#',
              ''
            )}/${username}`}
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
            GitHub contributions for{' '}
            <strong style={{ color: colors.accent }}>{username}</strong>
          </motion.p>
        </>
      ) : (
        // Optionally, render a placeholder while not mounted
        <div style={{ minHeight: '200px' }} />
      )}
    </motion.div>
  );
};

export default GitHubContributions;
