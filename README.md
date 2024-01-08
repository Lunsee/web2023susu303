# AJAX Task

Предварительно должны быть установлены git и nodejs(версия lts 16 и выше)
- install node.js v16>(npm v7.x>) (https://nodejs.org/en/download/)
- install git(https://git-scm.com/downloads)



Далее:
- Скачиваем проект к себе. Есть 3 способа:
  - Сачиваем проект как архив и разархивирем где удобно
  - Открываем терминал в нужной дириктории. `git clone 'https://github.com/ProgerPapka/empty-vite-template.git'` Проект склонировался и далее переходим в папку проекта. И последний штрих удаляем папку `.git` - это нужно чтобы вы создали свой гит репозиторий
  - Для тех кто давно работает с github, то уже знает что можно просто сделать Fork данного репозтория. Важно: заводить пул реквест после выполнения задания в данный репозиторий не нужно, только в свой форкнутый
- Заходим в папку с проектом и открываем в нем терминал
- `npm i` - установка зависимостей таких как less, scss и прочее(появляется папка node-modules и файл package-lock.json)
- После установки пакетов `npm run dev` - запускается dev-server, в терминале будет указан адресс и порт на котором запустился сервер
- Открываем адресс в браузере(анпример он будет таким `http://127.0.0.1:5173`), и видим как наш проект(сайт) отображается в браузере
- Начинаем разработку приложения: изменяем html, создаем less(scss/sass или css) файлы, добавляем в них стили и приминяем их в html. Вкладка в браузере с адресом dev сервера(которая запустилась командой `npm run dev`) будет автоматически перерендериваться по мере добавления кода
