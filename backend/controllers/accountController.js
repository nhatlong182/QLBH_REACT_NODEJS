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
        }, 'mabimat', { expiresIn: '1d' }
    )
}

export const signin = async (req, res) => {
    const user = await Account.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isWebmaster: user.isWebmaster,
                token: initToken(user)
            })
        }
        return;
    }
    res.status(401).send({ message: 'Sai tài khoản hoặc mật khẩu!!!' })
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

