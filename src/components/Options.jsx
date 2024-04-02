function Options({ dispatch, answer, question }) {
  const hasAnswered = answer !== "";
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          onClick={() => {
            dispatch({ type: "newAnswer", payload: i });
          }}
          className={`btn-option btn  ${
            hasAnswered ? (i === question.correctOption ? "correct" : "") : ""
          } ${i === answer ? "answer" : ""} ${
            i === answer && i !== question.correctOption ? "wrong" : ""
          }`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
