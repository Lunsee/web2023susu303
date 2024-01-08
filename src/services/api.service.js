export class ApiService {
  #baseUrl = 'https://jsonplaceholder.typicode.com';

  /**
   * Метод совершает запрос на сервер и получает массив постов
   * @returns {Promise<object[]>}
   */
  async getPosts() {
    try {
      const res = await fetch(`${this.#baseUrl}/posts`);

      if (!res.ok) {
        throw new Error('Не получилось получить посты! ' + res.status);
      }

      return await res.json();
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * Метод создания нового поста
   * @param {object} data
   * @returns {Promise<object>}
   */
  async sendPost(data) {
    try {
      const res = await fetch(`${this.#baseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Не получилось создать новую задачу');
      }

      return await res.json();
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * Удаление поста
   * @param {number | string} id id - поста
   */
  async deletePost(id) {
    try {
      const res = await fetch(`${this.#baseUrl}/posts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Не удалось удалить пост');
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Получение данных о пользователе
   * @param {number | string} id
   */
  async getUserById(id) {
    try {
      const res = await fetch(`${this.#baseUrl}/users/${id}`);

      if (!res.ok) {
        throw new Error(
          `Не удалось получить данные о пользователе с id: ${id}!\nВозможно, такого пользователя не существует`
        );
      }

      return await res.json();
    } finally {
    }
  }

  /**
   * Метод получения данных о конкретном посте по id
   * @param {string | number} id - id поста
   * @returns {Promise<object>} данные поста
   */
  async getPostById(id) {
    try {
      const res = await fetch(`${this.#baseUrl}/posts/${id}`);

      if (!res.ok) {
        throw new Error('Не удалось получить данные о посте с id: ' + id);
      }

      return await res.json();
    } catch (err) {
      console.error(err.message);
    }
  }

  /**
   * Метод редактирования поста
   * @param {object} body тело поста с обязательным полем id
   * @returns {Promise<object>} обновленные данные о посте
   */
  async editPost(body) {
    try {
      const res = await fetch(`${this.#baseUrl}/posts/${body.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error('Не удалось обновить данные');
      }

      return await res.json();
    } finally {
    }
  }
}
