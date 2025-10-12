# Демонстрация API - 21 запрос для Insomnia/Postman

## 🎯 Последовательность демонстрации

### 1. GET список заявок (отфильтровать по дате формирования и статусу)

```http
GET http://localhost:8080/api/orders?status=COMPLETED&formedDateFrom=2024-01-01T00:00:00&formedDateTo=2024-12-31T23:59:59&page=0&size=20
Content-Type: application/json
```

**Ожидаемый результат:** Список завершенных заявок за 2024 год

---

### 2. GET иконки корзины

```http
GET http://localhost:8080/api/orders/cart-icon
Content-Type: application/json
```

**Ожидаемый результат:** `{"success": true, "data": {"orderId": null, "itemsCount": 0}}`

---

### 3. DELETE удалить введенную заявку (если есть)

```http
DELETE http://localhost:8080/api/orders/1
Content-Type: application/json
```

**Ожидаемый результат:** `{"success": true, "data": "Заявка успешно удалена"}` или ошибка 404

---

### 4. GET список услуг (с фильтром)

```http
GET http://localhost:8080/api/gases?name=CO₂&formula=CO₂&page=0&size=20
Content-Type: application/json
```

**Ожидаемый результат:** Список газов с фильтрацией по названию и формуле

---

### 5. POST добавить новую услугу

```http
POST http://localhost:8080/api/gases
Content-Type: application/json

{
  "name": "H₂ (Водород)",
  "formula": "H₂",
  "detailedDescription": "Водород - самый легкий химический элемент, составляющий основную часть массы звезд."
}
```

**Ожидаемый результат:** `{"success": true, "data": {...}, "message": "Услуга успешно создана"}`

---

### 6. POST добавить картинку к услуге

```http
POST http://localhost:8080/api/gases/1/image
Content-Type: multipart/form-data

file: [выберите изображение .jpg/.png]
```

**Ожидаемый результат:** `{"success": true, "data": "http://localhost:9000/...", "message": "Изображение успешно загружено"}`

---

### 7. POST добавить услугу в заявку

```http
POST http://localhost:8080/api/orders/1/gases
Content-Type: application/json

{
  "gasId": 1,
  "concentration": 0.04,
  "temperature": 15.0
}
```

**Ожидаемый результат:** `{"success": true, "data": "Услуга успешно добавлена в заявку"}`

---

### 8. POST добавить другую услугу в заявку

```http
POST http://localhost:8080/api/orders/1/gases
Content-Type: application/json

{
  "gasId": 2,
  "concentration": 0.21,
  "temperature": 20.0
}
```

**Ожидаемый результат:** `{"success": true, "data": "Услуга успешно добавлена в заявку"}`

---

### 9. GET иконки корзины (проверить обновление)

```http
GET http://localhost:8080/api/orders/cart-icon
Content-Type: application/json
```

**Ожидаемый результат:** `{"success": true, "data": {"orderId": 1, "itemsCount": 2}}`

---

### 10. GET посмотреть заявку (из 2 услуг)

```http
GET http://localhost:8080/api/orders/1
Content-Type: application/json
```

**Ожидаемый результат:** Детальная информация о заявке с 2 услугами

---

### 11. PUT изменить поле м-м (изменить услугу в заявке)

```http
PUT http://localhost:8080/api/orders/1/gases/1
Content-Type: application/json

{
  "concentration": 0.05,
  "temperature": 16.0
}
```

**Ожидаемый результат:** `{"success": true, "data": "Услуга в заявке успешно обновлена"}`

---

### 12. PUT изменить заявку

```http
PUT http://localhost:8080/api/orders/1
Content-Type: application/json

{
  "description": "Обновленное описание заявки для расчета температуры"
}
```

**Ожидаемый результат:** `{"success": true, "data": {...}, "message": "Заявка успешно обновлена"}`

---

### 13. PUT завершить введенную заявку (показать ошибку)

```http
PUT http://localhost:8080/api/orders/1/complete
Content-Type: application/json
```

**Ожидаемый результат:** `{"success": false, "message": "Можно завершать только сформированные заявки"}`

---

### 14. PUT сформировать заявку

```http
PUT http://localhost:8080/api/orders/1/form
Content-Type: application/json
```

**Ожидаемый результат:** `{"success": true, "data": {...}}` - заявка переходит в статус COMPLETED

---

### 15. PUT завершить сформированную заявку (вычисление температуры)

