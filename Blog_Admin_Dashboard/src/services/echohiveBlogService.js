import { db } from "../firebase/echohiveConfig";
import { createBaseBlogService } from "./baseBlogService";

export const echohiveBlogService = createBaseBlogService(db, 'echohive');
