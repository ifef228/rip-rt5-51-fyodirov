# Gas Temperature Calculator API

## Обзор

REST API для системы расчета температуры газов в атмосфере. API предоставляет полный набор методов для управления услугами (газами), заявками (заказами) и пользователями.

## Архитектура

### Домены

1. **Услуги (Газы)** - `/api/gases`
2. **Заявки (Заказы)** - `/api/orders`
3. **Пользователи** - `/api/users`

### Модели данных

#### Gas (Услуга)
- `id: Long` - Уникальный идентификатор
- `name: String` - Название газа
- `formula: String` - Химическая формула
- `detailedDescription: String` - Подробное описание
- `imageUrl: String?` - URL изображения в Minio

#### CalcOrder (Заявка)
- `id: Long` - Уникальный идентификатор
- `userId: Long` - ID пользователя-создателя
- `tempResult: Double?` - Результат расчета температуры
- `timestamp: LocalDateTime` - Время создания
- `status: OrderStatus` - Статус заявки (DRAFT, COMPLETED, DELETED)
- `description: String?` - Описание заявки

#### GasOrder (Связь газ-заявка)
- `id: Long` - Уникальный идентификатор
- `gasId: Long` - ID газа
- `calcOrderId: Long` - ID заявки
- `concentration: Double` - Концентрация газа
- `temperature: Double` - Температура газа

#### User (Пользователь)
- `id: Long` - Уникальный идентификатор
- `login: String` - Логин (уникальный)
- `password: String` - Пароль
- `email: String?` - Email
- `firstName: String?` - Имя
- `lastName: String?` - Фамилия

## API Endpoints

### Услуги (Газы) - `/api/gases`

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/gases` | Список услуг с фильтрацией |
| GET | `/api/gases/{id}` | Получить одну услугу |
| POST | `/api/gases` | Создать новую услугу |
| PUT | `/api/gases/{id}` | Обновить услугу |
| DELETE | `/api/gases/{id}` | Удалить услугу |
| POST | `/api/gases/{id}/image` | Загрузить изображение |

**Фильтрация услуг:**
- `name` - фильтр по названию
- `formula` - фильтр по формуле
- `page` - номер страницы (по умолчанию 0)
- `size` - размер страницы (по умолчанию 20)

### Заявки (Заказы) - `/api/orders`

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/orders/cart-icon` | Иконка корзины |
| GET | `/api/orders` | Список заявок с фильтрацией |
| GET | `/api/orders/{id}` | Получить одну заявку |
| PUT | `/api/orders/{id}` | Обновить заявку |
| PUT | `/api/orders/{id}/form` | Сформировать заявку |
| PUT | `/api/orders/{id}/complete` | Завершить заявку |
| DELETE | `/api/orders/{id}` | Удалить заявку |
| POST | `/api/orders/{id}/gases` | Добавить услугу в заявку |
| PUT | `/api/orders/{orderId}/gases/{gasId}` | Обновить услугу в заявке |
| DELETE | `/api/orders/{orderId}/gases/{gasId}` | Удалить услугу из заявки |

**Фильтрация заявок:**
- `status` - фильтр по статусу (COMPLETED)
- `formedDateFrom` - дата формирования от
- `formedDateTo` - дата формирования до
- `page` - номер страницы
- `size` - размер страницы

