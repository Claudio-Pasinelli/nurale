import styled from 'styled-components';

interface Props {
  height?: string;
  width?: string;
  display?: string;
}

const Flex = styled.div<Props>`
  width: ${({ width }) => width || 'fit-content'};
  height: ${({ height }) => height || 'fit-content'};
  display: ${({ display }) => display || 'block'};
`;

export default Flex;
