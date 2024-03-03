import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";

const router = Router();

router.post (
    '/login',
    [
        check('username', 'The username must not be empty').not().isEmpty(),
        check('password', 'The password must not be empty').not().isEmpty(),
    ], login
);

export default router;