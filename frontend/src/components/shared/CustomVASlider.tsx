// import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import React from 'react'
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from '@material-ui/core/styles'

const VASlider = createMuiTheme({
	overrides: {
		MuiSlider: {
			root: {
				color: '#DA4167',
				height: 8,
			},
			thumb: {
				height: 24,
				width: 24,
				backgroundColor: '#fff',
				border: '2px solid currentColor',
				marginTop: -8,
				marginLeft: -12,
				'&:focus, &:hover, &$active': {
					boxShadow: 'inherit',
				},
			},
			active: {},
			valueLabel: {
				left: 'calc(-50% + 4px)',
			},
			track: {
				height: 8,
				borderRadius: 4,
			},
			rail: {
				height: 8,
				borderRadius: 4,
			}
		}
	}
})

// const VASlider = withStyles({
// 	root: {
// 		color: '#DA4167',
// 		height: 8,
// 	},
// 	thumb: {
// 		height: 24,
// 		width: 24,
// 		backgroundColor: '#fff',
// 		border: '2px solid currentColor',
// 		marginTop: -8,
// 		marginLeft: -12,
// 		'&:focus, &:hover, &$active': {
// 			boxShadow: 'inherit',
// 		},
// 	},
// 	active: {},
// 	valueLabel: {
// 		left: 'calc(-50% + 4px)',
// 	},
// 	track: {
// 		height: 8,
// 		borderRadius: 4,
// 	},
// 	rail: {
// 		height: 8,
// 		borderRadius: 4,
// 	},
// })(Slider);


const CustomVASlider = (props) => {
	return (
		<ThemeProvider theme={VASlider}>
			<Slider
				// key={new Date().getTime()}
				{...props}
			/>
		</ThemeProvider>

		// <VASlider
		// 	key={new Date().getTime()}
		// 	{...props}
		// />
	);
}

export default CustomVASlider