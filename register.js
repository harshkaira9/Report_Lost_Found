// --- Import Firebase ---
import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// --- MAIN CODE ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const submitBtn = document.querySelector("#registrationForm button[type='submit']");

  if (!form) {
    console.error("⚠️ Registration form not found on this page.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // --- VALIDATION ---
    if (!email || !password || !confirmPassword) {
      alert("⚠️ Please fill out all fields.");
      return;
    }
    if (password.length < 6) {
      alert("⚠️ Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    // --- DISABLE BUTTON WHILE PROCESSING ---
    submitBtn.disabled = true;
    submitBtn.textContent = "Registering...";

    try {
      // --- CREATE USER ---
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // --- SAVE TO FIRESTORE ---
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        verified: false
      });

      // --- SEND VERIFICATION EMAIL ---
      await sendEmailVerification(user);

      alert("✅ Registration successful! Please check your email to verify your account.");
      window.location.href = "login.html";

    } catch (error) {
      console.error("❌ Registration failed:", error);

      let message = "Registration failed.";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address.";
          break;
        case "auth/weak-password":
          message = "Password is too weak (min 6 characters).";
          break;
        default:
          message = error.message;
      }

      alert("⚠️ " + message);
    }

    // --- ENABLE BUTTON AGAIN ---
    submitBtn.disabled = false;
    submitBtn.textContent = "Register";
  });
});
