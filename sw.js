if (!self.define) {
	let e, i = {};
	const s = (s, f) => (s = new URL(s + ".js", f).href, i[s] || new Promise((i => {
		if ("document" in self) {
			const e = document.createElement("script");
			e.src = s, e.onload = i, document.head.appendChild(e)
		} else e = s, importScripts(s), i()
	})).then((() => {
		let e = i[s];
		if (!e) throw new Error(`Module ${s} didn’t register its module`);
		return e
	})));
	self.define = (f, r) => {
		const l = e || ("document" in self ? document.currentScript.src : "") || location.href;
		if (i[l]) return;
		let d = {};
		const n = e => s(e, l),
			a = {
				module: {
					uri: l
				},
				exports: d,
				require: n
			};
		i[l] = Promise.all(f.map((e => a[e] || n(e)))).then((e => (r(...e), d)))
	}
}
define(["workbox-3452bdde"], (function (e) {
	"use strict";
	self.addEventListener("message", (e => {
		e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting()
	})), e.precacheAndRoute([
		{
			url: "files/css/style.css",
			revision: "15e1f69291e5d2c91eceb62a4a2ab83d"
		},
		{
			url: "files/html/about_me.html",
			revision: "533d446023b153cd78e267b9afe17d12"
		},
		{
			url: "files/html/Exit Path Stage Creator.html",
			revision: "a4fdfede59368207ef5cef05bf7449d2"
		},
		{
			url: "files/html/snake.html",
			revision: "f980884bbb5f8d8cdf330d321f73000b"
		},
		{
			url: "files/html/Zombie Zapper b1.8.html",
			revision: "bbca13161898857040fa2aec04b333c1"
		},
		{
			url: "files/img/add app.svg",
			revision: "375080d9263ad94ef0c76454350cfeff"
		},
		{
			url: "files/img/bad-piggies.png",
			revision: "3493a26b9ee445a4e3bb7fb52464a174"
		},
		{
			url: "files/img/icon new.svg",
			revision: "8a3ec5d3bdd3395e588801a61ed4b1ab"
		},
		{
			url: "files/img/open in new.svg",
			revision: "5b7db9b268ab456e173b8d5186754fdf"
		},
		{
			url: "files/img/snake.svg",
			revision: "ab55a13ddb23d7f7bea4f905d9fcd79c"
		},
		{
			url: "files/img/sonic-mania.png",
			revision: "2bb31c63aeda7c6d9c3032d1de84efe5"
		},
		{
			url: "files/img/wallpaper.png",
			revision: "fa803e76d0c12dec0ae493924fe0f88f"
		},
		{
			url: "files/img/zmb.svg",
			revision: "796beb130c9d7bfe62f2049f501dff86"
		},
		{
			url: "files/script/script.js",
			revision: "8adb2700952788396d77963eea80f46d"
		},
		{
			url: "files/script/snake.js",
			revision: "820a0ab0893e7469423a7fbd3cf3f6e5"
		},
		{
			url: "index.html",
			revision: "6cbc6ee01f5a36247191646c32816714"
		}
	], {
		ignoreURLParametersMatching: [/^utm_/, /^fbclid$/]
	})
}));
//# sourceMappingURL=sw.js.map