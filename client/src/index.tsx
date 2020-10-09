import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';

// Import CSS.
import 'normalize.css';

// Import theme.
import theme from './theme';

// Import components.
import App from './components/App/App';

render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);
