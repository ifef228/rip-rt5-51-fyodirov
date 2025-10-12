# Модели и сериализаторы API

## 🏗️ Архитектура моделей

### 1. Entity модели (JPA/Hibernate)

#### **Gas** - Услуга (Газ)
```kotlin
@Entity
@Table(name = "gas")
data class Gas(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "name", nullable = false)
    val name: String,

    @Column(name = "formula", nullable = false)
    val formula: String,

    @Column(name = "detailed_description", nullable = false)
    val detailedDescription: String,

    @Column(name = "image_url", length = 500)
    val imageUrl: String? = null
)
```

**Назначение:** Основная сущность для хранения информации о газах (услугах)

**Связи:**
- `@OneToMany` с `GasOrder` (один газ может быть в нескольких заявках)

---

#### **CalcOrder** - Заявка (Заказ)
```kotlin
@Entity
@Table(name = "calc_order")
data class CalcOrder(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "user_id")
    val userId: Long? = null,

    @Column(name = "temp_result")
    val tempResult: Double? = null,

    @Column(name = "timestamp", nullable = false)
    val timestamp: LocalDateTime,

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    val status: OrderStatus = OrderStatus.DRAFT,

    @Column(name = "description", length = 500)
    val description: String? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    val user: User? = null,

    @OneToMany(mappedBy = "calcOrder", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val gasOrders: List<GasOrder> = emptyList()
)
```

**Назначение:** Заявка на расчет температуры с газами

**Статусы:**
- `DRAFT` - Черновик (можно редактировать)
- `COMPLETED` - Сформированная (готов к завершению)
- `DELETED` - Удаленная (логическое удаление)

**Связи:**
- `@ManyToOne` с `User` (заявка принадлежит пользователю)
- `@OneToMany` с `GasOrder` (заявка содержит несколько газов)

---

#### **GasOrder** - Связь Газ-Заявка (Many-to-Many)
```kotlin
@Entity
@Table(name = "gas_order")
data class GasOrder(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "gas_id")
    val gasId: Long,

    @Column(name = "calc_order_id")
    val calcOrderId: Long? = null,

    @Column(name = "concentration", nullable = false)
    val concentration: Double,

    @Column(name = "temperature", nullable = false)
    val temperature: Double,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gas_id", insertable = false, updatable = false)
    val gas: Gas? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "calc_order_id", insertable = false, updatable = false)
    val calcOrder: CalcOrder? = null
)
```

**Назначение:** Связующая таблица между газом и заявкой с дополнительными полями

**Дополнительные поля:**
- `concentration` - Концентрация газа (Double)
- `temperature` - Температура газа (Double)

**Связи:**
- `@ManyToOne` с `Gas` (связь с газом)
- `@ManyToOne` с `CalcOrder` (связь с заявкой)

---

#### **User** - Пользователь
```kotlin
@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "login", nullable = false, unique = true, length = 50)
    val login: String,

    @Column(name = "password", nullable = false)
    val password: String,

    @Column(name = "email", length = 100)
    val email: String? = null,

    @Column(name = "first_name", length = 100)
    val firstName: String? = null,

    @Column(name = "last_name", length = 100)
    val lastName: String? = null,

    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    val calcOrders: List<CalcOrder> = emptyList()
)
```

**Назначение:** Пользователь системы

**Связи:**
- `@OneToMany` с `CalcOrder` (пользователь может иметь несколько заявок)

---

### 2. DTO модели (Data Transfer Objects)

#### **Стандартизированный ответ API**
```kotlin
data class ApiResponse<T>(
    val success: Boolean,
    val message: String? = null,
    val data: T? = null,
    val total: Long? = null,
    val page: Int? = null,
    val size: Int? = null
) {
    companion object {
        fun <T> success(data: T? = null, message: String = "Операция выполнена успешно", total: Long? = null, page: Int? = null, size: Int? = null): ApiResponse<T>
        fun <T> error(message: String = "Произошла ошибка"): ApiResponse<T>
    }
}
```

**Назначение:** Единообразный формат ответов API

**Поля:**
- `success` - Успешность операции
- `message` - Сообщение для пользователя
- `data` - Основные данные ответа
- `total` - Общее количество записей (для пагинации)
- `page` - Номер страницы
- `size` - Размер страницы

---

#### **DTO для Gas (Услуги)**

