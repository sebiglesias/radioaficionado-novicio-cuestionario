import React, {useState} from 'react'
import Question from "types";
import {parseCsv} from "lib/parseCsv";
import styles from '../../styles/Home.module.css';
import Questionnaire from "@/component/questionnaire";
import {ButtonLink} from "@/pages";

export default function Tecnica() {
    const [questions, setQuestions] = useState<Question[]>([]);

    async function loadQuestions() {
        const questions = await parseCsv("/tecnica.csv");
        // randomize order of questions
        setQuestions(questions.sort(() => Math.random() - 0.5));
    }

    return (
        <div className={styles.container}>
            <ButtonLink href={'/'} text={'Volver a menu inicial'} />
            {!questions.length && <div className={styles.container}>
                <h1>Banco de preguntas Técnica</h1>
                <button className={styles.button} onClick={loadQuestions}>Comenzar</button>
            </div>}
            {!!questions.length && <Questionnaire rawQuestions={questions} withResult={true} /> }
        </div>
    )
}