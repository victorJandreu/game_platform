//media resize

export const smallImage = (imagePath, size) => {
  const image = imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        "media/screenshots",
        `media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("/media/games", `/media/resize/${size}/-/games/`)
    return image
};


//windowWidth to change the grid
export const initi = (windowSize) =>{
  const width = windowSize;
  let size;
  if (width <= 926) {
    size = 1;
  } else if (width <= 1390) {
    size = 2;
  } else if (width <= 1853) {
    size = 3;
  } else if (width <= 2316) {
    size = 4;
  } else {
    size = 5;
  }

  let array = [];
  for (let i = 0; i < size; i++) {
    array.push({ indicador: i });
  }
  return array;
}