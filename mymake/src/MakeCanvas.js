import React, { useRef, useEffect, useState } from "react";
import MovingRectangle from "./CanvasWithStaffLines";

const MakeCanvas = (val) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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

        ctx.strokeStyle = i >= 6 && i <= 10 ? "#000" : "#F5F5F5"; // 위쪽 5개 선은 검은색, 아래쪽 선은 회색
        ctx.lineWidth = 2; // 오선의 두께
        ctx.stroke();

        const centerX = canvas.width / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.strokeStyle = "#009900"; // 세로선 색상은 검은색
        ctx.lineWidth = 2; // 세로선의 두께
        ctx.stroke();
      }
    };

    const timers = [];
    const myFunction = (value) => {
      const rectangle = <MovingRectangle value={value} />;
      setRectangles((prevRectangles) => [...prevRectangles, rectangle]);
      console.log(value);
    };

    let ToneStart = 0;
    let curIdx = 0;
    const Tone = (val, idx) => {
      ToneStart = 1;
      let last = 0;
      for (let i = 0; i < idx; i++) {
        last = val.val[i].start;
      }

      for (let i = idx; i < val.val.length; i++) {
        const value = val.val[i];
        timers.push(
          setTimeout(() => {
            if (value.note != -1) {
              curIdx = i + 1;
              myFunction(value);
            }
          }, value.start - last)
        );
      }
    };

    const clearAll = () => {
      ToneStart = 0;
      timers.forEach((t) => {
        clearTimeout(t);
      });
      timers.length = 0;
    };
    document.querySelector("#startBtn").onclick = function () {
      console.log(ToneStart);
      if (ToneStart == 0) Tone(val, curIdx);
    };

    document.querySelector("#stopBtn").onclick = function () {
      clearAll();
    };
    // 초기에 오선 그리기
    drawStaffLines();
  }, []);

  return (
    <div>
      {rectangles.map((rectangle, index) => (
        <div key={index}>{rectangle}</div>
      ))}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black" }}
      />
      <button id="startBtn"> 시작 </button>
      <button id="stopBtn"> 정지 </button>
    </div>
  );
};

export default MakeCanvas;
