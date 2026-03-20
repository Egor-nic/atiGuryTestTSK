import React from 'react';
import styles from './AuthForm.module.scss';
import ButtonBase from '../../../shared/ui/Button/ButtonBase';
import InputBase from '../../../shared/ui/Input/InputBase';
import { Checkbox } from '../../../shared/ui/CheckBox/CheckBox';
import { useAuthForm } from '../model/useAuthForm';

export function AuthForm() {
  const {
    formValue,
    errors,
    apiError,
    rememberMe,
    isSubmitting,
    isShowPassword,
    onChangeInput,
    onSubmit,
    setRememberMe,
    setIsShowPassword,
    clearLogin
  } = useAuthForm();

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputsWrapper}>
        <InputBase
          value={formValue.login}
          onChange={onChangeInput}
          name="login"
          id="login"
          labelText="Логин"
          leftIcon={<img src="./userIcon.svg" alt="user-icon" />}
          rightIcon={
            <button
              type="button"
              className={styles.removeInputValueButton}
              onClick={clearLogin}
            >
              <img src="./close-icon.svg" alt="close icon" />
            </button>
          }
        />
        {errors.login && <p className={styles.errorText}>{errors.login}</p>}

        <InputBase
          onChange={onChangeInput}
          value={formValue.password}
          name="password"
          id="password"
          type={isShowPassword ? 'text' : 'password'}
          labelText="Пароль"
          wrapperClassName={'margin-b'}
          leftIcon={<img src="./lockIcon.svg" alt="lock Icon" />}
          rightIcon={
            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={() => setIsShowPassword((prev) => !prev)}
            >
              <img src="./eye-off-icon.svg" alt="eye-off-icon" />
            </button>
          }
        />
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        {apiError && <p className={styles.errorText}>{apiError}</p>}
      </div>

      <Checkbox
        className={styles.checkBox}
        label="Запомнить данные"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />

      <ButtonBase
        text={isSubmitting ? 'Вход...' : 'Войти'}
        className={styles.button}
        disabled={isSubmitting}
      />

      <div className={styles.orComponent}>
        <span />
        <span>Или</span>
        <span />
      </div>
    </form>
  );
}

