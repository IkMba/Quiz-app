import { useEffect } from "react";

function Timer({ time, dispatch }) {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 ? 0 : ""}
      {mins} :{secs < 10 ? 0 : ""}
      {secs}
    </div>
  );
}

export default Timer;
