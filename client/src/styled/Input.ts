import styled, { css } from 'styled-components';

interface InputProps {
	mt?: string;
	mb?: string;
	ml?: string;
	mr?: string;
}

const Input = styled.input<InputProps>`
	outline: 0;
	height: 40px;
	width: 100%;
	padding: 10px;
	transition: border 150ms;
	border-radius: 3px;
	font-size: 16px;

	${p => p.mt && css`margin-top: ${p.mt};`}
	${p => p.ml && css`margin-left: ${p.ml};`}
	${p => p.mr && css`margin-right: ${p.mr};`}
	${p => p.mb && css`margin-bottom: ${p.mb};`}

	border: 1px solid ${p => p.theme.colors.border.main};
  color: ${p => p.theme.colors.text.primary};
	background-color: ${p => p.theme.colors.primary.main};
	&:hover {
		border-color: ${p => p.theme.colors.hover};
	}
	&:focus {
		border-color: ${p => p.theme.colors.focus};
	}
`;

export default Input;
