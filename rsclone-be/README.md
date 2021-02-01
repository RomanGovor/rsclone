# Серверная часть для проекта SiGame
### Служит для работы с авторизацией и регистрацией пользователя. А также для получения или сохранения данных, которые отображают статистику показателей. Пароль пользователя шифруется и храниться в зашифрованном виде.
#### Поддерживает такие функции как:
1. регистрация;
2. авторизация;
3. выход из аккаунта;
4. получение данных пользователя;
5. запись данных пользователя.

#### При записи данных используется специальный объект, который включает определенные поля:
```js
{
  numberOfGames: '0',
  maximumNumberOfWins: '0',
  points: '0',
  averagePoints:  '0',
  averagePlayTime:  '0',
  maximumPlayTime:  '0',
}
```
Все значения полей объекта являются строковыми.
#### Взаимодействие с сервером происходит при обращении к ссылкам, как:
* POST. 'https://reclone-be-2.herokuapp.com/users' — для регистрации,
* POST. 'https://reclone-be-2.herokuapp.com/users/login' — для авторизации,
* POST. 'https://reclone-be-2.herokuapp.com/users/me/logout' — для выхода из аккаунта,
* POST. 'https://reclone-be-2.herokuapp.com/users/me/logoutall' — для выхода из аккаунта на всех устройствах,
* PUT. 'https://reclone-be-2.herokuapp.com/users/me' — для отправки данных,
* GET. 'https://reclone-be-2.herokuapp.com/users/me' —  для получения данных.
[ссылка не репозиторий](https://git.heroku.com/reclone-be-2.git)

