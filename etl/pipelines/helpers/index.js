module.exports = {
  parseString(question) {
    return typeof question === 'string' ? question : null;
  },

  parseNum(number) {
    return isNaN(parseInt(number)) ? 0 : parseInt(number);
  },

  parseDate(date) {
    // parse number from string
    // if the number is valid date, create Date object from number
    // else create Date object from string
    // return the date

    const dateAsInteger = parseInt(date);
    const formattedDate = isNaN(dateAsInteger) ? new Date(date) : new Date(dateAsInteger);
    return formattedDate;
  },

  parseBoolean(bool) {
    // if string is "true" return true, otherwise return false
    return bool === "true" ? 1 : 0;
  },

  parseRating(rating) {
    // if the rating is greater than 5, return  5
    // else return rating
    // if the rating is a string
    // attempt to parse string, else return 0
  },
}
