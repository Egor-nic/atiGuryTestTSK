import {AuthForm} from "../../entity/AuthContent/ui/AuthForm";
import styles from './Page.module.scss';

export default function Auth() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>

          <header className={styles.header}>

            <div className={styles.logoWrapper}>
              <img className={styles.logo} src='./logo.png' alt='logo' />
            </div>
            <h1 className={styles.title}>Добро пожаловать!</h1>
            <p className={styles.subTitle}>Пожалуйста, авторизируйтесь</p>
          </header>

          <AuthForm />

          <div className={styles.createAccountWrapper}>
            <p className={styles.createAccountText}>
              Нет аккаунта?{' '}
              <button type="button" className={styles.createAccountButton}>
                Создать
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}