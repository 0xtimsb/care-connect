import styled from 'styled-components';

interface HeaderProps { }

const Header = styled.div<HeaderProps>`
	display: flex;
	justify-content: center;
	align-items: center;

	height: 35px;
	width: 100%;

	color: ${(p) => p.theme.colors.text.primary};
	font-size: ${(p) => p.theme.font.size.xl};
	font-weight: ${(p) => p.theme.font.weight.bold};
	text-align: center;
`;

export default Header;
