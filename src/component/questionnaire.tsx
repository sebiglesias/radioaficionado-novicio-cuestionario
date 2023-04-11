import { useState } from 'react';
import Question from 'types';
import styles from '../styles/Home.module.css';

type QuestionnaireProps = {
    rawQuestions: Question[]
    withResult: boolean
}

export default function Questionnaire({rawQuestions, withResult}: QuestionnaireProps) {
    const [questions, setQuestions] = useState<Question[]>(rawQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState<number[] | null>(null);
    const [userAnswers, setUserAnswers] = useState<{
        [key: number]: number[] | null;
    }>({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<boolean[]>([]);
    const [confirm, setConfirm] = useState(false);


    async function loadQuestions() {
        setQuestions(questions);
        setCurrentQuestionIndex(0);
        setSelectedAnswerIndexes(null);
        setUserAnswers([]);
        setShowResult(false);
        setConfirm(false)
        setResult([])
        setSelectedAnswerIndexes(null)
    }

    function handleAnswerClick(answerIndex: number) {
        if (selectedAnswerIndexes === null) {
            setSelectedAnswerIndexes([answerIndex])
        } else {
            if (selectedAnswerIndexes.indexOf(answerIndex) === -1) {
                setSelectedAnswerIndexes([...selectedAnswerIndexes, answerIndex])
            } else {
                selectedAnswerIndexes.length === 1 ? setSelectedAnswerIndexes(null) :
                setSelectedAnswerIndexes(selectedAnswerIndexes.filter((item) => item !== answerIndex))
            }
        }
    }

    function confirmChoices(){
        setUserAnswers((prevAnswers) => {
            return {
                ...prevAnswers,
                [currentQuestionIndex]: selectedAnswerIndexes
            }
        })
        setConfirm(true)
        setResult((prevState) => [...prevState, selectedAnswerIndexes !== null && JSON.stringify(questions[currentQuestionIndex].correctAnswer.sort()) === JSON.stringify(selectedAnswerIndexes?.sort())])
    }

    function handleNextQuestion() {
        setConfirm(false)
        setSelectedAnswerIndexes(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }

    function handleShowResult() {
        setShowResult(true);
    }

    function getScore(): number {
        return result.reduce((score, res) => {
            return res ? score + 1 : score;
        }, 0);
    }

    function isCorrect(index: number) {
        return userAnswers[index] !== null && questions[currentQuestionIndex].correctAnswer.sort() === userAnswers[index]?.sort()
    }

    function buttonClass(index: number) {
        // The answer is selected
        if (selectedAnswerIndexes !== null && selectedAnswerIndexes.indexOf(index) !== -1) {
            // the user has confirmed
            if (confirm) {
                // the answer can either be correct or incorrect
                return questions[currentQuestionIndex].correctAnswer.indexOf(index) !== -1 ? styles.correct : styles.incorrect
            } else {
                // the user has not confirmed but has selected it
                return styles.checked
            }
        } else {
            // the answer is not selected
            if (confirm) {
                return questions[currentQuestionIndex].correctAnswer.indexOf(index) !== -1 ? styles.correct : styles.gray
            } else {
                return ''
            }
        }
    }

    return (
        <div className={styles.container}>
            {!questions.length && <button onClick={loadQuestions}>Start Quiz</button>}
            {!!questions.length && (
                <>
                    <h1 className={styles.title}>{questions[currentQuestionIndex].question}</h1>
                    {selectedAnswerIndexes !== null && isCorrect(currentQuestionIndex) && (
                        <h2 className={styles.questionNumber}>
                            Has contestado correctamente
                        </h2>
                    )
                    }
                    <div className={styles.answers}>
                        {questions[currentQuestionIndex].answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`${styles.answer} ${buttonClass(index)}`}
                                disabled={confirm}
                                onClick={() => handleAnswerClick(index)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    {!confirm && (
                        <button
                            className={`${styles.button} ${selectedAnswerIndexes === null ? styles.disabled : ''}`}
                            onClick={confirmChoices}
                            disabled={selectedAnswerIndexes === null}
                        >
                            Confirmar
                        </button>
                    )}
                    {confirm && !showResult && (
                        <button
                            className={`${styles.button} ${selectedAnswerIndexes === null ? styles.disabled : ''}`}
                            onClick={() =>
                                currentQuestionIndex === questions.length - 1 ? handleShowResult() : handleNextQuestion()
                            }
                            disabled={selectedAnswerIndexes === null}
                        >
                            {withResult && currentQuestionIndex === questions.length - 1 ? 'Mostrar resultado' : 'Siguiente pregunta'}
                        </button>
                    )}
                    {withResult && showResult && (
                        <>
                            <h2 className={styles.result}>
                                Tu puntaje es {getScore()} de {questions.length}
                            </h2>
                            <button className={styles.button} onClick={loadQuestions}>
                                Probar de nuevo
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}