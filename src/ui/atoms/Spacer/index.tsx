import styled from 'styled-components';

interface Props
{
  height?: string
  width?: string
}

const Flex = styled.div<Props>`
    width: ${ ( { width } ) => width || 'fit-content' };
    height: ${ ( { height } ) => height || 'fit-content' };
  `;
    
export default Flex;
