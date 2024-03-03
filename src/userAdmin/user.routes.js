import { Router } from "express";
import { check } from "express-validator";
import { userPost } from "./user.controller.js";
import { existeEmail, existeUsername } from "../helpers/db-validator.js";