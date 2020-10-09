// Converts unix timestamp into a time ago string like 7 hours ago.

export const timeAgo = (unixTimestamp: any) => {
  const date = new Date(parseInt(unixTimestamp));
  const diff = new Date().getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' years';
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months';
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' mins';
  }

  return Math.floor(seconds) + ' seconds';
};

// Converts unix timestamp to current date.
export const currentDate = (unixTimestamp: any) => {
  const date = new Date(parseInt(unixTimestamp));
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = months[date.getMonth() + 1];
  const day = date.getDay();
  const year = date.getFullYear();
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${month} ${day}, ${year} ${time}`;
};
