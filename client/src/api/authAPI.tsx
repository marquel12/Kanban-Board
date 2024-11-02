import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
 

  try {
    
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();
    console.log('hello', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { login };
