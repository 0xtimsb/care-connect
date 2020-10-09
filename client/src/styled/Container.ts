import styled from 'styled-components';

export interface ContainerProps {
  h?: string;
  w?: string;
  m?: string;
  p?: string;
  z?: number;
  flex?: string;
  justify?: string;
  align?: string;
}

const Container = styled.div<ContainerProps>`
  width: ${p => p.w ? p.w : '100%'};
  height: ${p => p.h ? p.h : 'min-content'};
  ${p => p.m && `margin: ${p.m}`};
  ${p => p.p && `padding: ${p.p}`};
  ${p => p.z && `z-index: ${p.z}`};
  ${p => p.flex && `
    display: flex;
    flex-direction: ${p.flex};
  `}
  ${p => p.justify && `justify-content: ${p.justify}`};
  ${p => p.align && `align-items: ${p.align}`};
`;

export default Container;