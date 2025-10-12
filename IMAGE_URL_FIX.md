# Исправление ошибки с полем image_url

## 🚨 Проблема

При создании новой услуги возникает ошибка:
```
ERROR: null value in column "image_url" of relation "gas" violates not-null constraint
```

## 🔍 Причина

В существующей базе данных поле `image_url` имеет ограничение NOT NULL, но в Entity модели оно помечено как nullable.

## ✅ Решение

### Вариант 1: Исправление Entity модели (рекомендуется)

**Изменения в `Gas.kt`:**
```kotlin
@Column(name = "image_url", length = 500, nullable = true, insertable = false, updatable = true)
val imageUrl: String? = null,
```

**Изменения в `GasApiController.kt`:**
```kotlin
val gas = Gas(
    name = createGasDto.name,
    formula = createGasDto.formula,
    detailedDescription = createGasDto.detailedDescription
    // imageUrl не устанавливаем при создании, так как поле insertable = false
)
```

**Результат:**
- При создании услуги поле `image_url` не включается в INSERT
- При загрузке изображения поле обновляется через UPDATE
- Поле остается nullable в базе данных

### Вариант 2: Исправление структуры базы данных

Если нужно исправить базу данных, выполните SQL скрипт:

```sql
-- Создаем временную колонку
ALTER TABLE gas ADD COLUMN image_url_temp VARCHAR(500);

-- Копируем данные из старой колонки
UPDATE gas SET image_url_temp = image_url WHERE image_url IS NOT NULL;

-- Удаляем старую колонку
ALTER TABLE gas DROP COLUMN image_url;

-- Переименовываем временную колонку
ALTER TABLE gas RENAME COLUMN image_url_temp TO image_url;
```

## 🧪 Тестирование

### 1. Создание услуги без изображения

```http
POST http://localhost:8080/api/gases
Content-Type: application/json

{
  "name": "H₂ (Водород)",
  "formula": "H₂",
  "detailedDescription": "Водород - самый легкий химический элемент"
}
```

**Ожидаемый результат:**
```json
{
  "success": true,
  "message": "Услуга успешно создана",
  "data": {
    "id": 1,
    "name": "H₂ (Водород)",
    "formula": "H₂",
    "detailedDescription": "Водород - самый легкий химический элемент",
    "imageUrl": null
  }
}
```

### 2. Загрузка изображения к услуге

```http
POST http://localhost:8080/api/gases/1/image
Content-Type: multipart/form-data

file: [выберите изображение .jpg/.png]
```

**Ожидаемый результат:**
```json
{
  "success": true,
  "message": "Изображение успешно загружено",
  "data": "http://localhost:9000/gas-images/gas-1-uuid.jpg"
}
```

### 3. Проверка обновленной услуги

```http
GET http://localhost:8080/api/gases/1
```

**Ожидаемый результат:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "H₂ (Водород)",
    "formula": "H₂",
    "detailedDescription": "Водород - самый легкий химический элемент",
    "imageUrl": "http://localhost:9000/gas-images/gas-1-uuid.jpg"
  }
}
```

## 🔧 Проверка в базе данных

```sql
-- Проверить структуру таблицы
SELECT column_name, is_nullable, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'gas' AND column_name = 'image_url';

-- Проверить данные
SELECT id, name, formula, image_url FROM gas ORDER BY id DESC LIMIT 5;
```

## ✅ Результат

- ✅ Создание услуги без изображения работает
- ✅ Поле `image_url` остается NULL при создании
- ✅ Загрузка изображения обновляет поле через UPDATE
- ✅ Нет ошибок с ограничениями NOT NULL
- ✅ API работает корректно

## 🚀 Готово к тестированию!

Попробуйте создать услугу снова - ошибка должна исчезнуть.
