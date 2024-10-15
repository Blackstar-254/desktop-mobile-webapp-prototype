import { RegisterRoutes } from "../lib/utils/server_types.js";
import { api_routes } from "./api";


export const routes = RegisterRoutes(api_routes)