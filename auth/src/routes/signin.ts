import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
  res.send('signin user router works!');
});

export { router as signinRouter };
