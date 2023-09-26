import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

// Функція для зберігання стану форми в локальному сховищі
const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
};

// Функція для відображення збереженого стану форми з локального сховища
const restoreFormState = () => {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
};

// Встановлення обробників подій для полів вводу
emailInput.addEventListener(
  'input',
  throttle(() => {
    saveFormState();
  }, 500)
);

messageTextarea.addEventListener(
  'input',
  throttle(() => {
    saveFormState();
  }, 500)
);

// Перевірка наявності збереженого стану та відображення його
restoreFormState();

// Встановлення обробника події submit для форми
feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Очищення локального сховища та полів форми
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';

  // Виведення даних у консоль
  console.log({
    email: emailInput.value,
    message: messageTextarea.value,
  });
});
