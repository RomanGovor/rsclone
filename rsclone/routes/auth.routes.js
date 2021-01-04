const { Router } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = Router();
// api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }
      const { email, password, nick } = req.body;
      const candidate = await User.findOne({ email });
      const candidateNick = await User.findOne({ nick });

      if (candidate || candidateNick) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' });
      }

      const hasedpassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hasedpassword });
      await user.save();
      res.status(201).json({ message: 'Пользователь создан' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  }
);
// api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  // eslint-disable-next-line consistent-return
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  }
);

module.exports = router;
