import { defineToolbarApp } from "astro/toolbar";

const motivationalMessages = [
  "You're doing great!",
  "Keep up the good work!",
  "You're awesome!",
  "You're a star!",
];

export default defineToolbarApp({
  init(canvas, app) {
    const myWindow = document.createElement("astro-dev-toolbar-window");
    const h1 = document.createElement("h1");
    h1.textContent =
      motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ];

    myWindow.appendChild(h1);
    canvas.append(myWindow);

    // Display a random message when the app is toggled
    app.onToggled(({ state }) => {
      const newMessage =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ];
      h1.textContent = newMessage;
    });
  },
});
