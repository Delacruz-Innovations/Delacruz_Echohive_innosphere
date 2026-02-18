import { blogService as innosphereService } from './blogService';
import { delacruzBlogService } from './delacruzBlogService';
import { echohiveBlogService } from './echohiveBlogService';

export const getServiceByOrgId = (orgId) => {
    switch (orgId) {
        case 'innosphere':
            return innosphereService;
        case 'delacruz':
            return delacruzBlogService;
        case 'echohive':
            return echohiveBlogService;
        default:
            return innosphereService;
    }
};
