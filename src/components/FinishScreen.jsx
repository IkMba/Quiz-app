function FinishScreen({ dispatch, points, totalPoints, highscore }) {
  return (
    <div>
      <p className="result">
        You scored {points} out of {totalPoints}
      </p>
      <p>{highscore}</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