```http
PUT http://localhost:8080/api/orders/1/complete
Content-Type: application/json
```

**Ожидаемый результат:** `{"success": true, "data": {...}}` - заявка завершена с расчетом температуры

---

### 16. POST зарегистрировать нового пользователя

```http
POST http://localhost:8080/api/users/register
Content-Type: application/json

{
  "login": "newuser",
  "password": "password123",
  "email": "user@example.com",
  "firstName": "Иван",
  "lastName": "Иванов"
}
```

**Ожидаемый результат:** `{"success": true, "data": {...}, "message": "Пользователь успешно зарегистрирован"}`

---

### 17. POST аутентификация пользователя

```http
POST http://localhost:8080/api/users/login
Content-Type: application/json

{
  "login": "newuser",
  "password": "password123"
}
```

**Ожидаемый результат:** `{"success": true, "data": {"token": "mock_token_1", "user": {...}}}`

---

### 18. GET профиль пользователя

```http
GET http://localhost:8080/api/users/profile
Content-Type: application/json
Authorization: Bearer mock_token_1
```

**Ожидаемый результат:** `{"success": true, "data": {...}}` - данные пользователя

---

### 19. PUT обновление профиля

```http
PUT http://localhost:8080/api/users/profile
Content-Type: application/json
Authorization: Bearer mock_token_1

{
  "email": "newemail@example.com",
  "firstName": "Петр",
  "lastName": "Петров"
}
```

**Ожидаемый результат:** `{"success": true, "data": {...}, "message": "Профиль пользователя успешно обновлен"}`

---

### 20. POST деавторизация

```http
POST http://localhost:8080/api/users/logout
Content-Type: application/json
Authorization: Bearer mock_token_1
```

**Ожидаемый результат:** `{"success": true, "data": "Успешная деавторизация"}`

---

### 21. GET список заявок (проверить изменения)

```http
GET http://localhost:8080/api/orders?status=COMPLETED&page=0&size=20
Content-Type: application/json
```

**Ожидаемый результат:** Обновленный список заявок с завершенной заявкой

---

## 📊 Дополнительные запросы для демонстрации

### GET одна услуга

```http
GET http://localhost:8080/api/gases/1
Content-Type: application/json
```

### PUT изменение услуги

```http
PUT http://localhost:8080/api/gases/1
Content-Type: application/json

{
  "name": "H₂ (Водород) - обновлено",
  "detailedDescription": "Обновленное описание водорода."
}
```

### DELETE удаление услуги из заявки

```http
DELETE http://localhost:8080/api/orders/1/gases/1
Content-Type: application/json
```

### DELETE удаление услуги

```http
DELETE http://localhost:8080/api/gases/1
Content-Type: application/json
```

---

## 🎯 Ключевые моменты демонстрации

### 1. Фильтрация и пагинация
- Показать параметры `status`, `formedDateFrom`, `formedDateTo`, `page`, `size`
- Демонстрировать работу фильтров по названию и формуле газов

### 2. Бизнес-логика статусов
- **DRAFT** → **COMPLETED** → **DELETED**
- Показать ошибку при попытке завершить черновик
- Показать успешное формирование и завершение

### 3. Интеграция с Minio
- Загрузка изображения к услуге
- Получение presigned URL

### 4. Валидация данных
- Показать ошибки валидации при неправильных данных
- Продемонстрировать обязательные поля

### 5. Аутентификация
- Регистрация, вход, выход
- Работа с токенами (заглушка)

---

## 📋 Модели и сериализаторы

### Entity модели:
- **Gas** - услуга (газ)
- **CalcOrder** - заявка (заказ)
- **GasOrder** - связь газ-заявка
- **User** - пользователь

### DTO модели:
- **CreateGasDto** - создание услуги
- **UpdateGasDto** - обновление услуги
- **GasResponseDto** - ответ с услугой
- **OrderResponseDto** - ответ с заявкой
- **UserResponseDto** - ответ с пользователем
- **ApiResponse<T>** - стандартизированный ответ

### Сериализация:
- **JSON** формат для всех API
- **Multipart/form-data** для загрузки файлов
- **Валидация** с помощью Bean Validation

---

## 🚀 Готово к демонстрации!

Все 21 запрос подготовлены и готовы для выполнения в Insomnia/Postman. Последовательность демонстрирует полный жизненный цикл работы с API системы расчета температуры газов.
