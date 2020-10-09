import styled from 'styled-components';

interface SpacingProps {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  inline?: string;
}

const Spacing = styled.div<SpacingProps>`
  ${p => p.top && `margin-top: ${p.top}`};
  ${p => p.right && `margin-right: ${p.right}`};
  ${p => p.bottom && `margin-bottom: ${p.bottom}`};
  ${p => p.left && `margin-left: ${p.left}`};
  ${p => p.inline && `display: inline-block`};
`;

export default Spacing;