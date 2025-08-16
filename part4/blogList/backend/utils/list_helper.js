let _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogslist) => {
  let sum = blogslist.reduce((acc, current) => {
    return acc + current.likes;
  }, 0);

  return sum;
};

const favoriteBlog = (blogslist) => {
  return blogslist.reduce(
    (largest, current) => (current.likes > largest.likes ? current : largest),
    blogslist[0]
  );
};

const mostBlogs = (blogslist) => {
  let author_count = _.countBy(blogslist, "author");

  const [author, blogs] = Object.entries(author_count).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  const result = { author, blogs };
  return result;
};

const mostCummulativeBlogLikes = (blogslist) => {
  const authorLikes = _.groupBy(blogslist, "author");

  const likesByAuthor = _.map(authorLikes, (blogs, author) => ({
    author: author,
    likes: _.sumBy(blogs, "likes"),
  }));

  const topAuthor = _.maxBy(likesByAuthor, "likes");

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostCummulativeBlogLikes
};
