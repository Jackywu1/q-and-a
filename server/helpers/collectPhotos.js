module.exports = collectPhotos = (results, data) => {
  data.forEach((photo) => {
    const { answer_id, photo_url } = photo;

    results.forEach((question) => {
      if (question.answers[answer_id]) {
        question.answers[answer_id].photos.push(photo_url);
      }
    });
  });
};
