export const Constants = {
  BELL: './assets/audio/bell.mp3',
  RULES: {
    en: [
      'Several players (up to 4) take part in the game. Everyone has their own personal account. At the start of the game, each player has 0.',
      'It all starts with the fact that one of the players chooses a question from the game board. The scoreboard has 5 topics, 5 questions each - 25 questions in total. In the first round, questions in each topic are worth 100, 200, 300, 400 and 500 points, respectively.',
      'The selected question sounds, and, after that, the players are given some time to think and press a button on their gaming table. The one who pressed the button earlier has the right to answer. For the correct answer to a question, the player receives as many points as the cost of this question, and the right to choose the next question. In case of an incorrect answer, this amount is withdrawn from his account, and other players receive again right to click the button. The mistaken player no longer has the right to answer again.',
      'If no one says the correct answer, then the answer appears on the screen. The question is chosen by the same player as the previous one.',
    ],
    ru: [
      'В игре принимают участие несколько игроков(до 4). У каждого имеется свой персональный счёт. В начале игры у каждого игрока 0.',
      'Начинается всё с того, что один из игроков выбирает вопрос из игрового табло. На табло 5 тем по 5 вопросов в каждой - всего 25 вопросов. В первом раунде вопросы в каждой теме стоят соответственно 100, 200, 300, 400 и 500 очков.',
      'Звучит выбранный вопрос, и, после этого, игрокам отпускаются некоторое время на размышление и на нажатие кнопки на своём игровом столе. Тот, кто нажал на кнопку раньше, имеет право на ответ. За правильный ответ на вопрос игрок получает столько очков, сколько стоил этот вопрос, а также право на выбор следующего вопроса. В случае неправильного ответа эту сумму снимают с его счёта, а другие игроки снова получают право на нажатие кнопки. Ошибившийся игрок уже не имеет права ответить вторично.',
      'Если никто не произносит правильный ответ, то ответ появляется на экране. Вопрос выбирает тот же игрок, что выбирал предыдущий.',
    ],
  },
  BACKGROUND_AUDIO: './assets/audio/background.mp3',
  URLS: {
    categories: '../assets/quiz.json',
  },
  MAIN_PAGE: '.main-menu',
  ANSWER_INPUT: '.playground__answer-input',
  ANSWER_CHECKBOX: 'playground__answer-button-checkbox',
  PLAYGROUND: '.container__playground',
  CELL: 'cell',
  NON_CLICKABLE: 'non-clickable',
  AUDIO: {
    FAILURE: '../assets/audio/failure.mp3',
    CORRECT: '../assets/audio/success.mp3',
  },
  COUNT_DEFAULT_AVATARS: 27,
  USER_STATUSES: {
    PLAYER: 'player',
    BOT: 'bot',
  },
  QUESTION_TIME: 30,
  QUESTION_START_ANIMATION_TIME: 3,
  LEVELS_BOTS: {
    LOW: 'low',
    MIDDLE: 'middle',
    HARD: 'hard',
  },
  MAX_COUNT_OF_BOTS: 3,
  NICKNAMES_BOTS: ['Alexander', 'Loloshka', 'Да да я', 'Johnny Silverhand',
    'Утка в тапках', 'Девчонка в наушниках', 'Stepa Kurochkin', 'Petrushka',
    'Ibn Asalalaalalal', 'Cmetanka', 'Летучий олень', 'Сын маминой подруги',
    'Суслик переросток', 'Дед с Веслом', 'Олег', '4eByRaShKa'],
  USER_RESPONSE_OPTIONS: {
    RU: {
      GOOD: [
        {
          first: 'Видишь что, я прав ;) ',
          second: ' - правильный ответ',
        },
        {
          first: 'А вот вот так вот ',
          second: ' - ответ',
        },
        {
          first: 'Ну не унывайте, кто ж знал, что ',
          second: ' то что надо)',
        },
      ],
      BAD: [
        {
          first: 'Пробовал ',
          second: ', но чтот не проканало ((',
        },
        {
          first: 'Попробуйте ещё раз ',
          second: ' ввести, мне кажется я в букве ошибся)',
        },
        {
          first: 'Та это вопрос составлен не правильно, ',
          second: ' то что нужно ввел',
        },
      ],
    },
    EN: {
      GOOD: [
        {
          first: 'Sorry, but ',
          second: ' is too obvious an answer',
        },
        {
          first: 'Sleep on the keyboard and wrote with my left ear ',
          second: ' cool :)',
        },
        {
          first: 'And Wikipedia really knows about ',
          second: ' ,oops... said too much',
        },
      ],
      BAD: [
        {
          first: 'Some of you gave me the wrong advice, ',
          second: ' not at all',
        },
        {
          first: 'Oooh, the cat walked across the keyboard and entered ',
          second: ' ',
        },
        {
          first: 'Burgers promo code, enter ',
          second: ' and get 2 for the price of 3',
        },
      ],
    },
  },
};

const PathSignUp = 'https://reclone-be-2.herokuapp.com/users';
const PathSignIn = 'https://reclone-be-2.herokuapp.com/users/login';
const PathGetAndPutRequest = 'https://reclone-be-2.herokuapp.com/users/me';
const PathLogout = 'https://reclone-be-2.herokuapp.com/users/me/logout';
const PathLogoutAll = 'https://reclone-be-2.herokuapp.com/users/me/logoutall';
const EmptyUserData = {
  numberOfGames: '0',
  maximumNumberOfWins: '0',
  points: '0',
  averagePoints: '0',
  averagePlayTime: '0',
  maximumPlayTime: '0',
};

export {
  PathSignIn,
  PathSignUp,
  PathGetAndPutRequest,
  PathLogout,
  PathLogoutAll,
  EmptyUserData,
};