'use client';

import { useEffect, useRef, useState } from 'react';

export function useTypewriter(text: string, speed = 45, startDelay = 0) {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      const tick = () => {
        if (i <= text.length) {
          setOutput(text.slice(0, i));
          i += 1;
          timeout = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);

  return { output, done };
}

export function useTypewriterLines(lines: string[], speed = 40, linePause = 500) {
  const [currentLine, setCurrentLine] = useState(0);
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    let lineIdx = 0;
    let charIdx = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        setOutput(line.slice(0, charIdx));
        charIdx += 1;
        timeout = setTimeout(tick, speed);
      } else {
        setCurrentLine(lineIdx);
        lineIdx += 1;
        charIdx = 0;
        timeout = setTimeout(tick, linePause);
      }
    };
    tick();

    return () => clearTimeout(timeout);
  }, [lines, speed, linePause]);

  return { currentLine, output, done };
}
