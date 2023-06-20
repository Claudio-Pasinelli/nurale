import styled from 'styled-components';

interface Props {
  backgroundColor?: string;
  color?: string;
  width?: number;
  cursor?: string;
  padding?: string;
  borderRadius?: string;
}

const Button = styled.button<Props>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#4f46e5'};
  color: ${({ color }) => color || 'white'};
  width: ${({ width }) => (width ? `${width}px` : 'fit-content')};
  cursor: ${({ cursor }) => cursor || 'pointer'};
  padding: ${({ padding }) => (padding ? `${padding}px` : '5px')};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : '5px')};
`;

export default Button;
