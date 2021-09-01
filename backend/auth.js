import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.split(' ')[1]; // Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'mabimat',
            (err, decode) => {
                if (err) {
                    res.status(403).send({ message: 'Token hết thời gian hiệu lực vui lòng đăng nhập lại' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(403).send({ message: 'Vui lòng đăng nhập để thực hiện chức năng này' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Bạn không đủ quyền để thực hiện chức năng này' });
    }
};

export const isWebmaster = (req, res, next) => {
    if (req.user && req.user.isWebmaster) {
        next();
    } else {
        res.status(401).send({ message: 'Bạn không đủ quyền để thực hiện chức năng này' });
    }
};