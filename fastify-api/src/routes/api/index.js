import { RegisterRoutes } from "../../lib/utils/server_types.js";
import { gallery_routes } from "./cms.gallery.js";


export let api_routes = RegisterRoutes(gallery_routes)