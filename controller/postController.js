import { getUserById } from '../model/User.js';
import { getPostsByUserNumber } from '../model/Post.js';

export const getUserPosts = (req, res) => {
  const { userid } = req.body;

  getUserById(userid, (err, result) => {
    if (err) {
      console.error('userInfo 조회 실패:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const usernumber = result[0].usernumber;

    getPostsByUserNumber(usernumber, (err, posts) => {
      if (err) {
        console.error('usernumber 조회 못함:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(posts);
    });
  });
};
