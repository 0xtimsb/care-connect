import styled from 'styled-components';

interface ButtonProps {
  disabled?: boolean;
  colored?: boolean;
}

const Button = styled.button<ButtonProps>`
  outline: 0;
  border: 0;
  padding: 0px 10px;

  color: ${p => p.theme.colors.text.invert};
  border-radius: ${p => p.theme.radius.sm};
  background-color: ${p => p.colored ? p.theme.colors.secondary.main : p.theme.colors.primary.main};
  font-size: ${p => p.theme.font.size.sm};
  font-weight: ${p => p.theme.font.weight.normal};

  width: 100%;
  height: 44px;

  ${p => p.disabled && `
      opacity: 0.8;
      cursor: not-allowed;
    `
  };

  ${p => !p.disabled && `
      &:hover {
        cursor: pointer;
      }
    `
  };
`;

export default Button;