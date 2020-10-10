import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'styled/Button';

import { eraseCookie } from 'utils/cookie';

const Root = styled.div`
	width: 100%;
	height: 67px;
	background-color: ${(p) => p.theme.colors.primary.light};
	box-shadow: ${(p) => p.theme.shadows.md};

	display: flex;
	justify-content: center;
`;

const Offset = styled.div`
	width: 77%;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ButtonsWrapper = styled.div`
	display: flex;
`;

const ButtonWrapper = styled.div`
	width: 120px;
	margin-left: 10px;
`;

const Navbar = ({ userData, history }: any) => {
	const logout = () => {
		eraseCookie('token');
		history.push('/');
	};

	return (
		<Root>
			<Offset>
				<h2>Care Connect</h2>
				<ButtonsWrapper>
					<ButtonWrapper>
						<Button onClick={logout}>Log Out</Button>
					</ButtonWrapper>
				</ButtonsWrapper>
			</Offset>
		</Root>
	);
};

export default withRouter(Navbar);
