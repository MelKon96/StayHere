StayHere

SPA для поиска и бронирования отелей и апартаментов.

Функциональность
просмотр доступных отелей и апартаментов;
поиск по городу;
выбор дат заезда и выезда;
выбор количества гостей;
фильтрация отелей по цене, категории, количеству комнат и удобствам;
просмотр подробной информации об отеле;
бронирование номера;
просмотр списка забронированных номеров;
переключение языка интерфейса (русский / английский);
переключение валюты отображения цен (EUR / USD);
сохранение настроек языка и валюты в localStorage;
получение и кэширование данных через RTK Query на базе DummyJSON API;
адаптивная верстка для мобильных и десктопных устройств;
skeleton loading при загрузке списка отелей.

Технологии:

React

React Router

Redux Toolkit

RTK Query

Webpack

Babel

CSS Modules

Git / GitHub

DummyJSON API

Основные зависимости:

Dependencies

react — библиотека для построения пользовательского интерфейса;
react-dom — интеграция React с DOM;
react-router-dom — маршрутизация приложения;
@reduxjs/toolkit — управление состоянием и RTK Query;
react-redux — интеграция Redux с React.

DevDependencies:

webpack — сборка проекта;
webpack-cli — запуск Webpack из командной строки;
webpack-dev-server — локальный сервер разработки;
babel-loader — интеграция Babel с Webpack;
@babel/core — ядро Babel;
@babel/preset-env — транспиляция современного JavaScript;
@babel/preset-react — обработка JSX;
html-webpack-plugin — генерация HTML-файла;
copy-webpack-plugin — копирование статических файлов;
css-loader — обработка CSS;
style-loader — подключение CSS;
gh-pages — деплой проекта на GitHub Pages.

Запуск проекта
Установка зависимостей
npm install
Запуск в режиме разработки
npm run dev

После запуска приложение будет доступно по адресу:

http://localhost:3000

Production-сборка
npm run build

Собранные файлы будут находиться в директории dist.

Деплой

Для сборки и публикации проекта на GitHub Pages:

npm run deploy
Деплой

Проект доступен по адресу:

https://melkon96.github.io/StayHere/

Проверка качества
Lighthouse

Проект проверен с помощью Lighthouse.

Категория Результат
Performance 93+
Accessibility 100
Best Practices 100
SEO 100

Проверка производилась в режиме инкогнито, чтобы расширения браузера не влияли на результаты тестирования.

Валидация

HTML и CSS проверены средствами валидации.

HTML — без ошибок валидации.
CSS — без ошибок валидации.
Структура проекта
src/
├── app/
├── components/
├── constants/
├── features/
├── hooks/
├── pages/
├── services/
├── styles/
└── utils/
