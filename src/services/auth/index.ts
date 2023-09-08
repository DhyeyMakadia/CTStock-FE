import request from "../publicClient";

export const AuthService = {
  Login: (payload: any) => {
    const response = request.post("/auth/login", payload)
    return response
  }
}