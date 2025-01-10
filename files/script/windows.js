var mouseX = 0;
var mouseY = 0;

// store the offset between the mouse position and the window position when dragging starts
var offsetX = 0;
var offsetY = 0;

var highestZIndex = 3;

function updateMousePosition(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;
}

document.addEventListener("mousemove", updateMousePosition);

// handle dragging and resizing
document.addEventListener("mousemove", (event) => {
	// loop through all elements with the "dragging" attribute
	var draggingElements = document.querySelectorAll("[dragging]");
	draggingElements.forEach((element) => {
		// check if the element is being dragged or resized
		if (element.getAttribute("dragging") === "") {
			let stopX, stopY = false
			if (element.getAttribute("customHTML") != null && mouseY > (element.offsetTop) + 20) {
				return;
			}
			if (element.offsetHeight + (mouseY - offsetY) >= document.getElementById("taskbar").offsetTop) {
				stopY = true
				element.style.top = `${document.getElementById("taskbar").offsetTop - element.offsetHeight}px`;
			}
			if (element.offsetWidth + (mouseX - offsetX) >= window.innerWidth) {
				stopX = true
				element.style.left = `${window.innerWidth - element.offsetWidth}px`
			}
			if (element.offsetTop + (mouseY - offsetY) < 0) {
				stopY = true
				element.style.top = "0px"
			}
			if (element.offsetLeft + (mouseX - offsetX) < 0) {
				stopX = true
				element.style.left = "0px"
			}
			if (!stopY) element.style.top = `${mouseY - offsetY}px`;
			if (!stopX) element.style.left = `${mouseX - offsetX}px`;
		} else if (element.getAttribute("resize")) {
			var resizeDirection = element.getAttribute("resize-direction");
			resizeWindow(element, resizeDirection, event);
		}
	});
	var customHTMLWindows = document.querySelectorAll("[customHTML]");
	customHTMLWindows.forEach((element) => {
		var iframe = element.querySelector("iframe");
		iframe.style.height = "1px";
		iframe.style.width = element.style.width;
	});
});

var taskbar = document.getElementById("taskbar-content");

function createCustomWindow() {
	//var winContent = document.createElement("div");
	var winContent = `
	<h3>Create Custom App</h3>
	<p>Title: <input id="tInp" type="text" placeholder="Google"></p><br>
	<p>URL: <input id="url" type="text" placeholder="https://google.com/webhp?igu=1"></p><br>
	<p><em>**MUST HAVE THE https:// PART AT THE BEGINNING OR THE ICON WILL NOT WORK.</em></p><br>
	<p>Color: <input id="col" type="text" placeholder="#00FF00"></p><br>
	<p>**WILL NOT WORK WITHOUT THE "#". It's a hex code BTW, look up color picker and use the hex thing.</p><br>
	<button onclick="createWindow(document.getElementById('tInp').value, highestZIndex, 640, 360, document.getElementById('url').value, null, document.getElementById('col').value);updateTaskbar('', 'create-custom-window', true);this.parentElement.remove();">Create!</button>
	`
	createWindow("Create Custom App", "create-custom-window", 854, 480, null, winContent, "#ffcdff");
}

// resize window logic
var resizing = false;
var initialMouseX, initialMouseY;
var initialWidth, initialHeight, initialLeft, initialTop;
var resizingWindow = null;

function startResize(event, windowElement, direction) {
	resizing = true;
	resizingWindow = windowElement; // Store the reference to the window being resized
	var rect = windowElement.getBoundingClientRect();


	// save initial state
	initialMouseX = event.clientX;
	initialMouseY = event.clientY;
	initialWidth = rect.width;
	initialHeight = rect.height;
	initialLeft = rect.left - 2; // moves two pixels to the right if not offset here
	initialTop = rect.top - 2;

	document.onmousemove = (e) => resizeWindow(e, windowElement, direction);
	document.onmouseup = stopResize;
}

