import { Router } from "express";
import { check } from "express-validator";
import { userPost, usersGet } from "./user.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { existeEmail, existeUsername } from "../helpers/db-validator.js";

const router = Router();

router.get("/", usersGet);

router.post(
    "/",
    [
        check('username', 'The username is required').not().isEmpty(),
        check('username').custom(existeUsername),
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').not().isEmpty(),
        check("email", "The email is not valid").isEmail(),
        check('email').custom(existeEmail),
        check('password', 'The password must be greater than 6 characters').isLength({min: 6}),
        validarCampos
    ], userPost
)

export default router;
