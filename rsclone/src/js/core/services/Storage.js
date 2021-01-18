export class Storage {
  static getLanguage() {
    const lang = localStorage.getItem('sigame/lang');
    return !lang ? 'en' : lang;
  }

  static setLanguage(lang) {
    localStorage.setItem('sigame/lang', lang);
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
}
