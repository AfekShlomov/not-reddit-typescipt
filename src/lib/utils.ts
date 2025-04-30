import { User } from "./models";

export function authSignup(newUser: User, confirmPassword: string) {
  let errorArray = [];

  if (newUser.name!.length < 4) {
    errorArray.push("Username can't be less than 4 characters.");
  }
  if (newUser.password.length < 5) {
    errorArray.push("Password can't be less than 5 characters.");
  }
  if (newUser.password.length > 20) {
    errorArray.push("Password can't be more than 20 characters.");
  }
  if (newUser.password !== confirmPassword) {
    errorArray.push("Passwords do not match.");
  }

  return errorArray;
}

export function resetStates(
  errorMessage: string[],
  setError: React.Dispatch<React.SetStateAction<string[]>>,
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
) {
  setError(errorMessage);
  setIsProcessing(false);
}
