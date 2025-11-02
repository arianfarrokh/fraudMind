
/**
 * 
 * @param token 
 */
export const setLocalStorageToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  };
  
  export const getLocalStorageToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };
  
  export const removeLocalStorageToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };
  