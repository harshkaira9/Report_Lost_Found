// notification.js
import { db } from "./firebase-init.js"; // uses the export from firebase-init.js
import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const notificationBell = document.getElementById("notificationBell");
const notificationBadge = document.getElementById("notificationBadge");
const notificationList = document.getElementById("notificationList");
const container = document.querySelector(".notification-container");

// Toggle dropdown
notificationBell.addEventListener("click", () => {
  container.classList.toggle("active");
});

// Real time listener
const notesQuery = query(collection(db, "notifications"), orderBy("timestamp", "desc"));

onSnapshot(notesQuery, (snapshot) => {
  notificationList.innerHTML = "";
  let unreadCount = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    // Show a short timestamp if available
    let tsText = "";
    if (data.timestamp && data.timestamp.toDate) {
      tsText = " · " + new Date(data.timestamp.toDate()).toLocaleString();
    }
    li.textContent = `${data.message}${tsText}`;
    notificationList.appendChild(li);

    if (!data.read) unreadCount++;
  });

  if (unreadCount > 0) {
    notificationBadge.textContent = unreadCount;
    notificationBadge.style.display = "inline-block";
  } else {
    notificationBadge.style.display = "none";
  }
});
