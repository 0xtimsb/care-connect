import styled from 'styled-components';


const Button = styled.button`
  outline: 0;
  border: 0;
  padding: 0px 10px;

  color: ${p => p.theme.colors.text.primary};

  background-color: ${p => p.theme.colors.main};
  font-size: 16px;
  border-radius: 3px;

  width: 100%;
  height: 44px;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;