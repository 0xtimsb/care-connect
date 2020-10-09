import styled, { css } from 'styled-components';

interface LabelProps {
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
}

const Label = styled.label<LabelProps>`
	${p => p.mt && css`margin-top: ${p.mt};`}
	${p => p.ml && css`margin-left: ${p.ml};`}
	${p => p.mr && css`margin-right: ${p.mr};`}
	${p => p.mb && css`margin-bottom: ${p.mb};`}
`;

export default Label;
