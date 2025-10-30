// report.js — Connected to Flask backend and Firebase Auth

import { auth } from "./firebase.js";

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const lostForm = document.getElementById("lostForm");
  const foundForm = document.getElementById("foundForm");

  // =====================================================
  // 1️⃣ Handle LOST ITEM report form
  // =====================================================
  if (lostForm) {
    lostForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await submitReportForm(lostForm, "lost");
    });
  }

  // =====================================================
  // 2️⃣ Handle FOUND ITEM report form
  // =====================================================
  if (foundForm) {
    foundForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await submitReportForm(foundForm, "found");
    });
  }

  // =====================================================
  // 3️⃣ Common function for both Lost/Found forms
  // =====================================================
  async function submitReportForm(form, type) {
    try {
      const formData = new FormData(form);
      formData.append("type", type);

      // Get logged-in Firebase user (optional for now)
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        formData.append("uid", user.uid);
        formData.append("token", token);
      }

      // Show loading state
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading"></span> Submitting...';

      // Send to Flask backend
      const response = await fetch("http://127.0.0.1:5000/api/report", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // Handle success or error
      if (response.ok) {
        alert("✅ " + data.message);
        form.reset();
      } else {
        alert("⚠️ " + (data.error || "Error submitting report"));
      }

      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting form. Please try again.");
    }
  }
});
