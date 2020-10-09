import styled from 'styled-components';


const Button = styled.button`
  outline: 0;
  border: 0;
  padding: 0px 10px;

  color: ${p => p.theme.colors.text.invert};
  border-radius: 3px;
  background-color: ${p => p.theme.colors.primary.main};
  font-size: 16px;

  width: 100%;
  height: 44px;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;