import React from 'react';

const formatNumber = (num) => {
  if (num === null || num === undefined) return '—';
  num = Number(num);
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toLocaleString();
};

export default function FormatCount({ value }) {
  return <span>{formatNumber(value)}</span>;
}
