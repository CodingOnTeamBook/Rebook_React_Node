import styled from 'styled-components';
import Button from '@material-ui/core/Button';

// 자주 사용하게 되는 버튼 스타일, Grid 등 공통 스타일 요소 디자인

export const LineGreenBtn = styled(Button)`
  padding: 0.3rem 1rem;
  border: 3px solid ${(props) => props.theme.palette.green};
  color: ${(props) => props.theme.palette.green};
`;
