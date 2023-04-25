import styles from '../styles/Home.module.css';
import {useRouter} from "next/router";
import Link from "next/link";


type ButtonLinkProps = {
    href: string;
    text: string;
};

export const ButtonLink = ({ href, text }: ButtonLinkProps) => {
    return (
        <Link className={styles.button} href={href}>
            {text}
        </Link>
    );
};

export default function Home() {
  const router = useRouter()
  return (
      <div className={styles.homeContainer}>
          <h1 className={styles.title}>Práctica para exámen de radioaficionado novicio</h1>
          <h4 className={styles.title}>Selecciona una opción de lo que desees practicar:</h4>
          <div className={styles.boxedContainer}>
              <h3>15 preguntas aleatorias del banco de preguntas de la reglamentación y otras 15 preguntas técnicas.</h3>
              <ButtonLink href={'/exam'} text={'Simulacro de examen'} />
          </div>
          <div className={styles.boxedContainer}>
              <h3>Contesta todas las preguntas del banco de preguntas de reglamentación</h3>
              <ButtonLink href={'/finite/reglamentacion'} text={'Banco de preguntas Reglamentación'} />
          </div>

          <div className={styles.boxedContainer}>
              <h3>Contesta todas las preguntas del banco de preguntas técnica</h3>
              <ButtonLink href={'/finite/tecnica'} text={'Banco de preguntas Técnica'} />
          </div>

      </div>
  )
}