### Пользователи - `/api/users`

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/api/users/register` | Регистрация пользователя |
| POST | `/api/users/login` | Аутентификация |
| POST | `/api/users/logout` | Деавторизация |
| GET | `/api/users/profile` | Профиль пользователя |
| PUT | `/api/users/profile` | Обновить профиль |

## Бизнес-логика

### Статусы заявок

1. **DRAFT** - Черновик (корзина)
   - Можно добавлять/удалять услуги
   - Можно изменять описание
   - Можно сформировать

2. **COMPLETED** - Сформированная заявка
   - Нельзя изменять состав
   - Можно завершить (расчет температуры)

3. **DELETED** - Удаленная заявка
   - Не отображается в списках
   - Логическое удаление

### Переходы статусов

- DRAFT → COMPLETED (формирование)
- COMPLETED → DELETED (завершение с расчетом)
- DRAFT → DELETED (удаление)

### Расчет температуры

При завершении заявки рассчитывается средневзвешенная температура:

```
tempResult = Σ(temperature * concentration) / Σ(concentration)
```

## Интеграция с Minio

### Загрузка изображений

1. Изображения загружаются в Minio bucket `gas-images`
2. Имена файлов генерируются: `gas_{gasId}_{timestamp}_{uuid}.{extension}`
3. URL изображений создаются с помощью presigned URLs (срок действия 7 дней)

### Удаление изображений

- При удалении услуги изображение автоматически удаляется из Minio
- При замене изображения старое удаляется

## Валидация

### Услуги
- `name` - обязательно, максимум 255 символов
- `formula` - обязательно, максимум 255 символов
- `detailedDescription` - обязательно

### Заявки
- `description` - максимум 500 символов

### Пользователи
- `login` - обязательно, 3-50 символов, уникальный
- `password` - обязательно, минимум 6 символов
- `email` - валидный email формат

## Обработка ошибок

Все API методы возвращают стандартизированные ответы:

```json
{
  "success": true/false,
  "data": {...},
  "message": "Описание операции",
  "error": "Описание ошибки"
}
```

### HTTP статусы

- `200 OK` - Успешная операция
- `201 Created` - Ресурс создан
- `400 Bad Request` - Ошибка валидации
- `401 Unauthorized` - Не авторизован
- `404 Not Found` - Ресурс не найден
- `409 Conflict` - Конфликт (например, дублирующийся логин)
- `500 Internal Server Error` - Внутренняя ошибка сервера

## Тестирование

### Postman/Insomnia

Используйте коллекцию `Gas-Temperature-Calculator-API.postman_collection.json` для тестирования всех endpoints.

### Примеры запросов

#### Создание услуги
```bash
POST /api/gases
Content-Type: application/json

{
  "name": "H₂ (Водород)",
  "formula": "H₂",
  "detailedDescription": "Водород - самый легкий химический элемент"
}
```

#### Добавление услуги в заявку
```bash
POST /api/orders/1/gases
Content-Type: application/json

{
  "gasId": 1,
  "concentration": 0.04,
  "temperature": 15.0
}
```

#### Формирование заявки
```bash
PUT /api/orders/1/form
```

## Конфигурация

### application.yml

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/my_database
    username: my_user
    password: my_password

minio:
  endpoint: http://localhost:9000
  access-key: minioadmin
  secret-key: minioadmin
  bucket-name: gas-images
```

### Зависимости

- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL
- Minio Java SDK
- Validation API

## Развертывание

1. Запустить PostgreSQL и Minio
2. Выполнить SQL скрипты инициализации
3. Запустить Spring Boot приложение
4. Импортировать коллекцию Postman для тестирования

## Контрольные вопросы

### Веб-сервис
- REST архитектура
- HTTP методы (GET, POST, PUT, DELETE)
- Статус коды HTTP
- JSON формат данных

### REST vs RPC
- REST: ресурсо-ориентированный, HTTP методы
- RPC: процедурно-ориентированный, вызов функций

### HTTP заголовки
- `Content-Type: application/json`
- `Authorization: Bearer token`
- `Accept: application/json`

### Версии HTTP
- HTTP/1.1 - текущая версия
- HTTP/2 - улучшенная производительность
- HTTP/3 - на основе QUIC

### HTTPS
- Шифрование TLS/SSL
- Аутентификация сертификатов
- Защита данных в транзите

### OSI модель
- 7 уровней: Physical, Data Link, Network, Transport, Session, Presentation, Application
- HTTP работает на уровне Application (7)
- TCP на уровне Transport (4)
