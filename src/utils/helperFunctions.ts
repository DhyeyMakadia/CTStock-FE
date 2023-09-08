import { useRouter } from "next/router";

export const isAuthenticated = () => {
  const authToken = localStorage.getItem('authToken');
  return !!authToken;
};

export const signOut = () => {
  
  localStorage.removeItem('authToken');
  return
}