**CreateGasDto** - Создание услуги
```kotlin
data class CreateGasDto(
    @field:NotBlank(message = "Название газа не может быть пустым")
    @field:Size(max = 255, message = "Название газа не может превышать 255 символов")
    val name: String,

    @field:NotBlank(message = "Формула газа не может быть пустой")
    @field:Size(max = 255, message = "Формула газа не может превышать 255 символов")
    val formula: String,

    @field:NotBlank(message = "Подробное описание не может быть пустым")
    val detailedDescription: String
)
```

**UpdateGasDto** - Обновление услуги
```kotlin
data class UpdateGasDto(
    @field:Size(max = 255, message = "Название газа не может превышать 255 символов")
    val name: String?,

    @field:Size(max = 255, message = "Формула газа не может превышать 255 символов")
    val formula: String?,

    val detailedDescription: String?
)
```

**GasResponseDto** - Ответ с услугой
```kotlin
data class GasResponseDto(
    val id: Long,
    val name: String,
    val formula: String,
    val detailedDescription: String,
    val imageUrl: String?,
    val createdAt: String?,
    val updatedAt: String?
)
```

**GasFilterDto** - Фильтр для поиска
```kotlin
data class GasFilterDto(
    val name: String?,
    val formula: String?
)
```

---

#### **DTO для Order (Заявки)**

**OrderResponseDto** - Ответ с заявкой
```kotlin
data class OrderResponseDto(
    val id: Long,
    val userId: Long,
    val tempResult: Double?,
    val timestamp: LocalDateTime,
    val status: String,
    val description: String?,
    val gasOrders: List<GasOrderResponseDto> = emptyList()
)
```

**GasOrderResponseDto** - Ответ с связью газ-заявка
```kotlin
data class GasOrderResponseDto(
    val id: Long,
    val gasId: Long,
    val gasName: String,
    val gasFormula: String,
    val gasImageUrl: String?,
    val concentration: Double,
    val temperature: Double
)
```

**UpdateOrderDto** - Обновление заявки
```kotlin
data class UpdateOrderDto(
    val description: String?
)
```

**AddGasToOrderDto** - Добавление газа в заявку
```kotlin
data class AddGasToOrderDto(
    @field:NotNull(message = "ID газа не может быть пустым")
    val gasId: Long,

    @field:Min(value = 0, message = "Концентрация не может быть отрицательной")
    val concentration: Double,

    @field:Min(value = -273, message = "Температура не может быть ниже абсолютного нуля")
    val temperature: Double
)
```

**UpdateGasInOrderDto** - Обновление газа в заявке
```kotlin
data class UpdateGasInOrderDto(
    @field:Min(value = 0, message = "Концентрация не может быть отрицательной")
    val concentration: Double?,

    @field:Min(value = -273, message = "Температура не может быть ниже абсолютного нуля")
    val temperature: Double?
)
```

**OrderFilterDto** - Фильтр для заявок
```kotlin
data class OrderFilterDto(
    val status: String?,
    val startDate: LocalDateTime?,
    val endDate: LocalDateTime?
)
```

**CartIconDto** - Информация о корзине
```kotlin
data class CartIconDto(
    val orderId: Long?,
    val itemCount: Int
)
```

---

#### **DTO для User (Пользователи)**

**RegisterUserDto** - Регистрация пользователя
```kotlin
data class RegisterUserDto(
    @field:NotBlank(message = "Логин не может быть пустым")
    @field:Size(min = 3, max = 50, message = "Логин должен быть от 3 до 50 символов")
    val login: String,

    @field:NotBlank(message = "Пароль не может быть пустым")
    @field:Size(min = 6, max = 255, message = "Пароль должен быть от 6 до 255 символов")
    val password: String,

    @field:Email(message = "Некорректный формат email")
    val email: String?,

    val firstName: String?,
    val lastName: String?
)
```

**LoginUserDto** - Вход в систему
```kotlin
data class LoginUserDto(
    @field:NotBlank(message = "Логин не может быть пустым")
    val login: String,

    @field:NotBlank(message = "Пароль не может быть пустым")
    val password: String
)
```

**UserResponseDto** - Ответ с пользователем
```kotlin
data class UserResponseDto(
    val id: Long,
    val login: String,
    val email: String?,
    val firstName: String?,
    val lastName: String?
)
```

