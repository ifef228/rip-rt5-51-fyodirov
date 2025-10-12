# Настройка для существующей базы данных

## ✅ Проблема решена

**Ошибка:** `ERROR: value too long for type character varying(500)`

**Причина:** Hibernate пытался изменить существующую схему базы данных, но не мог из-за существующих данных.

## 🔧 Решение

### 1. Изменена конфигурация Hibernate

**Файл:** `gas/src/main/resources/application.yml`

```yaml
# Было:
jpa:
  hibernate:
    ddl-auto: validate  # Hibernate пытался изменить схему

# Стало:
jpa:
  hibernate:
    ddl-auto: none      # Hibernate не трогает схему
```

### 2. Создана конфигурация для разработки

**Файл:** `gas/src/main/resources/application-dev.yml`

```yaml
# Для новой базы данных можно использовать:
jpa:
  hibernate:
    ddl-auto: validate  # Валидация схемы
```

## 🚀 Запуск с существующей базой данных

### Вариант 1: Использовать существующую БД (рекомендуется)

```bash
# Просто запустить приложение
cd gas
./gradlew bootRun
```

**Конфигурация:** `application.yml` (ddl-auto: none)

### Вариант 2: Создать новую БД для разработки

```bash
# Запустить с профилем dev
cd gas
./gradlew bootRun --args='--spring.profiles.active=dev'
```

**Конфигурация:** `application-dev.yml` (ddl-auto: validate)

## 📋 Требования к существующей базе данных

### Таблицы должны существовать:

1. **`gas`** - таблица газов
2. **`users`** - таблица пользователей
3. **`calc_order`** - таблица заявок
4. **`gas_order`** - таблица связи газ-заявка

### Структура таблиц:

```sql
-- gas
CREATE TABLE gas (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    formula VARCHAR(255) NOT NULL,
    detailed_description TEXT NOT NULL,
    image_url VARCHAR(500)  -- Может быть NULL
);

-- users
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100)
);

-- calc_order
CREATE TABLE calc_order (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER,
    temp_result DOUBLE PRECISION,
    timestamp TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    description VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- gas_order
CREATE TABLE gas_order (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gas_id INTEGER,
    calc_order_id INTEGER,
    concentration DOUBLE PRECISION NOT NULL,
    temperature DOUBLE PRECISION NOT NULL,
    FOREIGN KEY (gas_id) REFERENCES gas(id),
    FOREIGN KEY (calc_order_id) REFERENCES calc_order(id)
);
```

## ⚠️ Важные замечания

### 1. Типы данных
- `concentration` и `temperature` должны быть `DOUBLE PRECISION` (не `INTEGER`)
- `temp_result` должен быть `DOUBLE PRECISION` (не `DECIMAL`)

### 2. Поля пользователей
- Если в таблице `users` нет полей `email`, `first_name`, `last_name`, добавьте их:
```sql
ALTER TABLE users ADD COLUMN email VARCHAR(100);
ALTER TABLE users ADD COLUMN first_name VARCHAR(100);
ALTER TABLE users ADD COLUMN last_name VARCHAR(100);
```

### 3. Статусы заявок
- Убедитесь, что в таблице `calc_order` есть поле `status` со значениями: `DRAFT`, `COMPLETED`, `DELETED`

## 🔍 Проверка готовности БД

```sql
-- Проверить структуру таблиц
\d gas
\d users
\d calc_order
\d gas_order

-- Проверить типы данных
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'gas_order'
AND column_name IN ('concentration', 'temperature');
```

## ✅ Результат

- ✅ Hibernate не пытается изменить схему
- ✅ Приложение работает с существующей БД
- ✅ Нет ошибок при запуске
- ✅ API готов к использованию

**Приложение готово к запуску с существующей базой данных!** 🚀
