const ONE_SECOND = 1000;

const ONE_MINUTE = 1000 * 60;

const ONE_HOUR = 1000 * 3600;

const ONE_DAY = 1000 * 3600 * 24;

const ONE_MONTH = 1000 * 3600 * 24 * 7 * 4;

const ONE_YEAR = 1000 * 3600 * 24 * 7 * 4 * 12;

const differenceDateInTime = (date1, date2) => {
  const differenceInTime = date2.getTime() - date1.getTime();
  return differenceInTime;
};

const differenceDateInSeconds = (date1, date2) => {
  const differenceInDays = differenceDateInTime(date1, date2) / ONE_SECOND;

  return Math.floor(differenceInDays);
};

const differenceDateInMinutes = (date1, date2) => {
  const differenceInDays = differenceDateInTime(date1, date2) / ONE_MINUTE;

  return Math.floor(differenceInDays);
};

const differenceDateInHours = (date1, date2) => {
  const differenceInDays = differenceDateInTime(date1, date2) / ONE_HOUR;

  return Math.floor(differenceInDays);
};

const differenceDateInDays = (date1, date2) => {
  const differenceInDays = differenceDateInTime(date1, date2) / ONE_DAY;

  return Math.floor(differenceInDays);
};

const differenceDateInMonths = (date1, date2) => {
  const differenceInDays = differenceDateInTime(date1, date2) / ONE_MONTH;

  return Math.floor(differenceInDays);
};

const differenceDateInYears = (date1, date2) => {
  const differenceInDays = differenceDateInTime(date1, date2) / ONE_YEAR;
  return Math.floor(differenceInDays);
};

const convertStringToDate = target => {
  const dt = new Date(target);
  return dt;
};

const getTimeBetweenDates = (date1, date2) => {
  let daysString = '';
  let createdAt = '';

  const diferenceInTime = differenceDateInTime(date1, date2);

  if (diferenceInTime < ONE_SECOND) {
    createdAt = 1;
    daysString = 'second';
  }

  if (diferenceInTime >= ONE_SECOND) {
    createdAt = differenceDateInSeconds(date1, date2);
    daysString = createdAt === 1 ? 'second' : 'seconds';
  }

  if (diferenceInTime >= ONE_MINUTE) {
    createdAt = differenceDateInMinutes(date1, date2);
    daysString = createdAt === 1 ? 'minute' : 'minutes';
  }

  if (diferenceInTime >= ONE_HOUR) {
    createdAt = differenceDateInHours(date1, date2);
    daysString = createdAt === 1 ? 'hour' : 'hours';
  }

  if (diferenceInTime >= ONE_DAY) {
    createdAt = differenceDateInDays(date1, date2);
    daysString = createdAt === 1 ? 'day' : 'days';
  }

  if (diferenceInTime > ONE_MONTH) {
    createdAt = differenceDateInMonths(date1, date2);
    daysString = createdAt === 1 ? 'month' : 'months';
  }

  if (diferenceInTime > ONE_YEAR) {
    createdAt = differenceDateInYears(date1, date2);
    daysString = createdAt === 1 ? 'year' : 'years';
  }

  return `${createdAt} ${daysString}`;
};

const months = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May.',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];

const formattedDate = date =>
  `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

export {
  differenceDateInDays,
  convertStringToDate,
  differenceDateInMinutes,
  differenceDateInHours,
  differenceDateInMonths,
  differenceDateInTime,
  differenceDateInYears,
  differenceDateInSeconds,
  getTimeBetweenDates,
  formattedDate,
  ONE_DAY,
  ONE_MONTH,
  ONE_YEAR,
  ONE_MINUTE,
  ONE_SECOND,
  ONE_HOUR,
};
