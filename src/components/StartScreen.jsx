function StartScreen({ dispatch, status }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz</h2>
      <h3>questions questions to test your knowledge</h3>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
