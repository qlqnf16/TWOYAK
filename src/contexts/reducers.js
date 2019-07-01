export const drugReducer = (drugs, { type, payload }) => {
  switch (type) {
    case "SET_INIT_DATA":
      return { drugs: payload[0].data, adverse_effects: payload[1].data };
    default:
      break;
  }
};