function resizeWindow(event, windowElement, direction) {
	/*
	if (windowElement.offsetTop < 0) {
	 	var x = Math.abs(windowElement.offsetTop)
	 	windowElement.style.top = `${x + windowElement.offsetTop}px`
	 	windowElement.style.height = `${x + windowElement.offsetHeight}px`
	 	return;
	}
	*/
	var iframe = windowElement.querySelector("iframe");
	if (!resizing) return;
	if (!iframe) return;
	iframe.style.pointerEvents = "none";
	var maxWidth = windowElement.querySelector("p").offsetWidth + 100;


	var deltaX = event.clientX - initialMouseX; // horizontal movement
	var deltaY = event.clientY - initialMouseY; // vertical movement

	switch (direction) {
		case "right":
			var newWidthRight = initialWidth + deltaX;
			if (newWidthRight >= maxWidth) {
				windowElement.style.width = `${newWidthRight}px`;
				iframe.style.width = `${newWidthRight}px`;
			}
			break;

		case "left":
			var newWidthLeft = initialWidth - deltaX;
			if (newWidthLeft >= maxWidth) {
				windowElement.style.width = `${newWidthLeft}px`;
				iframe.style.width = `${newWidthLeft}px`;
				windowElement.style.left = `${initialLeft + deltaX}px`; // adjust left position
			}
			break;

		case "bottom":
			var newHeightBottom = initialHeight + deltaY;
			if (newHeightBottom >= 100) {
				windowElement.style.height = `${newHeightBottom}px`;
				iframe.style.height = `${newHeightBottom - 20}px`;
			}
			break;

		case "top":
			var newHeightTop = initialHeight - deltaY;
			if (newHeightTop >= 100) {
				windowElement.style.height = `${newHeightTop}px`;
				iframe.style.height = `${newHeightTop - 20}px`;
				windowElement.style.top = `${initialTop + deltaY}px`; // adjust top position
			}
			break;

		case "top-right":
			// Top
			var newHeightTopRight = initialHeight - deltaY;
			if (newHeightTopRight >= 100) {
				windowElement.style.height = `${newHeightTopRight}px`;
				iframe.style.height = `${newHeightTopRight - 20}px`;

				windowElement.style.top = `${initialTop + deltaY}px`;

			}
			// Right
			var newWidthTopRight = initialWidth + deltaX;
			if (newWidthTopRight >= maxWidth) {
				windowElement.style.width = `${newWidthTopRight}px`;
				iframe.style.width = `${newWidthTopRight}px`
			}
			break;

		case "top-left":
			// Top
			var newHeightTopLeft = initialHeight - deltaY;
			if (newHeightTopLeft >= 100) {
				windowElement.style.height = `${newHeightTopLeft}px`;
				iframe.style.height = `${newHeightTopLeft - 20}px`;
				windowElement.style.top = `${initialTop + deltaY}px`;
			}
			// Left
			var newWidthTopLeft = initialWidth - deltaX;
			if (newWidthTopLeft >= maxWidth) {
				windowElement.style.width = `${newWidthTopLeft}px`;
				iframe.style.width = `${newWidthTopLeft}px`;
				windowElement.style.left = `${initialLeft + deltaX}px`;

			}
			break;

		case "bottom-right":
			// Bottom
			var newHeightBottomRight = initialHeight + deltaY;
			if (newHeightBottomRight >= 100) {
				windowElement.style.height = `${newHeightBottomRight}px`;
				iframe.style.height = `${newHeightBottomRight - 20}px`;

			}
			// Right
			var newWidthBottomRight = initialWidth + deltaX;
			if (newWidthBottomRight >= maxWidth) {
				windowElement.style.width = `${newWidthBottomRight}px`;
				iframe.style.width = `${newWidthBottomRight}px`;

			}
			break;

		case "bottom-left":
			// Bottom
			var newHeightBottomLeft = initialHeight + deltaY;
			if (newHeightBottomLeft >= 100) {
				windowElement.style.height = `${newHeightBottomLeft}px`;
				iframe.style.height = `${newHeightBottomLeft - 20}px`
			}
			// Left
			var newWidthBottomLeft = initialWidth - deltaX;
			if (newWidthBottomLeft >= maxWidth) {
				windowElement.style.width = `${newWidthBottomLeft}px`;
				windowElement.style.left = `${initialLeft + deltaX}px`;
				iframe.style.width = `${newWidthBottomLeft}px`;
			}
			break;
	}
}

