

/**
 * @typedef {import("fastify").RouteHandlerMethod} RouteHandlerMethod
 * 
 * @type  {(...route_map:Record<string,RouteHandlerMethod>[])=>Record<string,RouteHandlerMethod>}  
 */
export const RegisterRoutes = (...route_map)=>{

    let final_routes = {}

    route_map.map((routes)=>{
        Object.keys(routes).map((key,i)=>{
            if(!final_routes[key]){
                final_routes[key] = routes[key]
            }else{
                throw Error(`Duplicate route: ${key}`)
            }
        })
    })
    return final_routes
}
