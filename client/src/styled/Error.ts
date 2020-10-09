import styled from 'styled-components';
import get from 'lodash/get';

interface ErrorProps {
  color?: string;
  size?: string;
}

const Error = styled.div<ErrorProps>`
  color: ${p =>
    p.color ? get(p.theme.colors, p.color) : p.theme.colors.error.main};
  font-size: ${p =>
    p.size ? get(p.theme.font.size, p.size) : p.theme.font.size.sm};
`;

export default Error;