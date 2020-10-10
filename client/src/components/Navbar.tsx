import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
	width: 100%;
	height: 67px;
	background-color: ${(p) => p.theme.colors.primary.light};
	box-shadow: ${(p) => p.theme.shadows.md};

	display: flex;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 75%;

	display: flex;
	align-items: center;
`;

const Navbar = () => {
	return (
		<Root>
			<Wrapper>
				<h2>Care Connect</h2>
			</Wrapper>
		</Root>
	);
};

export default Navbar;
