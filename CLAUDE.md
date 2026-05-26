# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # запуск dev-сервера (http://localhost:5173)
npm run build    # production-сборка в папку dist/
npm run preview  # preview production-сборки локально
npm run lint     # ESLint проверка
```

## Architecture

Это одностраничное приложение — тренажёр по спряжению немецких глаголов (уровень B1).

**Главный файл:** `src/App.jsx` — содержит все данные и UI в одном файле (нет разбивки на компоненты).

**Структура данных в `App.jsx`:**
- `MAIN_VERBS` — основные глаголы: sein, werden, haben
- `MODAL_VERBS` — модальные глаголы: wollen, können, müssen, dürfen, sollen, mögen, möchten
- `TENSES` — массив из 8 времён/наклонений (Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I, Konjunktiv II, Würden+Inf., Imperativ). Каждый объект содержит `rows` (спряжение по лицам, индексируется по ключу глагола) и `examples` (примеры предложений с переводом)
- `KEY_FORMS` — шпаргалка ключевых форм для B1
- `TENSE_INFO` — описания времён для шпаргалки

**State в компоненте `App`:**
- `activeTense` — текущее выбранное время (key из `TENSES`)
- `verbGroup` — `"main"` | `"modal"` — переключатель между группами глаголов

**`src/german_verbs_1.jsx`** — дубликат `App.jsx`, по всей видимости черновик/бэкап (не импортируется нигде).

**Стили:** inline styles (без CSS-модулей, без Tailwind). Цветовая схема — светлая (`#f9f9f7` фон).

## Notes

- Нет тестов
- Нет роутинга (single view)
- Данные глаголов хранятся статично в JS — не в отдельных JSON-файлах
