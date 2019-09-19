export const flattenObject = ob => {
  const toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }

  return toReturn
};

export const getValues = ob => {
  const toReturn = []
  const values = Object.values(ob)
  for (let value of values) {
    if (value !== '' && value !== '0' && value !== 'br') {
      toReturn.push(value)
    }
  }

  return toReturn
}