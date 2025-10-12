# Изменения по заданию

## Выполненные исправления

### 1. ✅ Удаление заявки полностью
- **Было**: Удаление каждого айтема по отдельности
- **Стало**: Удаление всей заявки целиком через логическое удаление (изменение статуса на DELETED)
- **Реализация**:
  - Добавлено поле `status` в модель `CalcOrder`
  - Создан raw SQL запрос для логического удаления: `UPDATE calc_order SET status = 'DELETED' WHERE id = ? AND user_id = ?`
  - Метод `deleteOrder()` в `CartService` использует raw SQL

### 2. ✅ Переделка запросов: 4 через ORM и 1 через raw SQL
- **4 запроса через ORM**:
  1. `GET /` - Поиск и получение газов (`GasService.getAllGases()`, `GasService.searchGases()`)
  2. `GET /pressure-orders/current` - Просмотр текущей заявки (`CartService.getActiveCartPublic()`)
  3. `GET /pressure-orders/{id}` - Просмотр заявки по ID (`CartService.getOrderById()`)
  4. `POST /api/pressure-cart/add/{gasId}` - Добавление газа в заявку (`CartService.addToCart()`)

- **1 запрос через raw SQL**:
  1. `POST /pressure-orders/{id}/delete` - Удаление заявки (`CalcOrderRepository.deleteOrderByIdAndUserId()`)

### 3. ✅ Переименование страниц и запросов по теме gas/pressure/air pressure
- **Контроллеры**:
  - `HomeController` → `getAtmosphericGases()` - поиск газов для расчета атмосферного давления
  - `CartController` → `PressureCartController` - работа с заявками на расчет давления
  - `CalculationController` → `PressureCalculationController` - расчет атмосферного давления
  - `PressureOrderController` - новый контроллер для работы с заявками

- **URL маршруты**:
  - `/` → поиск газов для расчета атмосферного давления
  - `/api/pressure-cart/*` → API для заявок на расчет давления
  - `/pressure-calculation` → страница расчета атмосферного давления
  - `/pressure-orders/*` → управление заявками на расчет давления

- **Шаблоны**:
  - `home.html` → обновлен заголовок "Расчет атмосферного давления"
  - `pressure-order-detail.html` → детали заявки по ID
  - `pressure-orders-list.html` → список заявок
  - `pressure-order-current.html` → текущая заявка

### 4. ✅ Добавление описательного поля даты в заявке
- **Модель**: Добавлено поле `description` в `CalcOrder`
- **База данных**: Добавлен столбец `description VARCHAR(500)`
- **Автозаполнение**: При создании заявки автоматически добавляется описание "Корзина для расчета атмосферного давления"
- **При расчете**: Описание обновляется на "Расчет атмосферного давления от {дата}"

### 5. ✅ Изменение цвета корзины когда пустая и неактивность
- **CSS**: Добавлен класс `.gas_cart_empty` с серым цветом и `cursor: not-allowed`
- **JavaScript**: Корзина становится неактивной когда `getCartItemsCount() === 0`
- **Визуальные изменения**:
  - Пустая корзина: серый цвет (#cccccc), неактивная
  - Полная корзина: оранжевый цвет (#ff6900), активная с hover эффектами

### 6. ✅ Открытие заявки по ID заявки
- **Новый маршрут**: `GET /pressure-orders/{id}` - просмотр заявки по ID
- **Контроллер**: `PressureOrderController.getOrderById()`
- **Шаблон**: `pressure-order-detail.html` - детальное отображение заявки
- **Функциональность**:
  - Отображение информации о заявке (ID, статус, дата, описание, результат)
  - Список газов в заявке с их параметрами
  - Кнопка "Назад к газам"

## Структура базы данных

### Обновленная таблица `calc_order`
```sql
CREATE TABLE calc_order (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER,
    temp_result DECIMAL(10,2),
    timestamp TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',  -- НОВОЕ ПОЛЕ
    description VARCHAR(500),                      -- НОВОЕ ПОЛЕ

    FOREIGN KEY (user_id) REFERENCES "users"(id)
);
```

### Статусы заявок
- `DRAFT` - Черновик (корзина)
- `COMPLETED` - Завершен
- `DELETED` - Удален (логическое удаление)

## API Endpoints

### GET запросы (через ORM)
1. `GET /` - Поиск и получение газов
2. `GET /pressure-orders/current` - Просмотр текущей заявки
3. `GET /pressure-orders/{id}` - Просмотр заявки по ID
4. `GET /pressure-orders` - Список всех заявок

### POST запросы
1. `POST /api/pressure-cart/add/{gasId}` - Добавление газа в заявку (ORM)
2. `POST /pressure-orders/{id}/delete` - Удаление заявки (raw SQL)

## Файлы для обновления базы данных

Для обновления существующей базы данных выполните:
```sql
-- Запустите скрипт update-schema.sql
\i infra/sql/update-schema.sql
```

## Тестирование

1. **Поиск газов**: Перейдите на главную страницу, используйте поиск
2. **Добавление в заявку**: Нажмите "в корзину" на любом газе
3. **Просмотр текущей заявки**: Перейдите по ссылке "Текущая заявка"
4. **Расчет давления**: Нажмите "Рассчитать" в текущей заявке
5. **Просмотр заявки по ID**: Перейдите по ссылке "Просмотр" в списке заявок
6. **Удаление заявки**: Нажмите "Удалить" в списке заявок
7. **Пустая корзина**: Убедитесь, что корзина серая и неактивная когда пуста
