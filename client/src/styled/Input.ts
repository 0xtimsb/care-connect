import styled from 'styled-components';

interface InputProps {
}

const Input = styled.input<InputProps>`
	outline: 0;
	height: 40px;
	width: 100%;
	padding: 10px;
	transition: border 150ms;

	border-radius: ${p => p.theme.radius.sm};
	border: 1px solid ${p => p.theme.colors.border.main};
  color: ${p => p.theme.colors.text.primary};
	background-color: ${p => p.theme.colors.primary.main};
	font-size: ${p => p.theme.font.size.sm};
	&:hover {
		border-color: ${p => p.theme.colors.border.dark};
	}
	&:focus {
		border-color: ${p => p.theme.colors.secondary.main};
	}
`;

export default Input;
