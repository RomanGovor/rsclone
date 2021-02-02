import {
  Playground,
  Player,
  Authorization,
  Animations,
  SwitchLang,
  GlobalTimer,
  Statistic,
} from './js/components/index';
import {
  GameParameters, HeaderMenu, Rules, Settings,
} from './js/pages/index';
import {
  Extra,
  Constants,
  Storage,
  setUserAuthorizationData,
  removeUserAuthorizationData,
  Request,
} from './js/core/index';

class App {
  constructor() {
    this.language = Storage.getLanguage();
    this.SWITCHLANG = new SwitchLang(this.language);
    this.HEADER_MENU = new HeaderMenu(this.language);
    this.activePage = Constants.MAIN_PAGE;

    this.setEvents();
    this.delegateHeaderMenuEvents();
    this.burgerKeydownEvents();

    this.SETTINGS = new Settings(this.activePage);
    this.ANIMATIONS = new Animations();

    this.playground = null;
    Extra.hidePages(document.querySelector(this.activePage));
    Extra.translate(this.language);
  }

  async initPlayground() {
    const categoriesEn = [];
    const categoriesRu = [];
    const response = await fetch(Constants.URLS[this.gameParam.pack]);
    const data = await response.json();
    await data.rounds.forEach((el) => {
      el.categories.forEach((cat) => {
        categoriesEn.push(cat.categoryInfo.categoryNameEn);
        categoriesRu.push(cat.categoryInfo.categoryNameRu);
      });
    });

    this.playground = new Playground({
      lang: this.language,
      allCategoriesEn: categoriesEn,
      allCategoriesRu: categoriesRu,
      package: data,
    });
  }

  addPlayers() {
    this.player = new Player({
      name: Storage.getUserName(),
      avatar: `url(${this.gameParam.avatar})`,
      status: Constants.USER_STATUSES.PLAYER,
      isActivePlayer: true,
    });
    this.player.changeScore(0);

    this.bots = {};
    for (let i = 0; i < this.gameParam.countBots; i++) {
      const workName = `bot${i + 1}`;
      this.bots[workName] = new Player({
        name: Constants.NICKNAMES_BOTS[Extra
          .getRandomInt(Constants.NICKNAMES_BOTS.length) - 1],
        avatar: `url(./assets/images/avatars/avatar_${Extra.getRandomInt(
          Constants.COUNT_DEFAULT_AVATARS,
        )}.jpg)`,
        botLevel: this.gameParam.level,
        workName,
        score: 0,
      });
    }
  }

  deletingAndResettingGameplay() {
    const playground = document.querySelector('.container__playground');
    const players = document.querySelector('.container__players');
    const questionTimer = document.querySelector('.container__question-timer');
    const globalTimer = document.querySelector('.container__global-timer');

    this.resetTimerOfBots();
    this.clearQuestionTimer();
    if (this.playground) {
      this.playground.deleteTimersAndResettingPlayground();
    }

    if (this.GLOBAL_TIMER) this.GLOBAL_TIMER.clearTimer();

    Extra.clearContainer(playground);
    Extra.clearContainer(players);
    Extra.clearContainer(questionTimer);
    Extra.clearContainer(globalTimer);

    this.playground = null;
    this.player = null;
    this.bots = null;
  }

