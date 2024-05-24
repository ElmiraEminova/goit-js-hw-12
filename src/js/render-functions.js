export const createMarkup = images => {
  return images.reduce(
    (
      html,
      { tags, webformatURL, largeImageURL, likes, views, comments, downloads }
    ) => {
      return (
        html +
        `<li class="photo-container">
    <a href=${largeImageURL} class="card-link js-card-link">
        <img class="photo" src="${webformatURL}" alt="${tags}" >
    </a>
    <div class="info">
        <div class="info-item">
            <h3 class="title">Likes</h3>
            <p class="info">${likes}</p>
        </div>
        <div class="info-item">
            <h3 class="title">Views</h3>
            <p class="info">${views}</p>
        </div>
        <div class="info-item">
            <h3 class="title">Comments</h3>
            <p class="info">${comments}</p>
        </div>
        <div class="info-item">
            <h3 class="title">Downloads</h3>
            <p class="info">${downloads}</p>
        </div>
    </div>
</li>
    `
      );
    },
    ''
  );
};