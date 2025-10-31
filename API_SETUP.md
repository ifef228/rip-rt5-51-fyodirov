# Настройка и запуск API

## Предварительные требования

1. **Java 21** - для компиляции Kotlin кода
2. **PostgreSQL** - база данных
3. **Minio** - для хранения изображений
4. **Docker** (опционально) - для быстрого развертывания

## Быстрый запуск с Docker

### 1. Запуск инфраструктуры

```bash
cd infra
./start.sh
```

Это запустит:
- PostgreSQL на порту 5432
- Minio на порту 9000
- Adminer на порту 8081

### 2. Инициализация базы данных

```bash
# Подключитесь к PostgreSQL через Adminer или psql
# URL: http://localhost:8081
# Сервер: postgres
# Пользователь: my_user
# Пароль: my_password
# База данных: my_database

# Выполните SQL скрипты:
# 1. infra/sql/init.sql - создание схемы
# 2. infra/sql/test-data.sql - тестовые данные
# 3. infra/sql/update-schema-for-api.sql - обновление для API
```

### 3. Запуск приложения

```bash
cd gas
./gradlew bootRun
```

Приложение будет доступно на http://localhost:8080

## Ручная настройка

### 1. PostgreSQL

```bash
# Создание базы данных
createdb my_database

# Выполнение SQL скриптов
psql -d my_database -f infra/sql/init.sql
psql -d my_database -f infra/sql/test-data.sql
psql -d my_database -f infra/sql/update-schema-for-api.sql
```

### 2. Minio

```bash
# Установка Minio
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio

# Запуск Minio
./minio server /tmp/minio --console-address ":9001"
```

Или через Docker:
```bash
docker run -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  minio/minio server /data --console-address ":9001"
```

### 3. Приложение

```bash
cd gas
./gradlew build
./gradlew bootRun
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

### Переменные окружения

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/my_database
export SPRING_DATASOURCE_USERNAME=my_user
export SPRING_DATASOURCE_PASSWORD=my_password
export MINIO_ENDPOINT=http://localhost:9000
export MINIO_ACCESS_KEY=minioadmin
export MINIO_SECRET_KEY=minioadmin
```

## Тестирование API

### 1. Импорт коллекции Postman

1. Откройте Postman
2. Импортируйте файл `Gas-Temperature-Calculator-API.postman_collection.json`
3. Установите переменную `baseUrl` = `http://localhost:8080/api`

### 2. Последовательность тестирования

#### Шаг 1: Регистрация пользователя
```
POST /api/users/register
{
  "login": "testuser",
  "password": "password123",
  "email": "test@example.com",
  "firstName": "Тест",
  "lastName": "Пользователь"
}
```

#### Шаг 2: Аутентификация
```
POST /api/users/login
{
  "login": "testuser",
  "password": "password123"
}
```

#### Шаг 3: Получение списка услуг
```
GET /api/gases?page=0&size=20
```

#### Шаг 4: Создание новой услуги
```
POST /api/gases
{
  "name": "H₂ (Водород)",
  "formula": "H₂",
  "detailedDescription": "Водород - самый легкий химический элемент"
}
```

#### Шаг 5: Загрузка изображения
```
POST /api/gases/{id}/image
Content-Type: multipart/form-data
file: [выберите изображение]
```

#### Шаг 6: Получение иконки корзины
```
GET /api/gas-orders/cart-icon
```

#### Шаг 7: Добавление услуги в заявку
```
POST /api/gas-orders/{orderId}/gases
{
  "gasId": 1,
  "concentration": 0.04,
  "temperature": 15.0
}
```

#### Шаг 8: Формирование заявки
```
PUT /api/gas-orders/{orderId}/form
```

#### Шаг 9: Завершение заявки
```
PUT /api/gas-orders/{orderId}/complete
```

#### Шаг 10: Получение списка заявок
```
GET /api/gas-orders?status=COMPLETED&page=0&size=20
```

## Проверка работоспособности

### 1. Проверка базы данных

```sql
-- Проверка таблиц
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Проверка данных
SELECT COUNT(*) FROM gas;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM calc_order;
SELECT COUNT(*) FROM gas_order;
```

### 2. Проверка Minio

1. Откройте http://localhost:9001
2. Логин: minioadmin
3. Пароль: minioadmin
4. Проверьте наличие bucket `gas-images`

### 3. Проверка API

```bash
# Проверка здоровья приложения
curl http://localhost:8080/api/gases

# Проверка иконки корзины
curl http://localhost:8080/api/gas-orders/cart-icon
```

## Устранение неполадок

### Ошибка подключения к базе данных

```
org.postgresql.util.PSQLException: Connection refused
```

**Решение:**
1. Проверьте, что PostgreSQL запущен
2. Проверьте настройки подключения в application.yml
3. Проверьте, что база данных создана

### Ошибка подключения к Minio

```
io.minio.errors.MinioException: Connection refused
```

**Решение:**
1. Проверьте, что Minio запущен на порту 9000
2. Проверьте настройки Minio в application.yml
3. Проверьте доступность endpoint

### Ошибки компиляции Kotlin

```
Unresolved reference: formula
```

**Решение:**
1. Убедитесь, что используется Java 21
2. Выполните `./gradlew clean build`
3. Проверьте, что все entity правильно настроены

### Ошибки валидации

```
jakarta.validation.ConstraintViolationException
```

**Решение:**
1. Проверьте входные данные в запросе
2. Убедитесь, что все обязательные поля заполнены
3. Проверьте ограничения валидации в DTO

## Логирование

### Включение debug логов

```yaml
logging:
  level:
    ru.mstu.yandex.gas: DEBUG
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
```

### Просмотр логов

```bash
# Логи приложения
tail -f logs/application.log

# Логи Gradle
./gradlew bootRun --info
```

## Производительность

### Настройка пула соединений

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
```

### Настройка JPA

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        jdbc:
          batch_size: 20
        order_inserts: true
        order_updates: true
```

## Безопасность

### В продакшене

1. Измените пароли по умолчанию
2. Используйте HTTPS
3. Настройте CORS
4. Добавьте аутентификацию JWT
5. Ограничьте доступ к Minio

### Пример конфигурации безопасности

```yaml
# application-prod.yml
spring:
  datasource:
    password: ${DB_PASSWORD}

minio:
  access-key: ${MINIO_ACCESS_KEY}
  secret-key: ${MINIO_SECRET_KEY}
```

## Мониторинг

### Health Check

```bash
curl http://localhost:8080/actuator/health
```

### Метрики

```bash
curl http://localhost:8080/actuator/metrics
```

## Резервное копирование

### База данных

```bash
pg_dump my_database > backup.sql
```

### Minio

```bash
mc mirror minio/gas-images ./backup-images/
```
