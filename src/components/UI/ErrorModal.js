import Card from "./Card";
import Button from "./Button";
import styles from "./ErrorModal.module.css"

export default function ErrorModal(props) {
    return (
        <div className={styles.backdrop} onClick={props.onExit}>
            <Card className={styles.modal}>
                <header className={styles.header}>
                    <h2> {props.title}</h2>
                </header>
                <div className={styles.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={styles.actions}>
                    <Button onClick={props.onExit}>okay</Button>
                </footer>
            </Card>
        </div>
    )
}