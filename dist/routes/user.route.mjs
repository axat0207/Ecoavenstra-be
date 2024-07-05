import { Router } from 'express';
import { Signup } from '../controllers/signup.mjs';
const route = Router();
route.post('/signup', Signup);
export default route;
