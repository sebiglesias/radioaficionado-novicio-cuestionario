import React, {useState} from 'react'
import Question from "types";
import {parseCsv} from "lib/parseCsv";
import styles from '../styles/Home.module.css';
import Questionnaire from "@/component/questionnaire";
import {ButtonLink} from "@/pages/index";

export default function Exam() {
    const [questions, setQuestions] = useState<Question[]>([]);

    async function loadQuestions() {
        const technicalQ = await parseCsv("/tecnica.csv");
        const ruleQ = await parseCsv("/tecnica.csv");
        // randomize order of questions
        setQuestions([...ruleQ.sort(() => Math.random() - 0.5).splice(0, 15),
            ...technicalQ.sort(() => Math.random() - 0.5).splice(0, 15)])
    }
    return (
        <div className={styles.container}>
            <ButtonLink href={'/'} text={'Volver a menu inicial'} />
            {!questions.length && <div className={styles.container}>
                <h1>Simulacro de Examen</h1>
                <h2>Se seleccionarán 15 preguntas del banco de preguntas de la reglamentación y 15 del técnico</h2>
                <button className={styles.button} onClick={loadQuestions}>Comenzar</button>
            </div>}
            {!!questions.length && <Questionnaire rawQuestions={questions} withResult={true} /> }
        </div>
    )
}