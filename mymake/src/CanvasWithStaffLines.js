// MovingRectangle.js
import React, { useEffect, useState } from 'react';

const noteplace = [
  262.5,
  256.25,
  250,
  243.75,
  237.5,
  225,
  218.75,
  212.5,
  206.25,
  200,
  193.75,
  188.5
]

const MovingRectangle = (value) => {
  const [x, setX] = useState(800);
  const canvasWidth = 800;
  const canvasHeight = 200;
  const speed = (canvasWidth / 4) / 60; // 3초에 걸쳐 이동할 거리를 60 프레임으로 나눔 (1초당 거리)
  // console.log(value.value.note)
  const notevalue = noteplace[value.value.note] + (4-value.value.octav)*86.5
  const lectangleLenth = value.value.length/5
  useEffect(() => {

    const interval = setInterval(() => {
      setX((prevX) => prevX - speed);
    }, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: notevalue,
        }}
      >
        <span
          style={{
            position: 'absolute',
            zIndex: 1, // 글자가 사각형보다 앞에 나오도록 z-index 설정
            top: +20, // 글자를 사각형 위로 이동
            fontWeight: "bold",
            color: "green"
          }}
        >
          {value.value.lylic}
        </span>
        <div
          style={{
            width: lectangleLenth,
            height: 20,
            border: '1px solid #000', // 사각형 주변에 테두리 추가
            backgroundColor: 'rgba(0, 0, 0, 0)', // 배경을 투명하게 설정
          }}
        />
      </div>
    </div>
  );
};

export default MovingRectangle;