**UpdateUserDto** - Обновление пользователя
```kotlin
data class UpdateUserDto(
    @field:Email(message = "Некорректный формат email")
    val email: String?,

    val firstName: String?,
    val lastName: String?
)
```

---

## 🔄 Сериализация и десериализация

### 1. JSON сериализация

**Jackson** автоматически сериализует/десериализует:
- **Entity** → **JSON** (для ответов)
- **JSON** → **DTO** (для запросов)
- **DTO** → **JSON** (для ответов)

### 2. Валидация данных

**Bean Validation** проверяет:
- `@NotBlank` - поле не пустое
- `@Size` - размер строки
- `@Email` - формат email
- `@Min` - минимальное значение
- `@NotNull` - поле не null

### 3. Форматы данных

**JSON для запросов:**
```json
{
  "name": "H₂ (Водород)",
  "formula": "H₂",
  "detailedDescription": "Описание газа"
}
```

**JSON для ответов:**
```json
{
  "success": true,
  "message": "Операция выполнена успешно",
  "data": {
    "id": 1,
    "name": "H₂ (Водород)",
    "formula": "H₂",
    "detailedDescription": "Описание газа",
    "imageUrl": "http://localhost:9000/gas-images/gas-1-uuid.jpg"
  },
  "total": 1,
  "page": 0,
  "size": 10
}
```

**Multipart/form-data для файлов:**
```
Content-Type: multipart/form-data
file: [бинарные данные изображения]
```

---

## 🏛️ Архитектурные принципы

### 1. Разделение ответственности
- **Entity** - модель данных для БД
- **DTO** - модель данных для API
- **Controller** - обработка HTTP запросов
- **Service** - бизнес-логика
- **Repository** - доступ к данным

### 2. Валидация на разных уровнях
- **DTO** - валидация входных данных
- **Service** - бизнес-валидация
- **Entity** - валидация на уровне БД

### 3. Типизация данных
- **Double** для концентрации и температуры
- **LocalDateTime** для временных меток
- **Enum** для статусов заявок
- **Optional** для nullable полей

### 4. Безопасность
- **DTO** скрывает внутреннюю структуру Entity
- **Валидация** предотвращает некорректные данные
- **Типизация** предотвращает ошибки времени выполнения

---

## 📊 Примеры использования

### 1. Создание услуги
```kotlin
// Controller получает CreateGasDto
@PostMapping
fun createGas(@Valid @RequestBody createGasDto: CreateGasDto): ResponseEntity<ApiResponse<GasResponseDto>> {
    // Service преобразует DTO в Entity
    val newGas = Gas(
        name = createGasDto.name,
        formula = createGasDto.formula,
        detailedDescription = createGasDto.detailedDescription
    )
    val savedGas = gasService.saveGas(newGas)

    // Service преобразует Entity в DTO для ответа
    val gasDto = GasResponseDto(
        id = savedGas.id ?: 0L,
        name = savedGas.name,
        formula = savedGas.formula,
        detailedDescription = savedGas.detailedDescription,
        imageUrl = savedGas.imageUrl
    )
    return ResponseEntity.ok(ApiResponse.success(gasDto))
}
```

### 2. Получение списка с фильтрацией
```kotlin
@GetMapping
fun getAllGases(filter: GasFilterDto, pageable: Pageable): ResponseEntity<ApiResponse<List<GasResponseDto>>> {
    // Service применяет фильтры
    val gases = gasService.getAllGasesWithFilter(filter, pageable)
    val total = gasService.getGasesCount(filter)

    // Преобразование Entity в DTO
    val gasDtos = gases.map { gas ->
        GasResponseDto(
            id = gas.id ?: 0L,
            name = gas.name,
            formula = gas.formula,
            detailedDescription = gas.detailedDescription,
            imageUrl = gas.imageUrl
        )
    }
    return ResponseEntity.ok(ApiResponse.success(gasDtos, total = total))
}
```

---

## ✅ Преимущества архитектуры

1. **Типобезопасность** - компилятор проверяет типы
2. **Валидация** - автоматическая проверка данных
3. **Разделение** - четкое разделение слоев
4. **Переиспользование** - DTO можно использовать в разных контроллерах
5. **Документация** - модели служат документацией API
6. **Тестирование** - легко тестировать отдельные компоненты
7. **Безопасность** - скрытие внутренней структуры данных
