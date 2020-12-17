export const imageSize = {
  S: "50x50c",
  M: "300x300",
  L: "600x450",
};

export const getImageUrl = (id, size) => {
  // console.log(`https://images.craigslist.org/${id}_${size}.jpg`);
  return `https://images.craigslist.org/${id}_${size}.jpg`;
};
