const events = require('./event-emitters');

module.exports = () => {

  function writeArray(array) {
    array.forEach((item, index) => console.log(item));
  }

  function writeLog(pathname) {
    try {
      console.log(pathname);
      events.fire('logged', pathname);
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  return {
    writeArray,
    writeLog
  }
}