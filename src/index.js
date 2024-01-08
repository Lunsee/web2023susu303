import {ApiService} from './services/api.service';
import {NotificationService} from './services/notification.service';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const apiService = new ApiService();
  const notificationService = new NotificationService();

  const createPost = (post) => {
    if (!post) {
      return;
    }

    const postContainer = document.createElement('li');
    const contentWrapper = document.createElement('div');
    const postText = document.createElement('p');
    const postEditBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const postAuthor = document.createElement('span');

    postContainer.classList.add(
      'flex',
      'flex-col',
      'py-4',
      'border-b-2',
      'border-slid',
      'border-black',
      'last:border-none'
    );
    postContainer.setAttribute('data-id', post.id);

    contentWrapper.classList.add('flex');

    postText.textContent = `№${post.id}) ${post.body}`;
    postText.classList.add('flex-1', 'mr-4', 'text-md');

    postAuthor.classList.add('mt-2', 'font-bold');

    apiService
      .getUserById(post.id)
      .then((user) => {
        postAuthor.textContent = user.name;
      })
      .catch(() => {
        postAuthor.textContent = 'This user does not define a name';
      });

    postEditBtn.textContent = 'Редактировать';
    postEditBtn.classList.add(
      'h-10',
      'font-medium',
      'text-sm',
      'border-none',
      'rounded-lg',
      'py-1',
      'px-3',
      'bg-yellow-500',
      'cursor-pointer'
    );

    postEditBtn.addEventListener('click', () => {
      toggleModal('open', postEditBtn, '.modal-edit', '.close-modal-btn-edit');
      editTodo(post.id);
    });

    deleteBtn.textContent = 'Удалить';
    deleteBtn.classList.add(
      'h-10',
      'font-medium',
      'text-sm',
      'border-none',
      'rounded-lg',
      'py-1',
      'px-4',
      'bg-red-500',
      'text-white',
      'cursor-pointer',
      'ml-2'
    );

    deleteBtn.addEventListener('click', () => {
      apiService.deletePost(post.id).then(() => {
        document.querySelector('.post-list').childNodes.forEach((item) => {
          if (+item.getAttribute('data-id') === post.id) {
            item.remove();
          }
        });
      });
    });

    contentWrapper.append(postText, postEditBtn, deleteBtn);
    postContainer.append(contentWrapper, postAuthor);

    return postContainer;
  };

  const renderPosts = () => {
    const container = document.querySelector('.post-list');

    for (let i = 0; i < 10; i++) {
      container.append(showLoader());
    }

    apiService
      .getPosts()
      .then((posts) => {
        posts.forEach((post) => {
          const newPost = createPost(post);
          container.append(newPost);
        });
      })
      .catch((e) => console.log('Ошибка в монтировании списка задач', e))
      .finally(() => clearLoader());
  };

  const openModal = (modalSelector, closeBtnSelector) => {
    const modal = document.querySelector(modalSelector);
    const closeModalBtn = document.querySelector(closeBtnSelector);

    body.classList.add('overflow-hidden', 'h-screen');
    modal.classList.remove('hidden');
    modal.classList.add('block');

    toggleModal('close', closeModalBtn, modalSelector);
  };

  const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('block');
    modal.classList.add('hidden');
    body.classList.remove('overflow-hidden', 'h-screen');
  };

  const toggleModal = (action, elem, modalSelector, closeModalBtn) => {
    if (action === 'open') {
      elem.addEventListener('click', () => {
        openModal(modalSelector, closeModalBtn);
      });
    } else {
      elem.addEventListener('click', () => {
        closeModal(modalSelector);
      });
    }
  };

  const createTodo = () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const container = document.querySelector('.post-list');
      const id = document.querySelector('#input-id').value;
      const title = document.querySelector('#input-title').value;
      const text = document.querySelector('#input-text').value;

      if (id < 1 || id > 10) {
        notificationService.showErrorNotification('userId');
        return;
      }

      container.append(showLoader());

      apiService
        .sendPost({userId: id, title, body: text})
        .then((post) => {
          const newPost = createPost(post);
          container.insertBefore(newPost, container.firstChild);

          notificationService.showSuccessNotification('create');
        })
        .catch((err) => console.log(err))
        .finally(() => {
          closeModal('.modal-create');
          clearLoader();
        });
    });
  };

  const editTodo = (postId) => {
    const form = document.querySelector('.edit-form');

    const modal = document.querySelector('.modal-edit');
    const userIdField = modal.querySelector('[data-id="edit-user-id"]');
    const postTitleField = modal.querySelector('[data-id="edit-post-title"]');
    const postBodyField = modal.querySelector('[data-id="edit-post-body"]');

    userIdField.value = postId;

    const editFormHandler = async (e) => {
      e.preventDefault();

      const oldPost = await apiService.getPostById(postId);

      apiService
        .editPost({
          id: postId,
          title: postTitleField.value ?? oldPost.title,
          body: postBodyField.value ?? oldPost.body,
        })
        .then((res) => {
          notificationService.showSuccessNotification('edit');

          document.querySelectorAll('li').forEach((elem) => {
            if (+elem.getAttribute('data-id') === postId) {
              elem.innerHTML = createPost(res).innerHTML;
            }
          });
        })
        .catch((err) => notificationService.showErrorNotification())
        .finally(() => {
          closeModal('.modal-edit');
          form.removeEventListener('submit', editFormHandler);
        });
    };

    form.addEventListener('submit', editFormHandler);
  };

  const showLoader = () => {
    const postContainer = document.createElement('li');
    const contentWrapper = document.createElement('div');
    const postText = document.createElement('p');
    const postEditBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const postAuthor = document.createElement('span');

    postContainer.classList.add(
      'flex',
      'flex-col',
      'py-4',
      'border-b-2',
      'border-slid',
      'border-black',
      'last:border-none'
    );
    postContainer.setAttribute('data-loader', true);

    contentWrapper.classList.add('flex', 'animate-pulse');

    postText.classList.add(
      'flex-1',
      'mr-4',
      'text-md',
      'h-10',
      'w-2',
      'rounded',
      'bg-slate-700'
    );

    postAuthor.classList.add('mt-2', 'font-bold');

    postEditBtn.classList.add(
      'h-10',
      'w-20',
      'font-medium',
      'text-sm',
      'border-none',
      'rounded-lg',
      'py-1',
      'px-3',
      'bg-slate-700'
    );

    deleteBtn.classList.add(
      'h-10',
      'w-20',
      'font-medium',
      'text-sm',
      'border-none',
      'rounded-lg',
      'py-1',
      'px-4',
      'bg-slate-700',
      'ml-2'
    );

    contentWrapper.append(postText, postEditBtn, deleteBtn);
    postContainer.append(contentWrapper, postAuthor);

    return postContainer;
  };

  const clearLoader = () => {
    document
      .querySelectorAll('[data-loader]')
      .forEach((loader) => loader.remove());
  };

  renderPosts();
  toggleModal(
    'open',
    document.querySelector('.show-create-modal-btn'),
    '.modal-create',
    '.close-modal-create'
  );
  createTodo();
});
