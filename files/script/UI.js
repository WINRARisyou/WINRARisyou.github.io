// TODO
// ADD SYSTEM FOR DISPLAYING SYSTEM TOASTS, e.g. BATTERY LOW, ETC.
/* Start Menu */
window.startMenuOpen = false;
window.addEventListener("DOMContentLoaded", function() {
	window.startMenu = document.getElementById("startMenu");
});
function openStartMenu() {
	if (!window.startMenuOpen) {
		window.startMenuOpen = true;
		console.log("opened");
		let currentClasses = window.startMenu.classList;
		currentClasses.forEach(value => {
			if ("startMenuClosed" == value || "closeStartMenu" == value) {
				window.startMenu.classList.remove("startMenuClosed");
				window.startMenu.classList.remove("closeStartMenu");
				window.startMenu.classList.add("openStartMenu");
				return;
			}
		})
	} else {
		window.startMenuOpen = false;
		console.log("closed")
		let currentClasses = window.startMenu.classList;
		currentClasses.forEach(value => {
			if ("openStartMenu" == value) {
				window.startMenu.classList.remove("openStartMenu");
				window.startMenu.classList.add("closeStartMenu");
				return;
			}
		})
	}
}
/* End Start Menu */
/* Sys Toasts */
class Notification {
	constructor(initiator, title, text, icon) {
		this.initiator = initiator;
		this.title = title;
		this.text = text;
		this.icon = icon;
		this.createNotification();
	}

	createNotification() {
		const notification = document.createElement("div");
		notification.classList.add("notification");

		const iconElement = document.createElement("img");
		iconElement.src = this.icon;
		iconElement.classList.add("notification-icon");

		const initiatorElement = document.createElement("h4")
		initiatorElement.textContent = this.initiator;
		initiatorElement.classList.add("notification-title")

		const titleElement = document.createElement("h4");
		titleElement.textContent = this.title;
		titleElement.classList.add("notification-title");

		const textElement = document.createElement("p");
		textElement.textContent = this.text;
		textElement.classList.add("notification-text");

		notification.appendChild(iconElement);
		notification.appendChild(initiatorElement);
		notification.appendChild(titleElement);
		notification.appendChild(textElement);

		const notifContainer = document.getElementById("notifications")
		notifContainer.appendChild(notification);

		setTimeout(() => {
			notification.classList.add("fade-out");
			notification.addEventListener("transitionend", () => {
				notification.remove();
			});
		}, 3000);
	}
}

var testNotif = new Notification("RAR-OS System",  "Battery Low", "Your battery is running low. Please connect a charger to prevent unexpected shutdowns.", "files/img/UI/battery low.svg");
var testNotif2 = new Notification("RAR-OS System", "Battery Low", "Your battery is running low.", "files/img/UI/battery low.svg");