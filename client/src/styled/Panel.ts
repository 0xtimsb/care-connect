import styled from 'styled-components';

interface PanelProps {
	width?: string;
	padding?: string;
}

const Panel = styled.div<PanelProps>`
	${p => p.width && `width: ${p.width}`};
	${p => p.padding && `padding: ${p.padding}`};

	background: ${p => p.theme.colors.primary.light};
	border-radius: ${p => p.theme.radius.sm};
	border: 1px solid ${p => p.theme.colors.border.main};
`;

export default Panel;