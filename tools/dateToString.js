function dateToString(date) {
  
  return (date.getFullYear() +
    "/" + (date.getMonth() + 1) +
    "/" + date.getDate() +
    " " + date.getHours() +
    ":" + date.getMinutes() +
    ":" + date.getSeconds())
}

module.exports = dateToString