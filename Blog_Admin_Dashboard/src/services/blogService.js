import { db } from "../firebase/config";
import { createBaseBlogService } from "./baseBlogService";

export const blogService = createBaseBlogService(db, 'innosphere');
