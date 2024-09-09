import React, { useState } from "react";
import './App.css';  // 추가 스타일을 위한 CSS 파일

function WebtoonGame() {
  const baseIncome = 800000; // 기본 월급 800,000원
  const [tapCount, setTapCount] = useState(0);
  const [episodeCount, setEpisodeCount] = useState(0); // 에피소드 카운트 (한 달에 4번의 에피소드)
  const [income, setIncome] = useState(baseIncome); // 기본 수익
  const [totalIncome, setTotalIncome] = useState(0); // 이번 달 총 수입
  const [popularity, setPopularity] = useState(0); // 인기도 (에피소드마다 상승)
  const [illegalReductionPercentage, setIllegalReductionPercentage] = useState(0); // 불법 웹툰으로 인한 감소율 (처음엔 0%)
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태
  const [currentMonth, setCurrentMonth] = useState(1); // 1월부터 시작
  const [showModal, setShowModal] = useState(false); // 월말 모달 상태
  const [title, setTitle] = useState("웹툰 작가 지망생"); // 기본 호칭
  const [showStory, setShowStory] = useState(true); // 스토리 모달 상태
  const maxTaps = 10;
  const fixedExpenses = 800000; // 고정 지출
  const episodesPerMonth = 4; // 한 달에 4개의 에피소드
  const monthsInYear = 12; // 1년은 12개월

  // 숫자 포맷 함수 (쉼표와 '원' 단위 추가)
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} 원`;
  };

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

  // 호칭 변경
  const updateTitle = () => {
    if (popularity >= 50) {
      setTitle("인기작가");
    } else if (popularity >= 30) {
      setTitle("중급작가");
    } else if (popularity >= 15) {
      setTitle("초보작가");
    } else {
      setTitle("웹툰 작가 지망생");
    }
  };

  // 수익 증가 계산 (1년이 지난 후)
  const calculateIncomeIncrease = () => {
    if (currentMonth > monthsInYear) {
      let increasedIncome = baseIncome;
      if (title === "초보작가") {
        increasedIncome *= 1.1; // 10% 증가
      } else if (title === "중급작가") {
        increasedIncome *= 1.25; // 25% 증가
      } else if (title === "인기작가") {
        increasedIncome *= 1.5; // 50% 증가
      }
      setIncome(increasedIncome);
    }
  };

  // 에피소드 완료 처리
  const completeEpisode = () => {
    const newPopularity = popularity + 1;
    setPopularity(newPopularity);

    // 한화가 제작될 때마다 수익 감소율 3%씩 증가
    const newIllegalReductionPercentage = illegalReductionPercentage + 0.03;
    setIllegalReductionPercentage(newIllegalReductionPercentage);

    const reducedIncome = Math.floor(income * (1 - newIllegalReductionPercentage));
    setTotalIncome(totalIncome + reducedIncome);
    updateTitle(); // 호칭 업데이트

    alert(`한 화 제작 완료! 이번 에피소드 수익: ${formatCurrency(reducedIncome)} (감소율: ${(newIllegalReductionPercentage * 100).toFixed(1)}%)`);

    // 에피소드 카운트 증가
    setEpisodeCount(episodeCount + 1);

    // 한 달이 지나가는 조건 (4번의 에피소드가 완료되면 한 달이 지나감)
    if (episodeCount + 1 >= episodesPerMonth) {
      endOfMonth();
    }

    resetGame(); // 게임 상태 초기화
  };

  // 월말 처리
  const endOfMonth = () => {
    setTotalIncome(totalIncome - fixedExpenses); // 고정 지출 차감
    setShowModal(true); // 모달 띄우기
    setTimeout(() => setShowModal(false), 2000); // 2초 후 모달 사라짐
    setCurrentMonth(currentMonth + 1); // 다음 달로 변경
    setEpisodeCount(0); // 에피소드 카운트 초기화
    calculateIncomeIncrease(); // 수익 증가 반영 (1년 지나면)
  };

  // 게임 상태 초기화
  const resetGame = () => {
    setTapCount(0);
    setIncome(baseIncome);
  };

  // 스토리 모달 닫기
  const closeStory = () => {
    setShowStory(false);
  };

  return (
    <div className="game-container">
      {showStory && (
        <div className="story-modal">
          <h2>게임 스토리</h2>
          <p>서울로 인기 웹툰 작가가 되기 위해 상경한 '나', 웹툰 작가가 되기 위해 만화 제작을 연습하겠어! 간단한 작화 알바부터 시작하자!</p>
          <p>게임 목표: "웹툰을 그리고 인기를 얻어 인기 작가가 되보자!"</p>
          <button onClick={closeStory}>시작하기</button>
        </div>
      )}

      {!showStory && (
        <>
          <header>
            <h1>웹툰 창작자 체험 게임</h1>
            <p>현재 호칭: {title}</p> {/* 호칭 표시 */}
            <p>현재 달: {currentMonth}월</p> {/* 현재 달 표시 */}
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
              <p>이번 에피소드 예상 수익: {formatCurrency(Math.floor(income * (1 - illegalReductionPercentage)))} </p>
              <p>이번 달 총 수입: {formatCurrency(totalIncome)}</p> {/* 쉼표와 '원' 추가 */}
              <p>이번 달 에피소드 완료 횟수: {episodeCount}/{episodesPerMonth}</p> {/* 에피소드 카운트 표시 */}
            </div>

            <div className={`modal ${showModal ? 'visible' : ''}`}>
              <p>월세와 생활비가 통장에서 빠져나갔습니다. (-{formatCurrency(fixedExpenses)})</p>
            </div>
          </main>

          <footer>
            <p>웹툰 한 화를 완성하려면 계속 터치하세요!</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default WebtoonGame;