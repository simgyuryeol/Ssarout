import React, { useRef, useEffect, useState } from 'react';
import MovingRectangle from './CanvasWithStaffLines';

const MakeCanvas = (val) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 캔버스 크기 조정
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const drawStaffLines = () => {
      // 오선 그리기
      const lineCount = 16;
      const lineHeight = canvas.height / lineCount;
      for (let i = 0; i < lineCount; i++) {
        const y = i * lineHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);

        ctx.strokeStyle = (i >= 6 && i <= 10) ? '#000' : '#F5F5F5'; // 위쪽 5개 선은 검은색, 아래쪽 선은 회색
        ctx.lineWidth = 2; // 오선의 두께
        ctx.stroke();

        const centerX = canvas.width / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.strokeStyle = '#009900'; // 세로선 색상은 검은색
        ctx.lineWidth = 2; // 세로선의 두께
        ctx.stroke();
      }
    };

    const myFunction = (value) => {
      const rectangle = <MovingRectangle value={value}/>;
      setRectangles((prevRectangles) => [...prevRectangles, rectangle]);
      console.log(value)

    };

    const Tone = (val) => {
      val.val.forEach((value, index) => {
        setTimeout(() => {

          if (value.note != -1){
          myFunction(value);}
        }, value.start);
      });
    };
    Tone(val);

    // 초기에 오선 그리기
    drawStaffLines();
  }, []);

  return (
    <div>
      {rectangles.map((rectangle, index) => (
        <div key={index}>{rectangle}</div>
      ))}
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '1px solid black' }} />
    </div>
  );
};

export default MakeCanvas;
