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

// path to fetch the games

const popular_games = `games?key=${
  import.meta.env.VITE_APP_API
}&dates=${lasYear},${currentDate}&ordering=-rating&page_size=10`;

const upcomingGame = `games?key=${
  import.meta.env.VITE_APP_API
}&dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;

const newGame = `games?key=${
  import.meta.env.VITE_APP_API
}&dates=${lasYear},${currentDate}&ordering=-released&page_size=10`;

export const popularGamesUrl = () => `${Base_Url}${popular_games}`;
export const upcomingGameUrl = () => `${Base_Url}${upcomingGame}`;
export const newGameUrl = () => `${Base_Url}${newGame}`;

// DETAILS
export const gameDetailsUrl = (game_id) => `${Base_Url}games/${game_id}?key=${import.meta.env.VITE_APP_API}`

//Screenshot
export const gameScreenshotUrl = (game_id) => `${Base_Url}games/${game_id}/screenshots?key=${import.meta.env.VITE_APP_API}`

//Search games

export const searchGameUrl = (game_name) => `${Base_Url}games?key=${import.meta.env.VITE_APP_API}&search=${game_name}&ordering=-rating&page_size=9`


