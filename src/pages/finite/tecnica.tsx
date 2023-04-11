import React, {useState} from 'react'
import Question from "types";
import {parseCsv} from "lib/parseCsv";
import styles from '../../styles/Home.module.css';
import Questionnaire from "@/component/questionnaire";
import {ButtonLink} from "@/pages";
import {shuffleArray} from "@/pages/finite/reglamentacion";

export default function Tecnica() {
    const [questions, setQuestions] = useState<Question[]>([]);

    async function loadQuestions() {
        // randomize order of questions
        setQuestions(shuffleArray<Question>(await parseCsv("/tecnica.csv")))
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