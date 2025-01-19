import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  console.log("token",token);

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  jwt.verify(token, 'abc', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    req.user = user;
    next();
  });
}

export default authenticateToken;

