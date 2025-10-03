# Тестирование корзины и страницы расчета

## 🧪 Что было исправлено

### 1. CartService
- Добавлен метод `getActiveCartPublic()` для получения активной корзины
- Добавлен метод `getGasOrdersForCart(calcOrderId)` для получения газов из корзины
- Обновлен метод `getCartGases()` для возврата реальных данных из базы

### 2. CalculationController
- Обновлен для получения реальных данных из базы
- Использует `cartService.getActiveCartPublic()` и `cartService.getGasOrdersForCart()`
- Передает реальные концентрации и температуры для расчета

## 🔍 Как проверить

### 1. Запустить приложение
```bash
cd gas
./gradlew bootRun
```

### 2. Очистить корзину (если нужно)
```bash
curl -X POST http://localhost:8080/debug/cart/clear
```

### 3. Проверить состояние корзины
```bash
curl http://localhost:8080/debug/cart/status
```

### 4. Добавить газы в корзину
- Открыть http://localhost:8080
- Добавить несколько газов в корзину
- Проверить, что счетчик корзины обновился

### 5. Перейти в корзину
- Нажать на иконку корзины
- Проверить, что отображаются реальные данные из базы:
  - Названия газов
  - Концентрации (из базы данных)
  - Температуры (из базы данных)
  - Рассчитанная температура

### 6. Выполнить расчет
- Нажать кнопку "Рассчитать температуру"
- Проверить, что расчет сохранился в базу
- Проверить, что корзина очистилась

## 📊 Структура данных

### GasOrder (из базы):
```kotlin
data class GasOrder(
    val id: Long,
    val gasId: Long,
    val calcOrderId: Long,
    val concentration: Int, // в процентах * 100 (например, 4 для 0.04%)
    val temperature: Int    // в градусах Цельсия
)
```

### SimpleGasModel (для отображения):
```kotlin
data class SimpleGasModel(
    val id: Long,
    val name: String,
    val concentration: String, // "4%"
    val temperature: String,   // "15°C"
    val image: String
)
```

## 🐛 Возможные проблемы

1. **Корзина пуста, но показывает газы:**
   - Проверить, что `getCartItems()` возвращает правильные ID
   - Проверить, что `getActiveCart()` находит корзину

2. **Неправильные концентрации/температуры:**
   - Проверить, что `getGasOrdersForCart()` возвращает правильные данные
   - Проверить, что `getDefaultConcentration()` работает правильно

3. **Расчет не работает:**
   - Проверить, что `calculationService.calculateTemperature()` получает правильные данные
   - Проверить логи в консоли

## 🔧 API для отладки

### Проверить состояние корзины:
```bash
curl http://localhost:8080/debug/cart/status
```

### Очистить корзину:
```bash
curl -X POST http://localhost:8080/debug/cart/clear
```

### Добавить газ в корзину:
```bash
curl -X POST http://localhost:8080/debug/cart/add/1
```

### Проверить API корзины:
```bash
curl http://localhost:8080/api/cart/count
curl http://localhost:8080/api/cart/items
```
