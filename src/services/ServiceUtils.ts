export const withErasure = (inputObj: any, ...fields: string[]) => {
  return Object.keys(inputObj)
               .filter(e => fields.indexOf(e) == -1)
               .map(e => { return {[e] : inputObj[e]}})
               .reduce((obj, e) => {return  {...obj,...e}},{})
}
