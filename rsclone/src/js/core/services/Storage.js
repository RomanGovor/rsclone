export class Storage {
  static getLanguage() {
    const lang = localStorage.getItem('sigame/lang');
    return !lang ? 'en' : lang;
  }

  static setLanguage(lang) {
    localStorage.setItem('sigame/lang', lang);
  }
}
