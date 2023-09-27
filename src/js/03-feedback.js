import throttle from 'lodash.throttle';

if (typeof Storage !== 'undefined') {
  
    const form = document.querySelector('.feedback-form');
    const emailInput = form.querySelector('input[name="email"]');
    const messageTextarea = form.querySelector('textarea[name="message"]');
  
    const savedState =
      JSON.parse(localStorage.getItem('feedback-form-state')) || {};
 
    emailInput.value = savedState.email || '';
    messageTextarea.value = savedState.message || '';
 
    const saveStateWithThrottle = throttle(() => {
  
      const state = {
        email: emailInput.value,
        message: messageTextarea.value,
      };

      localStorage.setItem('feedback-form-state', JSON.stringify(state));
    }, 500);
 
    emailInput.addEventListener('input', saveStateWithThrottle);
    messageTextarea.addEventListener('input', saveStateWithThrottle);
  
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      localStorage.removeItem('feedback-form-state');

      const email = emailInput.value;
      const message = messageTextarea.value;

      console.log({ email, message });

      emailInput.value = '';
      messageTextarea.value = '';
    });

  } else {
    console.error('Local storage is not supported in this browser.');
  }