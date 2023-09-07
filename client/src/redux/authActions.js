import { authActions } from "./authSlice";

export const loginAsync = (loginInput) => async (dispatch) => {
    await dispatch(authActions.login(loginInput));
};
