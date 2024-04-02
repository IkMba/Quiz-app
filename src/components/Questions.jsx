import Options from "./Options";

function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Options dispatch={dispatch} question={question} answer={answer} />
    </div>
  );
}

export default Questions;
