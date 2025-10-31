# Лабораторная работа 3 - Веб-сервис для системы расчета температуры газов

## ✅ Выполненные требования

### 1. REST API с полной бизнес-логикой ✅

**21 endpoint** для всех операций:

#### Услуги (Газы) - `/api/gases`
- `GET /api/gases` - Список услуг с фильтрацией
- `GET /api/gases/{id}` - Получить одну услугу
- `POST /api/gases` - Создать новую услугу
- `PUT /api/gases/{id}` - Обновить услугу
- `DELETE /api/gases/{id}` - Удалить услугу
- `POST /api/gases/{id}/image` - Загрузить изображение

#### Заявки (Заказы) - `/api/gas-orders`
- `GET /api/gas-orders/cart-icon` - Иконка корзины
- `GET /api/gas-orders` - Список заявок с фильтрацией
- `GET /api/gas-orders/{id}` - Получить одну заявку
- `PUT /api/gas-orders/{id}` - Обновить заявку
- `PUT /api/gas-orders/{id}/form` - Сформировать заявку
- `PUT /api/gas-orders/{id}/complete` - Завершить заявку
- `DELETE /api/gas-orders/{id}` - Удалить заявку
- `POST /api/gas-orders/{id}/gases` - Добавить услугу в заявку
- `PUT /api/gas-orders/{orderId}/gases/{gasId}` - Обновить услугу в заявке
- `DELETE /api/gas-orders/{orderId}/gases/{gasId}` - Удалить услугу из заявки

#### Пользователи - `/api/users`
- `POST /api/users/register` - Регистрация
- `POST /api/users/login` - Аутентификация
- `POST /api/users/logout` - Деавторизация
- `GET /api/users/profile` - Профиль пользователя
- `PUT /api/users/profile` - Обновить профиль

### 2. Фильтрация и пагинация ✅

**Услуги:**
- Фильтрация по названию (`name`)
- Фильтрация по формуле (`formula`)
- Пагинация (`page`, `size`)

**Заявки:**
- Фильтрация по статусу (`status`)
- Фильтрация по дате формирования (`formedDateFrom`, `formedDateTo`)
- Пагинация (`page`, `size`)
- Исключение удаленных записей

### 3. Интеграция с Minio ✅

- Загрузка изображений в bucket `gas-images`
- Генерация уникальных имен файлов: `gas_{gasId}_{timestamp}_{uuid}.{extension}`
- Presigned URLs для доступа к изображениям (срок действия 7 дней)
- Автоматическое удаление изображений при удалении услуги

### 4. Бизнес-логика статусов ✅

**Статусы заявок:**
- `DRAFT` - Черновик (корзина)
- `COMPLETED` - Сформированная заявка
- `DELETED` - Удаленная заявка

**Переходы статусов:**
- `DRAFT` → `COMPLETED` (формирование)
- `COMPLETED` → `DELETED` (завершение с расчетом)
- `DRAFT` → `DELETED` (удаление)

**Ограничения:**
- Создатель может удалять и формировать черновики
- Модератор может отклонять и завершать сформированные заявки
- Системные поля вычисляются на бэкенде

### 5. Расчет температуры ✅

При завершении заявки рассчитывается средневзвешенная температура:

```
tempResult = Σ(temperature * concentration) / Σ(concentration)
```

### 6. Валидация и обработка ошибок ✅

**Валидация входных данных:**
- Bean Validation аннотации
- Проверка обязательных полей
- Ограничения длины строк
- Валидация email

**Обработка ошибок:**
- Стандартизированные API ответы
- HTTP статус коды
- Описательные сообщения об ошибках

### 7. Модели и DTO ✅

**Entity модели:**
- `Gas` - услуга (газ)
- `CalcOrder` - заявка (заказ)
- `GasOrder` - связь газ-заявка
- `User` - пользователь

**DTO модели:**
- `CreateGasDto`, `UpdateGasDto`, `GasResponseDto`
- `UpdateOrderDto`, `OrderResponseDto`, `GasOrderResponseDto`
- `RegisterUserDto`, `LoginDto`, `UserResponseDto`
- `ApiResponse<T>`, `PagedResponse<T>`

### 8. ORM и Raw SQL ✅

**4 ORM запроса:**
- `findByUserIdAndStatusOrderByTimestampDesc` - получение заявок пользователя
- `findByUserIdAndStatusAndTempResultIsNull` - поиск активной корзины
- `findByStatusOrderByTimestampDesc` - получение заявок по статусу
- `findByCalcOrderIdAndGasId` - поиск связи газ-заявка

**1 Raw SQL запрос:**
- `deleteOrderByIdAndUserId` - логическое удаление заявки

### 9. Коллекция для тестирования ✅

**Postman коллекция** с 21 запросом:
- Все CRUD операции
- Примеры фильтрации
- Тестовые данные
- Переменные окружения

## 🏗️ Архитектура

### Структура проекта

