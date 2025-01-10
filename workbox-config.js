module.exports = {
	maximumFileSizeToCacheInBytes: 5000000000,
	globDirectory: 'WINRARisyou.github.io/',
	globPatterns: [
		'**/*.{css,html,svg,png,js}'
	],
	swDest: 'WINRARisyou.github.io/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
