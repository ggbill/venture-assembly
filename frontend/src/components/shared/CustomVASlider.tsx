// import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import React from 'react'
import { ThemeProvider } from "@material-ui/styles"
import { createMuiTheme } from '@material-ui/core/styles'

// const VASlider = createMuiTheme({
// 	overrides: {
// 		MuiSlider: {
// 			root: {
// 				color: '#DA4167',
// 				height: 8,
// 			},
// 			thumb: {
// 				height: 24,
// 				width: 24,
// 				backgroundColor: '#fff',
// 				border: '2px solid currentColor',
// 				marginTop: -8,
// 				marginLeft: -12,
// 				'&:focus, &:hover, &$active': {
// 					boxShadow: 'inherit',
// 				},
// 			},
// 			active: {},
// 			valueLabel: {
// 				left: 'calc(-50% + 4px)',
// 			},
// 			track: {
// 				height: 8,
// 				borderRadius: 4,
// 			},
// 			rail: {
// 				height: 8,
// 				borderRadius: 4,
// 			}
// 		}
// 	}
// })

const CustomVASlider = (props) => {

	const VASlider = createMuiTheme({
		overrides: {
			MuiSlider: {
				root: {
					// color: props.color,
					// // color: '#DA4167',
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

	return (
		<ThemeProvider theme={VASlider}>
			<Slider
				{...props}
				style={{color: props.color}}
			/>
		</ThemeProvider>
	);
}

export default CustomVASlider