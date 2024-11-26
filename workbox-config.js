module.exports = {
	maximumFileSizeToCacheInBytes: 5000000000,
	globDirectory: 'WINRARisyou.github.io/',
	globPatterns: [
		'**/*.{css,html,svg,png,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
