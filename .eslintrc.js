module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: ["prettier"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": ["error"],
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		indent: ["error", 2],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