  setEvents() {
    const switchGameModeBtn = document.querySelector('.switch__checkbox');
    const menuRulesBtn = document.querySelector('.menu-rules');
    const menuSettingsBtn = document.querySelector('.menu-settings');
    const menuPlaygroundBtn = document.querySelector('.menu-single-player');
    const parametersContainer = document.querySelector('.container__game-param');

    switchGameModeBtn.addEventListener('change', () => {
      this.language = this.SWITCHLANG.changeLang();
    });

    menuPlaygroundBtn.addEventListener('click', () => {
      const containerParameters = document.querySelector('.container__game-param');
      Extra.hidePages(containerParameters);

      const parameters = new GameParameters(this.language);
      HeaderMenu.deleteActiveItem();
    });

    parametersContainer.addEventListener('click', (e) => {
      const containerGame = document.querySelector('.container__game');
      const button = e.target.closest('button');

      if (!button) return;

      this.gameParam = Storage.getGameParameters();

      this.activePage = Constants.GAME;
      HeaderMenu.deleteActiveItem();
      this.GLOBAL_TIMER = new GlobalTimer(this.language);
      Extra.hidePages(containerGame);

      this.initPlayground();
      this.addPlayers();
      this.checkAnswerButtonsEvents();
      this.delegateTableEvent();
      this.setTableActive();
      this.keydownTable();
      this.closeGameEvent();
      Storage.setPossiblePlayer(Constants.USER_STATUSES.PLAYER);
    });

    menuRulesBtn.addEventListener('click', () => {
      const rules = new Rules(this.language, this.activePage)

      const li = HeaderMenu.getListItemByClass('menu__item-rules');
      HeaderMenu.setActiveItem(li);
    });

    menuSettingsBtn.addEventListener('click', () => {
      const container = document.querySelector('.container__settings');
      Extra.hidePages(container);

      const li = HeaderMenu.getListItemByClass('menu__item-settings');
      HeaderMenu.setActiveItem(li);
    });
  }

  closeGameEvent() {
    const playground = document.querySelector(Constants.PLAYGROUND);
    playground.addEventListener('click', (e) => {
      const button = e.target.closest('button');

      if (!button || !button.classList.contains('playground__winner-button')) return;

      this.deletingAndResettingGameplay();

      const containerParameters = document.querySelector('.container__game-param');
      Extra.hidePages(containerParameters);
      const parameters = new GameParameters(this.language);
    });
  }

  setTableActive() {
    setTimeout(() => {
      this.isTableActive = true;
    }, 4000);
  }

