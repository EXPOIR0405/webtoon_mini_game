import React, { useState } from "react";
import './App.css';  // 추가 스타일을 위한 CSS 파일

function WebtoonGame() {
  const baseIncome = 800000; // 기본 월급 800,000원
  const [tapCount, setTapCount] = useState(0);
  const [income, setIncome] = useState(baseIncome); // 기본 수익
  const [totalIncome, setTotalIncome] = useState(0); // 이번 달 총 수입
  const [popularity, setPopularity] = useState(0); // 인기도 (에피소드마다 상승)
  const [illegalReductionPercentage, setIllegalReductionPercentage] = useState(0.1); // 불법 웹툰으로 인한 감소율 (처음엔 10%)
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태
  const maxTaps = 10;

  // 터치 이벤트 처리
  const handleTap = () => {
    if (tapCount < maxTaps) {
      setTapCount(tapCount + 1);
      setIsAnimating(true); // 애니메이션 시작
      setTimeout(() => setIsAnimating(false), 300); // 300ms 후 애니메이션 종료
      
      if (tapCount + 1 === maxTaps) {
        completeEpisode();
      }
    }
  };

  // 에피소드 완료 처리
  const completeEpisode = () => {
    const newPopularity = popularity + 1;
    setPopularity(newPopularity);
    const newIllegalReductionPercentage = 0.1 + newPopularity * 0.05;
    setIllegalReductionPercentage(newIllegalReductionPercentage);
    const reducedIncome = Math.floor(income * (1 - newIllegalReductionPercentage));
    setTotalIncome(totalIncome + reducedIncome);
    alert(`에피소드 완료! 이번 에피소드 수익: ₩${reducedIncome} (감소율: ${(newIllegalReductionPercentage * 100).toFixed(1)}%)`);
    resetGame();
  };

  // 게임 상태 초기화
  const resetGame = () => {
    setTapCount(0);
    setIncome(baseIncome);
  };

  return (
    <div className="game-container">
      <header>
        <h1>웹툰 창작자 체험 게임</h1>
        <p>터치 {maxTaps}번으로 웹툰 한 화를 완성하세요!</p>
      </header>

      <main>
        <div className="tap-area" onClick={handleTap}>
          <img src="/images/pencil1.png" alt="pencil"
            className={`pencil-image ${isAnimating ? 'animate' : ''}`}
          />
          <h2>웹툰 작업을 위해 여기를 터치하세요</h2>
        </div>

        <div className="status">
          <p>현재 터치 횟수: {tapCount}/{maxTaps}</p>
          <p>인기도: {popularity}</p>
          <p>불법 웹툰으로 인한 수익 감소율: {(illegalReductionPercentage * 100).toFixed(1)}%</p>
          <p>이번 에피소드 예상 수익: ₩{Math.floor(income * (1 - illegalReductionPercentage))}</p>
          <p>이번 달 총 수입: ₩{totalIncome}</p>
        </div>
      </main>

      <footer>
        <p>웹툰 한 화를 완성하려면 계속 터치하세요!</p>
      </footer>
    </div>
  );
}

export default WebtoonGame;