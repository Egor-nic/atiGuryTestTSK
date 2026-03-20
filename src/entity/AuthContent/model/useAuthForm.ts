import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../../shared/auth/session';
import { loginRequest, type AuthResponse } from '../lib/authApi';

type FormKeys = 'login' | 'password';
type FormValue = Record<FormKeys, string>;
type FormErrors = Record<FormKeys, string>;

export function useAuthForm() {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState<FormValue>({
    login: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({ login: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = { login: '', password: '' };

    if (!formValue.login.trim()) {
      nextErrors.login = 'Поле обязательно для заполнения';
    }
    if (!formValue.password.trim()) {
      nextErrors.password = 'Поле обязательно для заполнения';
    }

    setErrors(nextErrors);
    return !nextErrors.login && !nextErrors.password;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload: AuthResponse = await loginRequest(
        formValue.login.trim(),
        formValue.password.trim(),
        30
      );

      if (!payload.accessToken) {
        setApiError(payload.message ?? 'Не удалось авторизоваться');
        return;
      }

      setAuthToken(payload.accessToken, rememberMe);
      navigate('/main', { replace: true });
    } catch (_error) {
      setApiError('Сетевая ошибка. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as FormKeys;

    setFormValue((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
    setApiError('');
  };

  const clearLogin = () => {
    setFormValue((prev) => ({ ...prev, login: '' }));
    setErrors((prev) => ({ ...prev, login: '' }));
    setApiError('');
  };

  return {
    formValue,
    errors,
    apiError,
    rememberMe,
    isSubmitting,
    isShowPassword,
    setRememberMe,
    setIsShowPassword,
    onChangeInput,
    onSubmit,
    clearLogin
  };
}

