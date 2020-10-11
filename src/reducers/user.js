export const userState = {
  isQuerying: false,
  favorites: [],
  errors: [],
};

export default function weatherReducer(state = userState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