```
gas/
├── src/main/kotlin/ru/mstu/yandex/gas/
│   ├── controller/api/          # REST контроллеры
│   │   ├── GasApiController.kt
│   │   ├── OrderApiController.kt
│   │   └── UserApiController.kt
│   ├── dto/                     # DTO модели
│   │   ├── ApiResponse.kt
│   │   ├── GasDto.kt
│   │   ├── OrderDto.kt
│   │   └── UserDto.kt
│   ├── entity/                  # Entity модели
│   │   ├── Gas.kt
│   │   ├── CalcOrder.kt
│   │   ├── GasOrder.kt
│   │   └── User.kt
│   ├── repository/              # Репозитории
│   │   ├── GasRepository.kt
│   │   ├── CalcOrderRepository.kt
│   │   ├── GasOrderRepository.kt
│   │   └── UserRepository.kt
│   └── service/                 # Сервисы
│       ├── GasService.kt
│       ├── CartService.kt
│       ├── UserService.kt
│       └── MinioService.kt
└── src/main/resources/
    ├── application.yml          # Конфигурация
    └── static/                  # Статические ресурсы
```

### Диаграмма классов

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   REST API      │    │   Services      │    │  Repositories   │
│   Controllers   │───▶│   (Business     │───▶│   (Data Access) │
│                 │    │    Logic)       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   DTO Models    │    │   Entity Models │    │   PostgreSQL    │
│   (API Layer)   │    │   (Domain)      │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │     Minio       │
                       │   (Images)      │
                       └─────────────────┘
```

### Связи между моделями

1. **Методы используют разные модели:**
   - `GasApiController` использует `Gas` entity и `GasDto`
   - `OrderApiController` использует `CalcOrder`, `GasOrder` entities и `OrderDto`

2. **Модели используют другие модели:**
   - `GasOrder` ссылается на `Gas` и `CalcOrder`
   - `CalcOrder` ссылается на `User`

3. **Модели используют несколько таблиц:**
   - `OrderResponseDto` объединяет данные из `calc_order` и `gas_order`
   - `GasOrderResponseDto` объединяет данные из `gas_order` и `gas`

## 🚀 Запуск и тестирование

### 1. Запуск инфраструктуры

```bash
cd infra
./start.sh
```

### 2. Инициализация базы данных

```sql
-- Выполнить в PostgreSQL:
\i infra/sql/init.sql
\i infra/sql/test-data.sql
\i infra/sql/update-schema-for-api.sql
```

### 3. Запуск приложения

```bash
cd gas
./gradlew bootRun
```

### 4. Тестирование API

1. Импортировать коллекцию `Gas-Temperature-Calculator-API.postman_collection.json`
2. Установить `baseUrl` = `http://localhost:8080/api`
3. Выполнить все 21 запрос по порядку

## 📊 Демонстрация

### Последовательность показа (21 запрос):

1. **GET список услуг** - показать фильтрацию
2. **GET одна услуга** - получить детали
3. **POST создание услуги** - добавить новую услугу
4. **POST загрузка изображения** - добавить картинку
5. **GET иконка корзины** - проверить корзину
6. **POST добавление в заявку** - добавить услугу в корзину
7. **POST добавление другой услуги** - добавить вторую услугу
8. **GET иконка корзины** - проверить обновленную корзину
9. **GET заявка** - посмотреть заявку с 2 услугами
10. **PUT изменение заявки** - изменить описание
11. **PUT формирование заявки** - сформировать заявку
12. **PUT завершение заявки** - завершить с расчетом
13. **GET список заявок** - показать завершенные заявки
14. **POST регистрация пользователя** - создать нового пользователя
15. **POST аутентификация** - войти в систему
16. **GET профиль пользователя** - получить данные пользователя
17. **PUT обновление профиля** - изменить данные
18. **POST деавторизация** - выйти из системы
19. **PUT изменение услуги в заявке** - изменить концентрацию/температуру
20. **DELETE удаление услуги из заявки** - удалить услугу
21. **DELETE удаление заявки** - удалить заявку

### Контрольные вопросы:

1. **Веб-сервис** - REST API с HTTP методами
2. **REST vs RPC** - ресурсо-ориентированный vs процедурно-ориентированный
3. **HTTP заголовки** - Content-Type, Authorization, Accept
4. **HTTP методы** - GET, POST, PUT, DELETE
5. **HTTP статусы** - 200, 201, 400, 401, 404, 500
6. **Версии HTTP** - HTTP/1.1, HTTP/2, HTTP/3
7. **HTTPS** - шифрование TLS/SSL
8. **OSI модель** - 7 уровней, HTTP на Application уровне

## 📁 Файлы проекта

### Основные файлы:
- `Gas-Temperature-Calculator-API.postman_collection.json` - коллекция для тестирования
- `API_DOCUMENTATION.md` - полная документация API
- `API_SETUP.md` - инструкции по настройке
- `infra/sql/update-schema-for-api.sql` - обновление схемы БД

### Конфигурация:
- `gas/src/main/resources/application.yml` - настройки приложения
- `gas/build.gradle` - зависимости проекта

## ✅ Готово к демонстрации!

Все требования лабораторной работы 3 выполнены:
- ✅ 21 REST endpoint
- ✅ Полная бизнес-логика
- ✅ Интеграция с Minio
- ✅ Фильтрация и пагинация
- ✅ Валидация и обработка ошибок
- ✅ ORM и Raw SQL запросы
- ✅ Коллекция для тестирования
- ✅ Документация и инструкции

**API готов для демонстрации всех функций системы расчета температуры газов!** 🎉