function stopResize() {
	resizing = false;
	document.onmousemove = null;
	document.onmouseup = null;

	// only restore pointer events if we're done resizing
	if (resizingWindow) {
		var iframe = resizingWindow.querySelector("iframe");
		if (iframe) {
			iframe.style.pointerEvents = "auto";
		}
		resizingWindow.removeAttribute("dragging");
		resizingWindow = null; // clear the reference to the resized window
	}
	var customHTMLWindows = document.querySelectorAll("[customHTML]");
	customHTMLWindows.forEach((element) => {
		var iframe = element.querySelector("iframe");
		iframe.style.height = "1px";
		iframe.style.width = element.style.width;
	})
}




// stop dragging on mouse release
document.addEventListener("mouseup", () => {
	// remove the dragging attribute from all elements
	var draggingElements = document.querySelectorAll("[dragging]");
	draggingElements.forEach((element) => {
		// reset pointer events on all iframes when not dragging
		var iframe = document.querySelector("iframe");
		if (iframe) {
			iframe.style.pointerEvents = "auto"; // restore normal iframe behavior
		}
		element.removeAttribute("dragging");
	});
	var iframes = document.querySelectorAll("iframe");
	iframes.forEach((element) => {
		element.style.pointerEvents = "auto";
	});
});

function showWindow(id) {
	var elem = document.getElementById(id);
	var id = id;
	//console.log("ID: " + id)

	// if the element doesn't exist, create it dynamically
	if (elem == null) {
		//console.log("Element not found! Creating...")
		//console.log("ID " + id)
		const windowData = windows[id]; // get window data
		//console.log("window data: " + windowData)
		if (!windowData) {
			console.error(`No window data found for ID: ${id}`);
			return;
		}

		// destructure the window data
		var [title, id, width, height, url, customHTML, color] = windowData;

		createWindow(title, id, width, height, url, customHTML, color);
		return;
	}

	// make the window visible and bring it to the front
	elem.style.display = "block";
	highestZIndex++;
	elem.style.zIndex = highestZIndex;
}


function openSite(url) {
	window.open(url, "_blank");
}

function minimizeWindow(id) {
	var elem = document.getElementById(id);
	elem.style.display = "none";
}

function maximizeWindow(id) {
	var elem = document.getElementById(id);
	elem.style.top = "0px";
	elem.style.left = "0px";
	elem.style.width = "100%";
	elem.style.height = "calc(100vh - 52px)";
	var iframe = elem.querySelector("iframe");
	iframe.style.width = "100%";
	iframe.style.height = "calc(100% - 20px)";
	showWindow(elem.id);
}

function closeWindow(id) {
	var elem = document.getElementById(id);
	elem.remove();
}

var openWindows = document.getElementById("openWindows");
var windows = {};


