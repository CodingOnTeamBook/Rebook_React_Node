import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin: 30px 0;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: default;

  h2 {
    margin-top: 26px;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ItemContainer = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 280px;
  margin: 0 16px;
  cursor: pointer;

  img {
    width: 200px;
    height: 280px;
    object-fit: cover;
    box-shadow: 0 8px 12px ${(props) => props.theme.palette.gray};
  }

  .description {
    border-radius: 10px;
    position: absolute;
    bottom: 20px;
    background: rgba(0, 0, 0, 0.75);
    width: 80%;
    transition: .5s ease;
    opacity: 0;
    padding: 20px;
    color: rgba(200, 200, 200);
    text-align: center;
    font-size: 15px;
    color: ${(props) => props.theme.palette.yellow};
  }

  &:hover .description {
    transform: translateY(10%);
    opacity: 1;
  }
}`;

export { Container, Header, Main, ItemContainer };
