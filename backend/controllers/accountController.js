import Account from '../models/accountModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'


const initToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isWebmaster: user.isWebmaster,
        },
        process.env.JWT_SECRET || 'mabimat',
        { expiresIn: '1d' }
    )
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.split(' ')[1]; // Bearer XXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'mabimat',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Token hết thời gian hiệu lực' });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: 'Vui lòng đăng nhập để thực hiện chức năng này' });
    }
};

export const signin = async (req, res) => {
    const user = await Account.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                sex: user.sex,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                isWebmaster: user.isWebmaster,
                token: initToken(user)
            })
            return;
        }

    }
    res.status(401).send({ message: 'Sai tài khoản hoặc mật khẩu!!!' })
}

export const register = async (req, res) => {
    const user = await Account.findOne({ email: req.body.email })

    if (user) {
        res.status(500).send({ message: 'Địa chỉ email đã tồn tại!!!' })

    } else {
        try {
            const user = new Account({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                sex: req.body.sex,
                avatar: req.body.avatar,
                password: bcrypt.hashSync(req.body.password, 8),
            });
            const createdUser = await user.save();
            res.send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                phone: createdUser.phone,
                sex: createdUser.sex,
                avatar: createdUser.avatar,
                isAdmin: createdUser.isAdmin,
                isWebmaster: createdUser.isWebmaster,
                token: initToken(createdUser),
            });
        } catch (error) {
            res.status(500).send({ message: 'Lỗi server!!!' })
        }
    }
}



export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find({});
        res.send(accounts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi server không thể lấy danh sách tài khoản!!!" });
    }
}

export const getDetailAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        res.send(account);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi server không tìm thấy chi tiết tài khoản!!!" });
    }
}

