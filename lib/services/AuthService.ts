// Basic imports
import { signInWithEmailAndPassword } from "firebase/auth"
import { setLocal } from "../utils/localStorage"
import { auth } from "../config/firebase"

class AuthService {
  static async loginUser(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
    setLocal("auth", true)
  }
}

export default AuthService
