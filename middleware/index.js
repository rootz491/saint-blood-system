const jwt = require('jsonwebtoken');

// check if user is authenticated
const isAuthenticated = (req, res, next) => {
  try {
    if (req?.cookies?.token) {
      const token = req.cookies?.token;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw {
            msg: 'Invalid token',
            status: 401
          }
        }
        req.user = decoded;
        next();
      });
    } else {
      throw {
        msg: 'No token provided',
        status: 401
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({
      message: error.msg
    });
  }
}

const isAdmin = (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw {
            msg: 'Invalid token',
            status: 401
          }
        }
        if (decoded.role !== 'admin') {
          throw {
            msg: 'Not an admin',
            status: 401
          }
        }
        next();
      });
    } else {
      throw {
        msg: 'No token provided',
        status: 401
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({
      message: error.msg
    });
  }
}

const isDonor = (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw {
            msg: 'Invalid token',
            status: 401
          }
        }
        if (decoded.role !== 'donor') {
          throw {
            msg: 'Not a donor',
            status: 401
          }
        }
        next();
      });
    } else {
      throw {
        msg: 'No token provided',
        status: 401
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({
      message: error.msg
    });
  }
}

const isVisitor = (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw {
            msg: 'Invalid token',
            status: 401
          }
        }
        if (decoded.role !== 'visitor') {
          throw {
            msg: 'Not a visitor',
            status: 401
          }
        }
        next();
      });
    } else {
      throw {
        msg: 'No token provided',
        status: 401
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({
      message: error.msg
    });
  }
}

const isNotVisitor = (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          throw {
            msg: 'Invalid token',
            status: 401
          }
        }
        if (decoded.role === 'visitor') {
          throw {
            msg: 'visitor not allowed',
            status: 401
          }
        }
        next();
      });
    } else {
      throw {
        msg: 'No token provided',
        status: 401
      }
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({
      message: error.msg
    });
  }
}

module.exports = { 
  isAuthenticated,
  isAdmin,
  isDonor,
  isVisitor,
  isNotVisitor
};