function createWindow(title, id, width, height, url, customHTML, color) {
	if (document.getElementById(id) != null) return;
	// default window attributes
	if (title == "") title = "Google";
	height += 20
	if (url == "") url = "https://google.com/webhp?igu=1";
	if (color == "") color = "#00FF00";

	// window element
	var window = document.createElement("div");
	window.id = id;
	window.classList.add("window");

	// window content
	var t = document.createElement("p");
	t.textContent = title;
	window.appendChild(t);

	// window controls
	var windowControls = document.createElement("div");
	windowControls.classList.add("window-controls");
	var openInNew = document.createElement("span");
	var minimize = document.createElement("span");
	var maximize = document.createElement("span");
	var close = document.createElement("span");
	openInNew.innerHTML = `<img src="files/img/open in new.svg" width="16px"/>`	;
	openInNew.setAttribute("onclick", `openSite("${url}")`);
	minimize.textContent = "‒";
	minimize.setAttribute("onclick", `minimizeWindow("${id}")`);
	maximize.textContent = "□";
	maximize.setAttribute("onclick", `maximizeWindow("${id}")`);
	close.innerHTML = "&times;"
	close.setAttribute("onclick", `closeWindow("${id}");`)
	close.id = "close"
	close.setAttribute("style", "@keyframes controlHover { to { color: red; } } ; this:hover {  animation: controlHover 0.25s forwards;}")
	windowControls.append(openInNew, minimize, maximize, close);
	window.appendChild(windowControls);

	// custom html check
	if (customHTML == null) {
		var iframe = document.createElement("iframe")
		iframe.setAttribute("style", `width: ${width}px; height: ${height - 20}px;`)
		if (!url.startsWith("./")) {
			if (url.startsWith("https://")) {
				iframe.src = url;
			} else {
				iframe.src = "https://" + url;
			}
		} else {
			iframe.src = url;
		}
		window.appendChild(iframe);
	} else {
		var iframe = document.createElement("iframe");
		iframe.setAttribute("style", `width: ${width}px; height: 1px;`);
		window.appendChild(iframe);
		windows[id] = [title, id, width, (height - 20), url, customHTML, color];
		window.setAttribute("customHTML", "");
		window.insertAdjacentHTML("beforeend", customHTML);
	}
	
	// misc window stuff
	window.setAttribute("style", `width: ${width}px; height: ${height}px; top: 0px; left: 0px; background-color: #00FF00;`);
	window.addEventListener("mousedown", function (event) {
		// set the offset between mouse and window
		offsetX = event.clientX - window.offsetLeft;
		offsetY = event.clientY - window.offsetTop;
		
		// Check if resize handle was clicked
		var resizeHandle = event.target.closest(".resize-handle");
		if (resizeHandle) {
			this.setAttribute("dragging", "resize");
			this.setAttribute("resize-direction", resizeHandle.getAttribute("data-direction"));
		} else {
			this.setAttribute("dragging", "");
		}
		
		highestZIndex++;
		this.style.zIndex = highestZIndex;
		
		// disable pointer events on iframe to allow dragging without getting interrupted
		var iframe = this.querySelector("iframe");
		if (iframe) {
			if (customHTML != null) {
				iframe.style.height = "1px";
			}
			iframe.style.pointerEvents = "none"; // disable iframe interaction during dragging
		}
	});

	// resize handles
	var resizeDirections = ["top", "right", "bottom", "left", "top-right", "top-left", "bottom-right", "bottom-left"];
	resizeDirections.forEach(direction => {
		var resizeHandle = document.createElement("div");
		resizeHandle.classList.add("resize-handle", direction);
		resizeHandle.setAttribute("data-direction", direction);
		
		// attach the startResize function to the mousedown event
		resizeHandle.addEventListener("mousedown", (event) => {
			event.stopPropagation(); // prevent dragging from triggering at the same time
			startResize(event, window, direction);
		});

		window.appendChild(resizeHandle);
	});
	
	// append window
	openWindows.appendChild(window);
	if (color != undefined) {
		window.style.backgroundColor = color;
	} else {
		window.style.backgroundColor = "#00FF00;";
	}
	showWindow(id);
	windows[id] = [title, id, width, (height - 20), url, customHTML, color];
	updateTaskbar(iframe.src, id);
}

function updateTaskbar(url, id, removeItem) {
	var alreadyExists = document.getElementById(id + "-Taskbar");
	if (removeItem) { alreadyExists.remove(); return; }
	if (alreadyExists != null) return;
	var btn = document.createElement("a");
	btn.id = id + "-Taskbar";
	btn.href = "javascript:void(0);";
	btn.title = windows[id][0]
	var icon = document.createElement("img");
	switch (id) {
		case "about":
			icon.src = "files/img/icon new.svg";
			break;
		case "zombie-zapper":
			icon.src = "files/img/zmb.svg";
			break;
		case "snake":
			icon.src = "files/img/snake.svg";
			break;
		case "bad-piggies":
			icon.src = "files/img/bad-piggies.png";
			break;
		case "sonic-mania":
			icon.src = "files/img/sonic-mania.png";
			break;
		case "celeste-wasm":
			icon.src = "/celeste-wasm/assets/app.ico";
			break;
		default:
			icon.src = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`;
			break;
	}
	icon.setAttribute("onclick", `showWindow("${id}")`);
	icon.style.width = "48px";
	btn.appendChild(icon);
	taskbar.appendChild(btn);
}