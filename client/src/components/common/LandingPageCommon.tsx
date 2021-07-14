import styled from 'styled-components';

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

  h3 {
    margin-top: 26px;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  height: 100%;
  width: 100%;
`;

const ItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin: 0 16px;
  background-color: ${(props) => props.theme.palette.white};
  box-shadow: 0 8px 12px ${(props) => props.theme.palette.gray};
  cursor: pointer;

  img {
    height : 200px;
    box-shadow: 0 12px 16px ${(props) => props.theme.palette.gray};
  }

  .description {
    position: absolute;
    bottom: 0;
    background: ${(props) => props.theme.palette.yellow};
    width: 100%;
    transition: .5s ease;
    opacity: 0;
    padding: 20px;
    text-align: center;
  }

  &:hover .description {
    opacity: 1;
  }
}`;

export { Container, Header, Main, ItemContainer };
