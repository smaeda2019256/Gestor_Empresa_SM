import { Router } from "express";
import { check } from "express-validator";
import { empresaPost, empresaPut } from "./empresa.controller";
import { existeNameCompany, existingById } from "../src/helpers/db-validator.js";
import { validarCampos } from "../src/middlewares/validarCampos.js"; 
import { validateJWT } from "../src/middlewares/validarJwt.js";
import { validateRole } from "../src/middlewares/validarRole.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        check('nameEmpresa', 'The Company name is required').not().isEmpty(),
        check('nameEmpresa').custom(existeNameCompany),
        check('impactLevel', "The company's impact level is mandatory").not().isEmpty(),
        check('yearsOfTrajectory', 'The years of experience of the company is mandatory').not().isEmpty(),
        check('category', 'The category is mandatory').not().isEmpty(),
        check('email', 'The company email is required').not(),isEmpty(),
        check('contactPhone', 'The company contact number is required').not().isEmpty(),
        validarCampos

    ], empresaPost)

router.put(
    "/:id",
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        check("id", "Not a valid ID").isMongoId(),
        check("id").custom(existingById),
        validarCampos
    ], empresaPut)

export default router;