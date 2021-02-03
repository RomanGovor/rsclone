type landType = 'en' | 'ru';

type currentQuestion = {
  row: number;
  column: number;
  isPermissionToAnswer: boolean;
  round: number;
};

type winner = {
  name: string;
  avatar: string;
  score: number;
};

type time = {
  hour: string;
  min: string;
  sec: string;
};

type Storage = {
  getLanguage(): number;
}
export {
  landType, currentQuestion, winner, time,
};
