import styled from 'styled-components';

interface SubHeader { }

const SubHeader = styled.div`
	display: flex;
	align-items: center;

	height: 16px;
	width: 100%;

	color: ${(props) => props.theme.colors.text.secondary};
	font-size: ${(p) => p.theme.font.size.xxs};
	font-weight: ${(p) => p.theme.font.weight.bold};
`;

export default SubHeader;
