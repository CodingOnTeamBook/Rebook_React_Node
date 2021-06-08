import React from 'react';
import styled from 'styled-components';

//컬러팔레트랑 폰트 캡쳐해놓고 작업하면 좋을 것 같아요. 확인하시고 지우셔도 됩니다!!

const Container = styled.div`
  width: 100%;
  div {
    height: 2rem;
  }
  .yellow {
    background-color: ${(props) => props.theme.palette.yellow};
  }
  .green {
    background-color: ${(props) => props.theme.palette.green};
  }
  .white {
    background-color: ${(props) => props.theme.palette.white};
  }
  .black {
    background-color: ${(props) => props.theme.palette.black};
    color: white;
  }
  .lightgreen {
    background-color: ${(props) => props.theme.palette.lightgreen};
  }
  .darkgreen {
    background-color: ${(props) => props.theme.palette.darkgreen};
  }
  .gray {
    background-color: ${(props) => props.theme.palette.gray};
  }
`;

function LandingPage() {
  return (
    <>
      <div>LandingPage</div>
      <h1>h1입니다.</h1>
      <h2>h2입니다</h2>
      <h3>h3입니다</h3>
      <h4>h4입니다</h4>
      <h5>h5입니다</h5>
      <h6>h6입니다</h6>
      <p>p입니다</p>
      <span>span입니다</span>
      <h3>컬러팔레트 확인</h3>
      <Container>
        <div className="yellow">yellow</div>
        <div className="green">green</div>
        <div className="white">white</div>
        <div className="black">black</div>
        <div className="lightgreen">lightgreen</div>
        <div className="darkgreen">darkgreen</div>
        <div className="gray">gray</div>
      </Container>
    </>
  );
}

export default LandingPage;
