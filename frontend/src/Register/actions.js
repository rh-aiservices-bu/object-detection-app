export const REGISTER_USER = "Register.REGISTER_USER";
export const registerUser = (register, callback) => ({
  type: REGISTER_USER,
  payload: {
    register,
  },
  callback
});

export const REGISTER_USER_FULFILLED = "Register.REGISTER_USER_FULFILLED";
export const registerUserFulfilled = (response) => ({
  type: REGISTER_USER_FULFILLED,
  payload: {
    response,
  },
});

export const REGISTER_USER_REJECTED = "Register.REGISTER_USER_REJECTED";
export const registerUserRejected = (error) => ({
  type: REGISTER_USER_REJECTED,
  payload: {
    error,
  },
});