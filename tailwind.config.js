const plugin = require('tailwindcss/plugin')
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				content: '1100px'
			},
			colors: {
				green: '#5cb85c',
				'green-black': '#499149'
			},
			textColor: {
				green: '#5cb85c',
				'green-black': '#499149'
			},
			backgroundColor: {
				green: '#5cb85c',
				'green-black': '#499149'
			}
		}
	},
	plugins: [
		plugin(({ addUtilities, matchUtilities, theme }) => {
			addUtilities({
				'.input': {
					'box-shadow': '0 0 0 30px white inset'
				}
			})
		})
	]
}
