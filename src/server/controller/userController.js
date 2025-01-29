import { getUserById } from '../models/User.js';

export const getUserInfo = (req, res) => {
  const { userid } = req.body;

  getUserById(userid, (err, result) => {
    if (err) {
      console.error('userInfo 조회 실패:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result[0]);
  });
};
