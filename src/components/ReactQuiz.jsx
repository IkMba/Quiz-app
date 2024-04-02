import { useEffect, useReducer } from "react";
import Header from "../components/Header";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";
import Progress from "./Progress";
import Timer from "./Timer";

const initialState = {
  questions: [],
  index: 0,
  status: "",
  error: "",
  answer: "",
  points: 0,
  highscore: 0,
  time: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "loaded":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return { ...state, status: "start", time: state.questions.length * 30 };
    case "error":
      return { ...state, error: action.payload, status: "error" };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: "",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "prevQuestion":
      return { ...state, index: state.index - 1 };
    case "timer":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finished" : "start",
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
  }
}

function ReactQuiz() {
  const [
    { questions, status, index, answer, points, highscore, time },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "loaded", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: "Could not load questions" });
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      {status === "ready" && (
        <StartScreen dispatch={dispatch} status={status} />
      )}
      {status === "start" && (
        <div className="ff">
          <Progress
            totalPoints={totalPoints}
            numQuestions={numQuestions}
            index={index}
            points={points}
            answer={answer}
          />
          <Timer dispatch={dispatch} time={time} />
        </div>
      )}
      {status === "start" && (
        <Questions
          question={questions[index]}
          dispatch={dispatch}
          answer={answer}
        />
      )}
      {status === "start" && answer !== "" && (
        <NextButton dispatch={dispatch} index={index} />
      )}
      {status === "finished" && (
        <FinishScreen
          dispatch={dispatch}
          points={points}
          totalPoints={totalPoints}
          highscore={highscore}
        />
      )}
    </div>
  );
}

export default ReactQuiz;
