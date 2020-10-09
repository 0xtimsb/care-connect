import styled from 'styled-components';

const Panel = styled.div`
	background: ${p => p.theme.colors.primary.light};
	border: 1px solid ${p => p.theme.colors.border.main};
	border-radius: 5px;
`;

export default Panel;