import styled from 'styled-components';

interface OverlayProps {
  transparency?: string;
}

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-color: rgba(
    0,
    0,
    0,
    ${p => (p.transparency ? p.transparency : '0.8')}
  );
`;

export default Overlay;
