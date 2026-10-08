<div align="center">

# 🏨 StayHere

**SPA для поиска и бронирования отелей и апартаментов**

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://melkon96.github.io/StayHere/)

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat&logo=redux&logoColor=white)
![RTK Query](https://img.shields.io/badge/RTK%20Query-764ABC?style=flat&logo=redux&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=flat&logo=webpack&logoColor=black)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=flat&logo=babel&logoColor=black)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=flat&logo=cssmodules&logoColor=white)

[**🔗 Открыть демо**](https://melkon96.github.io/StayHere/)

</div>

---

## 📑 Содержание

- [О проекте](#-о-проекте)
- [Функциональность](#-функциональность)
- [Технологии](#-технологии)
- [Зависимости](#-зависимости)
- [Запуск проекта](#-запуск-проекта)
- [Скрипты](#-скрипты)
- [Деплой](#-деплой)
- [Проверка качества](#-проверка-качества)
- [Валидация](#-валидация)

---

## 📖 О проекте

**StayHere** — одностраничное приложение для поиска и бронирования отелей и апартаментов. Пользователь может найти жильё по городу и датам, отфильтровать варианты по нужным параметрам, изучить подробную информацию об объекте и забронировать номер.

Данные загружаются и кэшируются с помощью **RTK Query** на базе [DummyJSON API](https://dummyjson.com/). Интерфейс адаптивен и поддерживает два языка и две валюты.

---

## ✨ Функциональность

### 🔎 Поиск и выбор жилья
- Просмотр доступных отелей и апартаментов
- Поиск по городу
- Выбор дат заезда и выезда
- Выбор количества гостей

### 🎛 Фильтрация
- По цене
- По категории
- По количеству комнат
- По удобствам

### 🛎 Бронирование
- Просмотр подробной информации об отеле
- Бронирование номера
- Просмотр списка забронированных номеров

### ⚙️ Настройки интерфейса
- Переключение языка: **русский / английский**
- Переключение валюты отображения цен: **EUR / USD**
- Сохранение выбранных языка и валюты в `localStorage`

### 🚀 Технические особенности
- Получение и кэширование данных через **RTK Query**
- Skeleton loading при загрузке списка отелей
- Адаптивная верстка для мобильных и десктопных устройств

---

## 🛠 Технологии

| Категория | Инструменты |
|---|---|
| UI | React |
| Маршрутизация | React Router |
| Состояние и данные | Redux Toolkit, RTK Query |
| Сборка | Webpack, Babel |
| Стили | CSS Modules |
| API | DummyJSON |
| Контроль версий и деплой | Git, GitHub, GitHub Pages |

---

## 📦 Зависимости

### Dependencies

| Пакет | Назначение |
|---|---|
| `react` | Библиотека для построения пользовательского интерфейса |
| `react-dom` | Интеграция React с DOM |
| `react-router-dom` | Маршрутизация приложения |
| `@reduxjs/toolkit` | Управление состоянием и RTK Query |
| `react-redux` | Интеграция Redux с React |

### DevDependencies

| Пакет | Назначение |
|---|---|
| `webpack` | Сборка проекта |
| `webpack-cli` | Запуск Webpack из командной строки |
| `webpack-dev-server` | Локальный сервер разработки |
| `babel-loader` | Интеграция Babel с Webpack |
| `@babel/core` | Ядро Babel |
| `@babel/preset-env` | Транспиляция современного JavaScript |
| `@babel/preset-react` | Обработка JSX |
| `html-webpack-plugin` | Генерация HTML-файла |
| `copy-webpack-plugin` | Копирование статических файлов |
| `css-loader` | Обработка CSS |
| `style-loader` | Подключение CSS |
| `gh-pages` | Деплой проекта на GitHub Pages |

---

## 🚀 Запуск проекта

**1. Клонируйте репозиторий**

```bash
git clone https://github.com/melkon96/StayHere.git
cd StayHere
```

**2. Установите зависимости**

```bash
npm install
```

**3. Запустите в режиме разработки**

```bash
npm run dev
```

После запуска приложение будет доступно по адресу: **http://localhost:3000**

**4. Соберите production-версию**

```bash
npm run build
```

Собранные файлы будут находиться в директории `dist`.

---

## 📜 Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск сервера разработки на `localhost:3000` |
| `npm run build` | Production-сборка в директорию `dist` |
| `npm run deploy` | Сборка и публикация на GitHub Pages |

---

## 🌐 Деплой

Для сборки и публикации проекта на GitHub Pages выполните:

```bash
npm run deploy
```

Проект доступен по адресу: **https://melkon96.github.io/StayHere/**

---

## 📊 Проверка качества

Проект проверен с помощью **Lighthouse**.

| Категория | Результат |
|---|:---:|
| ⚡ Performance | **93+** |
| ♿ Accessibility | **100** |
| ✅ Best Practices | **100** |
| 🔍 SEO | **100** |

> Проверка производилась в режиме инкогнито, чтобы расширения браузера не влияли на результаты тестирования.

---

## ✅ Валидация

HTML и CSS проверены средствами валидации:

- **HTML** — без ошибок валидации
- **CSS** — без ошибок валидации

---


