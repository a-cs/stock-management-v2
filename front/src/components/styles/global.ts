import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	/* roboto-latin-400-normal */
	@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-display: swap;
	font-weight: 400;
	src: url(node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff2) format('woff2'), url(node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff) format('woff');
	unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
	}

	/* roboto-latin-500-normal */
	@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-display: swap;
	font-weight: 500;
	src: url(node_modules/@fontsource/roboto/files/roboto-latin-500-normal.woff2) format('woff2'), url(node_modules/@fontsource/roboto/files/roboto-latin-500-normal.woff) format('woff');
	unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
	}

	/* roboto-latin-700-normal */
	@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-display: swap;
	font-weight: 700;
	src: url(node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff2) format('woff2'), url(node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff) format('woff');
	unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
	}

	/* roboto-latin-900-normal */
	@font-face {
	font-family: 'Roboto';
	font-style: normal;
	font-display: swap;
	font-weight: 900;
	src: url(node_modules/@fontsource/roboto/files/roboto-latin-900-normal.woff2) format('woff2'), url(node_modules/@fontsource/roboto/files/roboto-latin-900-normal.woff) format('woff');
	unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
	}

	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	:focus{
		outline: 0;
	}
	
	body {
		background: ${(props) => props.theme.background};
		color: ${(props) => props.theme.text};
	}
	
	body, input, textarea, button{
		font-family: "Roboto", sans-serif;
		font-weight: 400;
		font-size: 1rem;
		}
		
	a{
		text-decoration: none;
		color: ${(props) => props.theme.text};
	}
`
