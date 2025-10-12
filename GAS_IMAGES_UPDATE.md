# Обновление логики работы с изображениями газов

## Изменения

### 1. ✅ Обновлена схема базы данных
- **Добавлено поле**: `image_url VARCHAR(500)` в таблицу `gas`
- **Файл**: `infra/sql/init.sql`

### 2. ✅ Обновлена модель Gas
- **Добавлено поле**: `imageUrl: String?` в entity `Gas`
- **Файл**: `gas/src/main/kotlin/ru/mstu/yandex/gas/entity/Gas.kt`

### 3. ✅ Обновлен GasService
- **Логика**: Изображения берутся только из базы данных (`gas.imageUrl`)
- **Fallback**: Если `imageUrl` пустой, возвращается пустая строка
- **Методы обновлены**:
  - `getAllGases()`
  - `getGasById()`
  - `searchGases()`
- **Файл**: `gas/src/main/kotlin/ru/mstu/yandex/gas/service/GasService.kt`

### 4. ✅ Обновлены тестовые данные
- **Поле `image_url`** установлено в `NULL` для всех газов в `test-data.sql`
- **Файл**: `infra/sql/test-data.sql`

## Как обновить существующую базу данных

### Вариант 1: Полное пересоздание (рекомендуется для разработки)
```bash
# Остановить приложение
# Удалить существующие данные PostgreSQL
docker-compose down -v

# Запустить с новой схемой
docker-compose up -d

# Применить тестовые данные
docker exec -i my_postgres psql -U my_user -d my_database < infra/sql/test-data.sql
```

### Вариант 2: Обновление существующей базы
```bash
# Добавить поле image_url
docker exec -i my_postgres psql -U my_user -d my_database -c "ALTER TABLE gas ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);"
```

## Структура обновленной таблицы gas

```sql
CREATE TABLE gas (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    formula VARCHAR(255) NOT NULL,
    detailed_description TEXT NOT NULL,
    image_url VARCHAR(500)  -- НОВОЕ ПОЛЕ
);
```

## Логика работы с изображениями

### Приоритет изображений:
1. **Из базы данных**: `gas.imageUrl` (если не пустой)
2. **Пустая строка**: `""` (если `imageUrl` пустой)

### Добавление изображений:
Изображения добавляются только через базу данных:
```sql
UPDATE gas SET image_url = 'https://example.com/gas-image.png' WHERE id = 1;
```

## Преимущества обновления

1. **Гибкость**: Можно легко изменить изображения через базу данных
2. **Централизованное управление**: Все изображения хранятся в одном месте
3. **Чистый код**: Нет хардкод ссылок на изображения в коде
4. **Простота обновления**: Новые газы можно добавлять с собственными изображениями

## Тестирование

После обновления проверьте:
1. Главная страница отображает изображения газов (если они есть в БД)
2. Страница деталей газа показывает правильное изображение
3. Поиск газов работает корректно
4. Если `image_url` пустой, изображение не отображается
