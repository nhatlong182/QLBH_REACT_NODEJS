import multer from 'multer';
import express from 'express';
import { isAuth } from '../auth.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'frontend/public/images/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage }).single('file');

uploadRouter.post('/', isAuth, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).send(err);
        }
        return res.status(200).send(req.file);
    })
});

export default uploadRouter;
