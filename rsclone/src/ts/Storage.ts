/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { landType } from './Types';

export class Storage {
  static getLanguage() {
    const lang = localStorage.getItem('sigame/lang');
    return !lang ? 'en' : lang;
  }

  static setLanguage(lang: landType) {
    localStorage.setItem('sigame/lang', lang);
  }

  static getPossiblePlayer() {
    const player = sessionStorage.getItem('sigame/possiblePlayer');
    return !player ? 'player' : player;
  }

  static setPossiblePlayer(player: string) {
    sessionStorage.setItem('sigame/possiblePlayer', player);
  }

  static getPlayBackgroundMusicFlag() {
    let isPlay;
    const isItem = localStorage.getItem('sigame/bgMusic');
    if (isItem) isPlay = JSON.parse(isItem);
    return isPlay === undefined ? false : isPlay;
  }

  static setPlayBackgroundMusicFlag(isPlay: boolean) {
    localStorage.setItem('sigame/bgMusic', JSON.stringify(isPlay));
  }

  static getDarkMode() {
    let isDarkMode;
    const isItem = localStorage.getItem('sigame/darkMode');
    if (isItem) {
      isDarkMode = JSON.parse(isItem);
    }
    return isDarkMode === undefined ? false : isDarkMode;
  }

  static setDarkMode(isDarkMode: boolean) {
    localStorage.setItem('sigame/darkMode', JSON.stringify(isDarkMode));
  }

  static getAudioPlay() {
    let isAudioPlay;
    const isItem = localStorage.getItem('sigame/audioPlay');
    if (isItem) isAudioPlay = JSON.parse(isItem);
    return !isAudioPlay && isAudioPlay !== false ? true : isAudioPlay;
  }

  static setAudioPlay(isAudioPlay: boolean) {
    localStorage.setItem('sigame/audioPlay', JSON.stringify(isAudioPlay));
  }

  static getCurrentQuestion() {
    const isItem = sessionStorage.getItem('sigame/currentQuestion');
    let question;
    if (isItem) question = JSON.parse(isItem);
    return !question ? {} : question;
  }

  static setCurrentQuestion(question: any) {
    sessionStorage.setItem('sigame/currentQuestion', JSON.stringify(question));
  }

  static getQuestionsArray() {
    const isItem = sessionStorage.getItem('sigame/questionsArray');
    let questionsArr;
    if (isItem) questionsArr = JSON.parse(isItem);
    return !questionsArr ? [] : questionsArr;
  }

  static setQuestionsArray(questionsArr: []) {
    sessionStorage.setItem('sigame/questionsArray', JSON.stringify(questionsArr));
  }

  static getGameParameters() {
    const isItem = sessionStorage.getItem('sigame/gameParam');
    let param;
    if (isItem) param = JSON.parse(isItem);
    return !param ? {} : param;
  }

  static setGameParameters(param: {}) {
    sessionStorage.setItem('sigame/gameParam', JSON.stringify(param));
  }

  static setAuthorizationStatus(status: string) {
    localStorage.setItem('isAuthorization', status);
  }

  static getAuthorizationStatus() {
    return localStorage.getItem('isAuthorization');
  }

  static setUserName(name: string) {
    localStorage.setItem('name', name);
  }

  static getUserName() {
    return localStorage.getItem('name');
  }

  static setUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  static getUserToken() {
    return localStorage.getItem('token');
  }

  static setUserStatisticData(data: {}) {
    localStorage.setItem('statistic', `${JSON.stringify(data)}`);
  }

  static getUserStatisticData() {
    const isItem = localStorage.getItem('statistic');
    if (isItem) return JSON.parse(isItem);
    return isItem;
  }
}