  delegateHeaderMenuEvents() {
    const headerMenu = document.querySelector(Constants.HEADER_MENU);
    const burgerCheckbox = document.querySelector('.burger-menu__checkbox-input');

    headerMenu.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      if (li.classList.contains('menu__item-main-menu')) {
        if (burgerCheckbox.checked) burgerCheckbox.checked = false;
        this.activePage = Constants.MAIN_PAGE;

        const container = document.querySelector(Constants.MAIN_PAGE);
        Extra.hidePages(container);
        this.deletingAndResettingGameplay();
      }

      if (li.classList.contains('menu__item-settings')) {
        this.SETTINGS.setActivePage(this.activePage);
        const container = document.querySelector('.container__settings');
        Extra.hidePages(container);
      }

      if (li.classList.contains('menu__item-rules')) {
        const rules = new Rules(this.language, this.activePage);
      }

      HeaderMenu.setActiveItem(li);
      if (burgerCheckbox.checked) burgerCheckbox.checked = false;
    });
  }

  burgerKeydownEvents() {
    document.addEventListener('keydown', (event) => {
      const burgerCheckbox = document.querySelector('.burger-menu__checkbox-input');
      const key = event.keyCode;

      if (key === 27) {
        burgerCheckbox.checked = !burgerCheckbox.checked;
      }
    });
  }

  keydownTable() {
    document.addEventListener('keydown', (event) => {
      const isActivePlayer = this.player.getActivePlayer();

      const key = event.keyCode;
      if (key === 37 || key === 38 || key === 39 || key === 40 || key === 13) {
        if (isActivePlayer && this.isTableActive) {
          const objActiveCell = this.playground.getCellActive();
          const currentActiveCell = objActiveCell.active;
          const { isFirstActive } = objActiveCell;
          const curRow = +currentActiveCell.getAttribute('question-row');
          const curColumn = +currentActiveCell.getAttribute('question-column');

          let newCell;

          if (!isFirstActive) {
            switch (key) {
              case 37:
                newCell = this.playground.findCellByCoordinates(curRow, curColumn - 1);
                if (newCell) this.playground.makeCellActive(newCell);
                break;

              case 38:
                newCell = this.playground.findCellByCoordinates(curRow - 1, curColumn);
                if (newCell) this.playground.makeCellActive(newCell);
                break;

              case 39:
                newCell = this.playground.findCellByCoordinates(curRow, curColumn + 1);
                if (newCell) this.playground.makeCellActive(newCell);
                break;

              case 40:
                newCell = this.playground.findCellByCoordinates(curRow + 1, curColumn);
                if (newCell) this.playground.makeCellActive(newCell);
                break;

              default:
                if (!currentActiveCell.classList.contains('non-clickable')) {
                  this.clickCell(currentActiveCell);
                }
                break;
            }
          }
        }
      }
    });
  }

  delegateTableEvent() {
    const playground = document.querySelector(Constants.PLAYGROUND);

    playground.addEventListener('click', (e) => {
      const isActivePlayer = this.player.getActivePlayer();

      if (e.target.classList.contains(Constants.CELL) && isActivePlayer) {
        this.clickCell(e.target);
      }
    });
  }

  setQuestionTimer() {
    this.handlerQuestionTimer = setTimeout(() => {
      const possiblePlayer = Storage.getPossiblePlayer();
      Extra.playAudio(Constants.AUDIO.END_TIME);
      this.isTableActive = true;

      this.checkOnFinal();

      if (possiblePlayer === Constants.USER_STATUSES.PLAYER) {
        this.player.makePlayerActive();
      } else {
        this.bots[possiblePlayer].makePlayerActive();
        this.chooseRandomQuestion(this.bots[possiblePlayer]);
      }
    }, (Constants.TIME_SHOW_ANSWER
            + Constants.QUESTION_TIME
            + Constants.QUESTION_START_ANIMATION_TIME
            + 1) * 1000);
  }

  chooseRandomQuestion(bot) {
    const questionsArray = Storage.getQuestionsArray();

    if (questionsArray && questionsArray.length !== 0) {
      const question = questionsArray[Extra.getRandomInt(questionsArray.length) - 1];
      const row = question.row - 1;
      const column = question.column - 1;

      Extra.delay((Constants.TIME_CHOOSE_QUESTION * 1000) / 4).then(() => {
        bot.hideSpeech();
        if (this.language === 'en') bot.say(Constants.BOT_CHOOSE_QUESTION.EN);
        else bot.say(Constants.BOT_CHOOSE_QUESTION.RU);

        Extra.delay(((Constants.TIME_CHOOSE_QUESTION * 1000) / 4) * 3).then(() => {
          bot.hideSpeech();
          const cell = this.playground.findCellByCoordinates(row, column);
          this.clickCell(cell);
        });
      });
    } else {
      this.player.makePlayerActive();
    }
  }

  clickCell(cell) {
    this.playground.clearCellActive();
    this.isTableActive = false;
    this.playground.clickOnTable(cell);
    this.setQuestionTimer();
    this.setUpBotsResponseQueue();

    setTimeout(() => {
      if (this.player) this.player.makePlayerActive();
    }, Constants.QUESTION_START_ANIMATION_TIME * 1000);
  }

  clearQuestionTimer() {
    clearTimeout(this.handlerQuestionTimer);
  }

  setUpBotsResponseQueue() {
    this.queueBots = Extra.createQueueBots(this.gameParam.countBots);
    for (let i = 0; i < this.queueBots.length; i++) {
      this.queueBots[i].initialTimer = setTimeout(() => {
        this.bots[this.queueBots[i].bot].makePlayerActive();

        setTimeout(() => {
          const answer = this.generatingPossibleResponse();
          this.botResponseAttempt(answer, this.bots[this.queueBots[i].bot]);
        }, 900);
      }, (this.queueBots[i].time
          + Constants.QUESTION_START_ANIMATION_TIME
          + Constants.QUESTION_TIME / 2) * 1000);
    }
  }

  checkAnswerButtonsEvents() {
    const playground = document.querySelector(Constants.PLAYGROUND);

    playground.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      this.player.setPermissionToAnswer(Extra.checkOnPermission());
      const isActivePlayer = this.player.getActivePlayer();

      if (!button || !this.player.getPermissionToAnswer() || !isActivePlayer) return;

      if (button.classList.contains('playground__answer-button')) {
        const value = Extra.checkOnNoEmptyInputs();
        if (value !== '') this.checkTrueAnswer(value, this.player);
      }

      if (button.classList.contains(Constants.ANSWER_CHECKBOX)) {
        this.checkTrueAnswer(button, this.player);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        const value = Extra.checkOnNoEmptyInputs();
        const isActivePlayer = this.player.getActivePlayer();

        if (value !== '' && isActivePlayer && this.player.getPermissionToAnswer()) {
          this.checkTrueAnswer(value, this.player);
        }
      }
    });
  }

  botResponseAttempt(answer, player) {
    const question = Storage.getCurrentQuestion();
    if (question.type === 'checkbox') this.checkBySpanValue(answer, player);
    else this.checkTrueAnswerInput(answer, player);
  }

  checkTrueAnswer(element = undefined, player) {
    const currentQuestion = Storage.getCurrentQuestion();
    if (currentQuestion.type === 'checkbox') this.checkTrueAnswerCheckbox(element, player);
    else this.checkTrueAnswerInput(element, player);
  }

  checkTrueAnswerCheckbox(checkbox, player) {
    const spanEn = checkbox.querySelector("span[language='en']");
    this.checkBySpanValue(spanEn.value, player);
  }

  checkBySpanValue(value, player) {
    const currentQuestion = Storage.getCurrentQuestion();

    if (value === currentQuestion.trueAnswerEn
        || value === currentQuestion.trueAnswerRu) {
      this.playground.hideQuestion(true, player.getStatus());
      this.updatePlayerScore(currentQuestion.points, true, value, player);
      Extra.playAudio(Constants.AUDIO.CORRECT);
    } else {
      this.playground.hideQuestion(false, player.getStatus());
      this.updatePlayerScore((-1) * currentQuestion.points, false, value, player);
      Extra.playAudio(Constants.AUDIO.FAILURE);
    }
  }

  checkTrueAnswerInput(input, player) {
    const value = input.toString().trim().toLowerCase();

    const currentQuestion = Storage.getCurrentQuestion();
    const answersArray = [
      ...currentQuestion.trueOptionsAnswerEn,
      ...currentQuestion.trueOptionsAnswerRu,
    ].map((str) => str.trim().toLowerCase());
    let isCorrect = false;

    for (let i = 0; i < answersArray.length; i++) {
      if (value === answersArray[i]) {
        isCorrect = true;
        this.playground.hideQuestion(isCorrect, player.getStatus());
        this.updatePlayerScore(currentQuestion.points, isCorrect, input, player);
        Extra.playAudio(Constants.AUDIO.CORRECT);
        break;
      }
    }
    if (!isCorrect) {
      this.playground.hideQuestion(isCorrect, player.getStatus());
      this.updatePlayerScore((-1) * currentQuestion.points, isCorrect, input, player);
      Extra.playAudio(Constants.AUDIO.FAILURE);
    }
  }

  generatingPossibleResponse() {
    const question = Storage.getCurrentQuestion();
    const { level } = this.gameParam;
    const randomArray = Extra.generateArrayOfAnswers(question, level, this.language);
    return randomArray[Extra.getRandomInt(randomArray.length) - 1];
  }

  updatePlayerScore(num, isRight, answer, player) {
    player.changeScore(num);
    player.sayPossibleAnswer(this.language, isRight, answer);
    if (!isRight) {
      this.player.makePlayerActive();
      if (player.getStatus() === Constants.USER_STATUSES.PLAYER) {
        this.player.setPermissionToAnswer(false);
      }
    } else {
      this.clearQuestionTimer();
      Storage.setPossiblePlayer(player.getWorkName());
      this.resetTimerOfBots();
      player.makePlayerActive();

      setTimeout(() => {
        this.isTableActive = true;
      }, Constants.TIME_SHOW_ANSWER * 1000);

      if (player.status === Constants.USER_STATUSES.BOT) {
        this.waitForAnswerToBeShownAndSelectQuestion(player);
      }

      this.checkOnFinal();
    }
  }

  checkOnFinal() {
    const questionsArray = Storage.getQuestionsArray();

    if (questionsArray.length === 0 || !questionsArray) {
      const question = Storage.getCurrentQuestion();

      const countRounds = this.playground.getCountRounds();
      if (question.round === countRounds) {
        Extra.playAudio(Constants.AUDIO.WIN);

        this.isTableActive = null;

        const totalTime = this.GLOBAL_TIMER.getTotalTime();
        const time = this.GLOBAL_TIMER.divisionIntoMinutes();
        this.GLOBAL_TIMER.clearTimer();

        const playerState = this.player.getScore();
        const winner = this.getArrayScores()[0];
        const data = {
          points: playerState.score,
          time: totalTime,
        };

        if (winner.workName === Constants.USER_STATUSES.PLAYER) {
          data.win = true;
        } else data.win = false;

        const newData = this.statisticModule.changeUserData(playerState.score, totalTime, data.win);
        this.statisticModule.setUserData(newData);

        setTimeout(() => {
          this.playground.showWinner(winner, time);
        }, 3500);
      }
    }
  }

  getArrayScores() {
    const arr = [];
    arr.push(this.player.getScore());

    for (let i = 0; i < this.gameParam.countBots; i++) {
      const workName = `bot${i + 1}`;
      const score = this.bots[workName].getScore();
      arr.push(score);
    }

    arr.sort((a, b) => b.score - a.score);
    return arr;
  }

  waitForAnswerToBeShownAndSelectQuestion(player) {
    setTimeout(() => {
      this.chooseRandomQuestion(player);
    }, Constants.TIME_SHOW_ANSWER * 1000);
  }

  resetTimerOfBots() {
    if (this.queueBots) {
      this.queueBots.forEach((bot) => {
        clearTimeout(bot.initialTimer);
      });
    }
  }

  authorization() {
    const authorization = new Authorization();
    const request = new Request();
    const logoutLink = document.querySelector('.header__userAuthotization');

    if (Storage.getAuthorizationStatus() === null) {
      Storage.setAuthorizationStatus('false');
      Storage.setUserToken(null);
    }

    logoutLink.addEventListener('click', () => {
      if (logoutLink.textContent === 'Log out') {
        request.logout();
        this.activePage = Constants.MAIN_PAGE;

        const container = document.querySelector(Constants.MAIN_PAGE);
        Extra.hidePages(container);
        this.deletingAndResettingGameplay();
      } else if (logoutLink.textContent === 'Log in') {
        const container = document.querySelector(Constants.MAIN_PAGE);
        Extra.hidePages(container);
        this.deletingAndResettingGameplay();
        authorization.init();
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      if (Storage.getAuthorizationStatus() === 'false') {
        authorization.init();
      } else {
        setUserAuthorizationData();
      }
    });
  }

  statistic() {
    const statisticLink = document.querySelector('.menu__item-statistic');
    this.statisticModule = new Statistic();

    statisticLink.addEventListener('click', () => {
      const data = this.statisticModule.getUserData();
      const dataArr = Object.keys(Storage.getUserStatisticData());
      this.statisticModule.init(this.activePage);

      const statisticCountList = document.querySelectorAll('.statistic__item-count');
      statisticCountList.forEach((item, index) => {
        if (item.dataset.count === 'aver-play-time' || item.dataset.count === 'max-play-time') {
          item.innerHTML = this.statisticModule.setStatisticTime(+data[dataArr[index]]);
        } else {
          item.innerHTML = data[dataArr[index]];
        }
      });
    });
  }
}

const APP = new App();
APP.authorization();
APP.statistic();
