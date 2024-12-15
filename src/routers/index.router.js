import authorRouter from './authorRouter.js';
import registerRouter from './registerRouter.js';
import loginRouter from './loginRouter.js';
import userRouter from './userRouter.js';
import noteRouter from './noteRouter.js';
import express from 'express';

const router = express.Router();

router.use('/', loginRouter);
router.use('/', registerRouter);
router.use('/user', userRouter);
router.use('/author', authorRouter);
router.use('/note', noteRouter);

export default router;

// When to use an index.router.js file ?
// You can use an index.router.js file to group routes together and make them easier to manage.