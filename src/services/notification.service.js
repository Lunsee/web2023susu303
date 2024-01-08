import {ALLOWED_FORM_FIELDS} from './const';

export class NotificationService {
  #fieldName;
  #notification = document?.querySelector('.notification');
  #notificationText = document?.querySelector('.notification-text');

  /**
   * Метод уведомления об ошибке
   * @param {string} fieldName поле формы
   */
  showErrorNotification(fieldName) {
    if (
      fieldName === '' ||
      !Object.values(ALLOWED_FORM_FIELDS).includes(fieldName)
    ) {
      throw new Error('Неизвестное поле формы');
    }

    this.#fieldName = fieldName;

    switch (this.#fieldName) {
      case ALLOWED_FORM_FIELDS.USER_ID:
        this.#notificationText.textContent =
          'Некорректные данные в поле id пользователя';
        break;
      case ALLOWED_FORM_FIELDS.POST_ID:
        this.#notificationText.textContent =
          'Некорректные данные в поле id поста';
        break;
      case ALLOWED_FORM_FIELDS.POST_BODY:
        this.#notificationText.textContent =
          'Некорректные данные в поле текста поста';
        break;
      case ALLOWED_FORM_FIELDS.POST_TITLE:
        this.#notificationText.textContent =
          'Некорректные данные в поле заголовка поста';
        break;
      default:
        this.#notificationText.textContent = 'Некорректные данные';
    }

    this.#notification.classList.remove('hidden');

    setTimeout(() => {
      this.#notification.classList.add('hidden');
    }, 3000);
  }

  /**
   * Метод показа уведомлений об успешном действии
   * @param {'edit' | 'create'} action - действие
   */
  showSuccessNotification(action) {
    if (action === 'edit') {
      this.#notificationText.textContent = 'Пост успешно обновлен';
    } else {
      this.#notificationText.textContent = 'Пост успешно создан';
    }

    this.#notification.classList.remove('hidden');

    setTimeout(() => {
      this.#notification.classList.add('hidden');
    }, 3000);
  }
}
