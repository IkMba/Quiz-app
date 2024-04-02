function NextButton({ dispatch, index }) {
  if (index === 14)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );

  return (
    <>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "prevQuestion" })}
      >
        Prev
      </button>
    </>
  );
}

export default NextButton;
