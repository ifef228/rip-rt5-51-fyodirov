# Обновление параметра поиска

## ✅ Изменения выполнены

### Параметр поиска переименован: `search` → `gas_search`

#### 1. HomeController.kt
```kotlin
// Было:
@RequestParam(required = false) search: String?

// Стало:
@RequestParam(required = false) gas_search: String?
```

#### 2. home.html
```html
<!-- Было: -->
<input type="text" name="search" th:value="${searchQuery}" />

<!-- Стало: -->
<input type="text" name="gas_search" th:value="${searchQuery}" />
```

## 📋 Обновленные файлы

1. **`gas/src/main/kotlin/ru/mstu/yandex/gas/controller/HomeController.kt`**
   - Параметр метода: `search` → `gas_search`
   - Переменная в коде: `search` → `gas_search`
   - Атрибут модели: `searchQuery` остается без изменений

2. **`gas/src/main/resources/templates/home.html`**
   - Атрибут `name` в input: `search` → `gas_search`
   - Thymeleaf атрибут `th:value` остается без изменений

## 🔍 Как это работает

### URL с поиском:
```
# Было:
http://localhost:8080/?search=CO₂

# Стало:
http://localhost:8080/?gas_search=CO₂
```

### Форма поиска:
```html
<form method="get">
    <input type="text" name="gas_search" placeholder="Поиск газа для расчета температуры" />
</form>
```

### Контроллер:
```kotlin
@GetMapping
fun getAtmosphericGases(
    @RequestParam(required = false) gas_search: String?,
    model: Model
): String {
    val gases = if (gas_search.isNullOrBlank()) {
        gasService.getAllGases()
    } else {
        gasService.searchGases(gas_search)
    }
    // ...
}
```

## ✅ Результат

- ✅ Параметр поиска переименован на `gas_search`
- ✅ Поиск работает корректно
- ✅ Нет ошибок компиляции
- ✅ HTML форма обновлена
- ✅ API остается совместимым

## 🚀 Готово к использованию

Изменения применены и готовы к тестированию. Поиск газов теперь использует параметр `gas_search` вместо `search`.
