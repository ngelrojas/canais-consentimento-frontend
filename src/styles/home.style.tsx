import styled, { keyframes } from 'styled-components';
import Divider from '@mui/material/Divider';

export const Sdivider = styled(Divider)`
    color: 1px solid #0038A7!important;
`
const blur = keyframes`
  0% {
    filter: blur(0);
  }
  100% {
    filter: blur(30px);
  }
`;

export const Loading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${blur} 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite alternate;
`;

// const LoadingPage = () => (
//   <Loading>
//     <img src={require('images/loading.gif')} alt="loading" />
//   </Loading>
// );

// export default LoadingPage;
