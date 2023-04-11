import React, {useState} from 'react'
import Question from "types";
import {parseCsv} from "lib/parseCsv";
import styles from '../../styles/Home.module.css';
import Questionnaire from "@/component/questionnaire";
import {ButtonLink} from "@/pages";

export function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export default function Reglamentacion() {
    const [questions, setQuestions] = useState<Question[]>([]);

    async function loadQuestions() {
        // randomize order of questions
        setQuestions(shuffleArray<Question>(await parseCsv("/reglamentacion.csv")))
    }

    return (
        <div className={styles.container}>
            <ButtonLink href={'/'} text={'Volver a menu inicial'} />
            {!questions.length && <div className={styles.container}>
                <h1>Banco de preguntas Reglamentación</h1>
                <button className={styles.button} onClick={loadQuestions}>Comenzar</button>
            </div>}
            {!!questions.length && <Questionnaire rawQuestions={questions} withResult={true} /> }
        </div>
    )
}