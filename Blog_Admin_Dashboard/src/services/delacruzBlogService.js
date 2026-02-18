import { db } from "../firebase/delacruzConfig";
import { createBaseBlogService } from "./baseBlogService";

export const delacruzBlogService = createBaseBlogService(db, 'delacruz');
