const Base_Url = "https://api.rawg.io/api/";

const getCurrentMont = () => {
  const moth = new Date().getMonth() + 1;
  if (moth < 10) {
    return `0${moth}`;
  } else {
    return moth;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

// curent day/month/year
const currentYear = new Date().getFullYear();
const currentMont = getCurrentMont();
const currentDay = getCurrentDay();

const currentDate = `${currentYear}-${currentMont}-${currentDay}`;
const lasYear = `${currentYear - 1}-${currentMont}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMont}-${currentDay}`;

// games

const popular_games = `games?key=${
  import.meta.env.VITE_APP_API
}&dates=${lasYear},${currentDate}&ordering=-rating&page_size=10`;

export const popularGamesUrl = () => `${Base_Url}${popular_games}`;
