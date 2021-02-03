/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { landType, time, winner } from './Types';

type userStatuses = 'player' | 'bot';

type question = {
  type: string;
  subtype: string;
  points: string;
  questionRu: string;
  questionEn: string;
  questionPicture?: string;
  answerPicture?: string;
  answerOptionsEn?: string[];
  answerOptionsRu?: string[];
  trueAnswerEn?: string;
  trueAnswerRu?: string;
  trueOptionsAnswerEn?: string[];
  trueOptionsAnswerRu?: string[];
  descriptionRu?: string;
  descriptionEn?: string;
  row?: number;
  column?: number;
  isPermissionToAnswer?: boolean;
  round?: number;
}

type categories = {
  categoryInfo: { categoryNameEn: string, categoryNameRu: string };
  questions: question[];
}

type Package = {
  rounds: [
    {
      roundInfo: {
        subtopicRU: string;
        subtopicEn: string;
      };
      categories: categories[];
    }
  ];
};

type playgroundOptions = {
  container: HTMLDivElement;
  lang?: landType;
  allCategoriesEn?: string[];
  allCategoriesRu?: string[];
  package: Package;
  categories?: categories[];
  currentQuestion?: Object | null;
  countRounds?: number;
  currentRound?: number;
  table?: HTMLDivElement | null;
  scoreboard?: HTMLDivElement;
  playground?: HTMLDivElement | null;
  question?: HTMLDivElement;
  answerInput?: HTMLDivElement;
  answerCheckbox?: HTMLDivElement;
  winner?: HTMLDivElement;
  TIMER?: any;
};

interface IPlayground {
  container: HTMLDivElement;
  lang: landType | string;
  allCategoriesEn: string[];
  allCategoriesRu: string[];
  package: Package;
  categories: categories[];
  currentQuestion: question | null;
  countRounds: number;
  currentRound: number;
  table?: HTMLDivElement | null;
  scoreboard: HTMLDivElement;
  playground: HTMLDivElement | null;
  question: HTMLDivElement;
  answerInput: HTMLDivElement;
  answerCheckbox: HTMLDivElement;
  winner?: HTMLDivElement;
  TIMER?: any;

  getCountRounds(): number;
  getQuestionsArrayByRound(): void;
  render(): void;
  createSound(): void;
  createTable(): void;
  getCellActive(): { active: Element | null, isFirstActive: boolean };
  makeCellActive(cell: Element): void;
  clearCellActive(): void;
  findCellByCoordinates(row: number, column: number): Element | null;
  clickOnTable(cell: HTMLElement): void;
  clearCurrentQuestion(): void;
  isLastQuestion(): boolean;
  updateStatePlayground(): void;
  showCategories(arr: string[], delay?: number): void;
  clearInput(): void;
  createScoreboard(): void;
  deleteTimersAndResettingPlayground(): void;
  hideQuestion(isCorrect: boolean, user: userStatuses): void;
  showQuestion(question: question): void;
  createTrueAnswerField(): void;
  showTrueAnswer(answer: question | null): void;
  changeAnswerOptionsValue(OptionsEn: string[], OptionsRu: string[]): void;
  createRound(): void;
  showRound(): void;
  createWinner(): void;
  showWinner(winner: winner, time: time): void;
  hideWinner(): void;
  showScoreboard(): void;
  hideScoreboard(): void;
  hideCategories(): void;
  hideTable(): void;
  showTable(): void;
  clear(): void;
}

export {
  IPlayground, Package, playgroundOptions, question, categories, userStatuses,
};
