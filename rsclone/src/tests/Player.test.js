import { Player } from '../js/components/Player';
import '@testing-library/jest-dom';

describe('Player', () => {
  const container = document.createElement('div');
  container.classList = 'some-class';

  const defaultPlayer = new Player({});
  const player = new Player({
    container,
    name: 'Name',
    gender: 'woman',
    score: 700,
    lang: 'ru',
    avatar: 'url(../assets/images/avatars/avatar_10.jpg)',
    status: 'player',
    isActivePlayer: true,
    workName: 'bot1',
    permissionToAnswer: true,
  });

  test('should init Player', () => {
    expect(typeof defaultPlayer).toEqual('object');
    expect(defaultPlayer instanceof Player).toEqual(true);

    expect(typeof player).toEqual('object');
    expect(player instanceof Player).toEqual(true);
  });

  test('should contain default properties', () => {
    expect(defaultPlayer.container).toEqual(null);
    expect(defaultPlayer.name).toEqual('Player');
    expect(defaultPlayer.gender).toEqual('man');
    expect(defaultPlayer.score).toEqual(0);
    expect(defaultPlayer.lang).toEqual('en');
    expect(defaultPlayer.avatar).toEqual(undefined);
    expect(defaultPlayer.status).toEqual('bot');
    expect(defaultPlayer.isActivePlayer).toEqual(false);
    expect(defaultPlayer.workName).toEqual('player');
    expect(defaultPlayer.permissionToAnswer).toEqual(true);
    expect(defaultPlayer.botLevel).toEqual('low');
  });
  test('should contain set properties', () => {
    expect(player.container).toEqual(container);
    expect(player.container.classList.contains('some-class')).toEqual(true);
    expect(player.name).toEqual('Name');
    expect(player.gender).toEqual('woman');
    expect(player.score).toEqual(700);
    expect(player.lang).toEqual('ru');
    expect(player.avatar).toEqual('url(../assets/images/avatars/avatar_10.jpg)');
    expect(player.status).toEqual('player');
    expect(player.isActivePlayer).toEqual(true);
    expect(player.workName).toEqual('bot1');
    expect(player.permissionToAnswer).toEqual(true);
  });

  test('should contain DOM elements', () => {
    const avatar = player.player.querySelector('.player__avatar');
    const info = player.player.querySelector('.player__info');
    const name = player.player.querySelector('.player__name');
    const score = player.player.querySelector('.player__score');
    const answerField = player.player.querySelector('.player__answer-field');

    expect(avatar).toBeDefined();
    expect(avatar).toHaveClass('player__avatar player__avatar_woman');
    expect(info).toBeDefined();
    expect(info).toHaveClass('player__info');
    expect(name).toBeDefined();
    expect(name).toHaveClass('player__name');
    expect(name).toHaveTextContent('Name');
    expect(score).toBeDefined();
    expect(score).toHaveClass('player__score');
    expect(score).toHaveTextContent('0');
    expect(answerField).toBeDefined();
    expect(answerField).toHaveClass('player__answer-field none');
  });

  test('changeScore - should add points to the score', () => {
    player.changeScore(1000);
    defaultPlayer.changeScore(500);
    defaultPlayer.changeScore(-1000);

    expect(player.score).toEqual(1700);
    expect(defaultPlayer.score).toEqual(-500);
  });

  test('setAvatar - should change avatar', () => {
    const ava = '../assets/images/avatars/avatar_1';

    player.setAvatar(ava);

    const avatar = player.player.querySelector('.player__avatar');
    expect(avatar).toBeDefined();
    expect(avatar).toHaveClass('player__avatar player__avatar_woman');
    expect(avatar).toHaveAttribute('style', `background-image: url(${ava})`);
  });
  test('setPermissionToAnswer - should change permissionToAnswer ', () => {
    player.setPermissionToAnswer(false);
    expect(player.permissionToAnswer).toEqual(false);
    player.setPermissionToAnswer(true);
    expect(player.permissionToAnswer).toEqual(true);
  });
  test('getPermissionToAnswer - should return permissionToAnswer ', () => {
    expect(defaultPlayer.getPermissionToAnswer()).toEqual(true);
    expect(player.getPermissionToAnswer()).toEqual(true);
  });
  test('getWorkName - should return workName ', () => {
    expect(defaultPlayer.getWorkName()).toEqual('player');
    expect(player.getWorkName()).toEqual('bot1');
  });
  test('getStatus - should return status ', () => {
    expect(defaultPlayer.getStatus()).toEqual('bot');
    expect(player.getStatus()).toEqual('player');
  });
  test('getScore - should return object with info', () => {
    expect(defaultPlayer.getScore()).toEqual({
      score: -500,
      name: 'Player',
      workName: 'player',
      avatar: undefined,
    });
    expect(player.getScore()).toEqual({
      score: 1700,
      name: 'Name',
      workName: 'bot1',
      avatar: 'url(../assets/images/avatars/avatar_10.jpg)',
    });
  });
  test('say - should show player answer-field with answer', () => {
    const answer = defaultPlayer.player.querySelector('.player__answer-field');
    defaultPlayer.say();
    expect(answer.classList.contains('none')).toEqual(false);
    expect(answer).toHaveTextContent('Hello. I Player');

    defaultPlayer.say('My answer is ANSWER!!!');
    expect(answer).toHaveTextContent('My answer is ANSWER!!!');
  });
  test('hideSpeech - should hide player answer-field', () => {
    const answer = player.player.querySelector('.player__answer-field');
    player.say('Hello world');
    player.hideSpeech();
    expect(answer.classList.contains('none')).toEqual(true);
  });
  test('getActivePlayer - should return isActivePlayer', () => {
    expect(defaultPlayer.getActivePlayer()).toEqual(false);
    expect(player.getActivePlayer()).toEqual(true);
  });

  test('makePlayerActive - should make the player is active and other player are inactive', () => {
    defaultPlayer.makePlayerActive();
    expect(defaultPlayer.getActivePlayer()).toEqual(true);
  });
});
