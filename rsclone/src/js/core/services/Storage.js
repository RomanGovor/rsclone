export class Storage {
  static getLanguage() {
    const lang = localStorage.getItem('sigame/lang');
    return !lang ? 'en' : lang;
  }

  static setLanguage(lang) {
    localStorage.setItem('sigame/lang', lang);
  }

  static getPossiblePlayer() {
    const player = sessionStorage.getItem('sigame/possiblePlayer');
    return !player ? 'player' : player;
  }

  static setPossiblePlayer(player) {
    sessionStorage.setItem('sigame/possiblePlayer', player);
  }

  static getPlayBackgroundMusicFlag() {
    const isPlay = JSON.parse(localStorage.getItem('sigame/bgMusic'));
    return isPlay === undefined ? false : isPlay;
  }

  static setPlayBackgroundMusicFlag(isPlay) {
    localStorage.setItem('sigame/bgMusic', JSON.stringify(isPlay));
  }

  static getCurrentQuestion() {
    const question = JSON.parse(sessionStorage.getItem('sigame/currentQuestion'));
    return !question ? {} : question;
  }

  static setCurrentQuestion(question) {
    sessionStorage.setItem('sigame/currentQuestion', JSON.stringify(question));
  }

  static getQuestionsArray() {
    const questionsArr = JSON.parse(sessionStorage.getItem('sigame/questionsArray'));
    return !questionsArr ? [] : questionsArr;
  }

  static setQuestionsArray(questionsArr) {
    sessionStorage.setItem('sigame/questionsArray', JSON.stringify(questionsArr));
  }

  static getGameParameters() {
    const param = JSON.parse(sessionStorage.getItem('sigame/gameParam'));
    return !param ? {} : param;
  }

  static setGameParameters(param) {
    sessionStorage.setItem('sigame/gameParam', JSON.stringify(param));
  }
}
