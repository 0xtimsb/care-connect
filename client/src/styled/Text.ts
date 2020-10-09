import styled from 'styled-components';
import get from 'lodash/get';

interface TextProps {
  color: string;
  size: string;
}

const Text = styled.div<TextProps>`
  color: ${p => p.color && get(p.theme.colors, p.color)};
  font-size: ${p => p.size && get(p.theme.font.size, p.size)};
`;

export default Text;