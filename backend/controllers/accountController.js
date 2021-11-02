import Account from '../models/accountModel.js'
import Order from '../models/orderModel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer';


const initToken = (user, expiresIn) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isWebmaster: user.isWebmaster,
        },
        process.env.JWT_SECRET || 'mabimat',
        { expiresIn: expiresIn }
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
                phone: user.phone,
                sex: user.sex,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                isWebmaster: user.isWebmaster,
                token: initToken(user, '1d')
            })
            return;
        }

    }
    res.status(404).send({ message: 'Sai tài khoản hoặc mật khẩu!!!' })
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
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;

        const name = req.query.name || '';
        const nameFilter = name ? { $text: { $search: name } } : {};

        const count = await Account.countDocuments({ ...nameFilter });

        const accounts = await Account.find({ ...nameFilter }).limit(limit).skip(startIndex).exec();

        res.send({ page, limit, pages: Math.ceil(count / limit), accounts });
    } catch (error) {
        res.status(500).send({ message: "Lỗi server không thể lấy danh sách tài khoản!!!" });
    }
}

export const getDetailAccount = async (req, res) => {
    //req.user từ hàm isAuth
    const account = await Account.findById(req.user._id);
    if (account) {
        res.send(account);
    } else {
        res.status(404).send({ message: 'Lỗi server không tìm thấy chi tiết tài khoản!!!' });
    }
}

export const deleteAccount = async (req, res) => {
    const user = await Account.findById(req.params.id);

    if (user) {
        if (user.isAdmin === true) {
            res.status(400).send({ message: 'Không thể xóa tài khoản admin' });
            return;
        }
        const order = await Order.findOne({ user: req.params.id })
        if (order) {
            await order.remove();
        }
        await user.remove();
        res.send({ message: 'Xóa thành công' });
    } else {
        res.status(404).send({ message: 'Không tìm thấy tài khoản!!!' });
    }
}

export const authorizeWebmaster = async (req, res) => {
    const user = await Account.findById(req.params.id);
    if (user) {
        if (user.isWebmaster === true) { return }
        user.isWebmaster = true;
        await user.save();
        res.send({ message: 'Cập nhật thành công' })
    } else {
        res.status(404).send({ message: 'Không tìm thấy tài khoản!!!' });
    }
}

export const unAuthorizeWebmaster = async (req, res) => {
    const user = await Account.findById(req.params.id);
    if (user) {
        if (user.isWebmaster === false) { return }
        user.isWebmaster = false;
        await user.save();
        res.send({ message: 'Cập nhật thành công' })
    } else {
        res.status(404).send({ message: 'Không tìm thấy tài khoản!!!' });
    }
}

export const updateAccount = async (req, res) => {
    const user = await Account.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.avatar = req.body.avatar || user.avatar;


        if (req.body.newPassword) {
            user.password = bcrypt.hashSync(req.body.newPassword, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin,
            isWebmaster: user.isWebmaster,
            token: initToken(updatedUser),
        });
    }
}

export const forgotPassword = async (req, res) => {
    const user = await Account.findOne({ email: req.body.email })

    if (user) {
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET || 'mabimat',
            { expiresIn: '5m' }
        )
        const link = `http://localhost:3000/reset/${user._id}/${token}`


        const output = `
        <h3>Bấm vào link bên dưới để đặt lại mật khẩu</h3>
        <h3>Link: ${link}</h3>
    `;
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'davidpham2000z@gmail.com', // generated ethereal user
                pass: 'luuphihung1', // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        // send mail with defined transport object
        await transporter.sendMail({
            from: 'PL-STORE', // sender address
            to: req.body.email, // list of receivers
            subject: "Lấy lại mật khẩu", // Subject line
            text: "Quên mật khẩu", // plain text body
            html: output, // html body
        });

        res.send({ message: 'Link đổi mật khẩu đã được gửi tới email của bạn' })
    } else {
        res.send({ error: 'Tài khoản không tồn tại' })
    }
}

export const resetPassword = async (req, res) => {
    const user = await Account.findById(req.body.userId)
    const token = req.body.token
    const newPassword = req.body.newPassword

    if (user) {
        try {
            jwt.verify(token, process.env.JWT_SECRET || 'mabimat')
            user.password = bcrypt.hashSync(newPassword, 8)
            await user.save();

            res.send({ success: true, message: 'Đổi mật khẩu thành công' })

        } catch (error) {
            res.send({ error: 'Token hết hiệu lực' })
        }

    }
}

