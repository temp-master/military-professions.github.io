# Атлас новых военных профессий

Современный одностраничный сайт на обычных HTML, CSS и JavaScript.

- без TypeScript;
- без React и других фреймворков;
- без npm и этапа сборки;
- адаптивная версия для телефона, планшета и компьютера;
- анимации появления, интерактивные карточки и мобильное меню;
- готовый workflow для GitHub Pages.

## Локальный запуск

Можно просто открыть `index.html` в браузере. Для запуска через локальный сервер:

```bash
python3 -m http.server 8000
```

После этого сайт будет доступен по адресу `http://localhost:8000`.

## Публикация на GitHub Pages

1. Создайте новый пустой репозиторий на GitHub.
2. Загрузите всё содержимое проекта в корень ветки `main`.
3. Откройте в репозитории `Settings` → `Pages`.
4. В разделе `Build and deployment` выберите источник `GitHub Actions`.
5. После следующего push workflow автоматически опубликует сайт.

## Замена фотографий

Чтобы заменить изображения без изменений в коде, сохраните новые файлы под теми же именами:

- `assets/images/robotics-lab.png`
- `assets/images/cyber-lab.png`
- `assets/images/optics-lab.png`

## Структура

```text
index.html
assets/
  css/style.css
  js/script.js
  images/
.github/workflows/pages.yml
```
