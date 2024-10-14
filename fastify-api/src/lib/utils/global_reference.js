/**
 * @type{<T>(key:string, func:()=>T)=>({data:T,refresh:()=>T})}
 */
export const getUnique = (key, func) => {
  /**
   * @type {Record<string,any|T>}
   */
  let it = globalThis;
  if (it[key]) {
    return it[key];
  }

  it[key] = {
    data: func(),
    refresh: () => getUnique(key, func),
  };
  return it[key];
};
