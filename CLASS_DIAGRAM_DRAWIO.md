# Диаграмма классов для draw.io

## 🏗️ Структура диаграммы классов

### **1. Entity Layer (Слой сущностей)**

#### **Gas (Услуга/Газ)**
```
┌─────────────────────────────────┐
│            Gas                  │
├─────────────────────────────────┤
│ - id: Long?                     │
│ - name: String                  │
│ - formula: String               │
│ - detailedDescription: String   │
│ - imageUrl: String?             │
├─────────────────────────────────┤
│ + Gas()                         │
│ + copy(): Gas                   │
└─────────────────────────────────┘
```

#### **CalcOrder (Заявка/Заказ)**
```
┌─────────────────────────────────┐
│          CalcOrder              │
├─────────────────────────────────┤
│ - id: Long?                     │
│ - userId: Long?                 │
│ - tempResult: Double?           │
│ - timestamp: LocalDateTime      │
│ - status: OrderStatus           │
│ - description: String?          │
├─────────────────────────────────┤
│ + CalcOrder()                   │
│ + copy(): CalcOrder             │
└─────────────────────────────────┘
```

#### **GasOrder (Связь Газ-Заявка)**
```
┌─────────────────────────────────┐
│          GasOrder               │
├─────────────────────────────────┤
│ - id: Long?                     │
│ - gasId: Long                   │
│ - calcOrderId: Long?            │
│ - concentration: Double         │
│ - temperature: Double           │
├─────────────────────────────────┤
│ + GasOrder()                    │
│ + copy(): GasOrder              │
└─────────────────────────────────┘
```

#### **User (Пользователь)**
```
┌─────────────────────────────────┐
│            User                 │
├─────────────────────────────────┤
│ - id: Long?                     │
│ - login: String                 │
│ - password: String              │
│ - email: String?                │
│ - firstName: String?            │
│ - lastName: String?             │
├─────────────────────────────────┤
│ + User()                        │
│ + copy(): User                  │
└─────────────────────────────────┘
```

#### **OrderStatus (Статус заявки)**
```
┌─────────────────────────────────┐
│        OrderStatus              │
├─────────────────────────────────┤
│ + DRAFT: OrderStatus            │
│ + COMPLETED: OrderStatus        │
│ + DELETED: OrderStatus          │
└─────────────────────────────────┘
```

---

### **2. DTO Layer (Слой передачи данных)**

#### **ApiResponse (Стандартизированный ответ)**
```
┌─────────────────────────────────┐
│        ApiResponse<T>           │
├─────────────────────────────────┤
│ - success: Boolean              │
│ - message: String?              │
│ - data: T?                      │
│ - total: Long?                  │
│ - page: Int?                    │
│ - size: Int?                    │
├─────────────────────────────────┤
│ + success(): ApiResponse<T>     │
│ + error(): ApiResponse<T>       │
└─────────────────────────────────┘
```

#### **Gas DTOs**
```
┌─────────────────────────────────┐
│        CreateGasDto             │
├─────────────────────────────────┤
│ - name: String                  │
│ - formula: String               │
│ - detailedDescription: String   │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        UpdateGasDto             │
├─────────────────────────────────┤
│ - name: String?                 │
│ - formula: String?              │
│ - detailedDescription: String?  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│       GasResponseDto            │
├─────────────────────────────────┤
│ - id: Long                      │
│ - name: String                  │
│ - formula: String               │
│ - detailedDescription: String   │
│ - imageUrl: String?             │
│ - createdAt: String?            │
│ - updatedAt: String?            │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        GasFilterDto             │
├─────────────────────────────────┤
│ - name: String?                 │
│ - formula: String?              │
└─────────────────────────────────┘
```

#### **Order DTOs**
```
┌─────────────────────────────────┐
│       OrderResponseDto          │
├─────────────────────────────────┤
│ - id: Long                      │
│ - userId: Long                  │
│ - tempResult: Double?           │
│ - timestamp: LocalDateTime      │
│ - status: String                │
│ - description: String?          │
│ - gasOrders: List<GasOrder...>  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│    GasOrderResponseDto          │
├─────────────────────────────────┤
│ - id: Long                      │
│ - gasId: Long                   │
│ - gasName: String               │
│ - gasFormula: String            │
│ - gasImageUrl: String?          │
│ - concentration: Double         │
│ - temperature: Double           │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        UpdateOrderDto           │
├─────────────────────────────────┤
│ - description: String?          │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│      AddGasToOrderDto           │
├─────────────────────────────────┤
│ - gasId: Long                   │
│ - concentration: Double         │
│ - temperature: Double           │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│     UpdateGasInOrderDto         │
├─────────────────────────────────┤
│ - concentration: Double?        │
│ - temperature: Double?          │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        OrderFilterDto           │
├─────────────────────────────────┤
│ - status: String?               │
│ - startDate: LocalDateTime?     │
│ - endDate: LocalDateTime?       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        CartIconDto              │
├─────────────────────────────────┤
│ - orderId: Long?                │
│ - itemCount: Int                │
└─────────────────────────────────┘
```

#### **User DTOs**
```
┌─────────────────────────────────┐
│      RegisterUserDto            │
├─────────────────────────────────┤
│ - login: String                 │
│ - password: String              │
│ - email: String?                │
│ - firstName: String?            │
│ - lastName: String?             │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        LoginUserDto             │
├─────────────────────────────────┤
│ - login: String                 │
│ - password: String              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│      UserResponseDto            │
├─────────────────────────────────┤
│ - id: Long                      │
│ - login: String                 │
│ - email: String?                │
│ - firstName: String?            │
│ - lastName: String?             │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│        UpdateUserDto            │
├─────────────────────────────────┤
│ - email: String?                │
│ - firstName: String?            │
│ - lastName: String?             │
└─────────────────────────────────┘
```

---

### **3. Repository Layer (Слой доступа к данным)**

#### **GasRepository**
```
┌─────────────────────────────────┐
│       GasRepository             │
├─────────────────────────────────┤
│ + findByNameContainingIgnoreCase│
│ + findByFormulaContainingIgnore │
│ + findByNameAndFormulaContaining│
│ + countByNameContainingIgnore   │
│ + countByFormulaContainingIgnore│
│ + countByNameAndFormulaContaining│
└─────────────────────────────────┘
```

#### **CalcOrderRepository**
```
┌─────────────────────────────────┐
│     CalcOrderRepository         │
├─────────────────────────────────┤
│ + findByUserIdAndStatusAndTemp  │
│ + findByStatusOrderByTimestamp  │
│ + findByStatusNotOrderByTimestamp│
│ + countByStatus()               │
│ + countByStatusNot()            │
└─────────────────────────────────┘
```

#### **GasOrderRepository**
```
┌─────────────────────────────────┐
│     GasOrderRepository          │
├─────────────────────────────────┤
│ + findByCalcOrderId()           │
│ + findByCalcOrderIdAndGasId()   │
│ + deleteByCalcOrderId()         │
└─────────────────────────────────┘
```

#### **UserRepository**
```
┌─────────────────────────────────┐
│       UserRepository            │
├─────────────────────────────────┤
│ + findByLogin()                 │
└─────────────────────────────────┘
```

---

### **4. Service Layer (Слой бизнес-логики)**

#### **GasService**
```
┌─────────────────────────────────┐
│         GasService              │
├─────────────────────────────────┤
│ - gasRepository: GasRepository  │
│ - gasOrderRepository: GasOrder..│
├─────────────────────────────────┤
│ + getAllGases(): List<GasModel> │
│ + searchGases(): List<GasModel> │
│ + getGasById(): GasModel?       │
│ + getGasEntityById(): Gas?      │
│ + saveGas(): Gas                │
│ + deleteGas()                   │
│ + getAllGasesWithFilter()       │
│ + getGasesCount()               │
└─────────────────────────────────┘
```

#### **CartService**
```
┌─────────────────────────────────┐
│         CartService             │
├─────────────────────────────────┤
│ - gasOrderRepository: GasOrder..│
│ - calcOrderRepository: CalcOrder│
├─────────────────────────────────┤
│ + getActiveCart(): CalcOrder    │
│ + addToCart()                   │
│ + removeFromCart()              │
│ + getCartItemsCount(): Int      │
│ + isInCart(): Boolean           │
│ + clearCart()                   │
│ + updateOrder()                 │
│ + formOrder()                   │
│ + completeOrder()               │
│ + addGasToOrder()               │
│ + updateGasInOrder()            │
│ + removeGasFromOrder()          │
│ + getOrdersWithFilter()         │
│ + getOrdersCount()              │
└─────────────────────────────────┘
```

#### **UserService**
```
┌─────────────────────────────────┐
│         UserService             │
├─────────────────────────────────┤
│ - userRepository: UserRepository│
├─────────────────────────────────┤
│ + registerUser(): User          │
│ + authenticateUser(): String?   │
│ + getUserById(): User?          │
│ + updateUser(): User?           │
└─────────────────────────────────┘
```

#### **MinioService**
```
┌─────────────────────────────────┐
│        MinioService             │
├─────────────────────────────────┤
│ - minioClient: MinioClient      │
├─────────────────────────────────┤
│ + uploadImage(): String         │
│ + deleteImage()                 │
│ + getImageUrl(): String         │
│ + extractFileNameFromUrl()      │
└─────────────────────────────────┘
```

---

### **5. Controller Layer (Слой контроллеров)**

#### **GasApiController**
```
┌─────────────────────────────────┐
│      GasApiController           │
├─────────────────────────────────┤
│ - gasService: GasService        │
│ - minioService: MinioService    │
├─────────────────────────────────┤
│ + getAllGases(): ResponseEntity │
│ + getGas(): ResponseEntity      │
│ + createGas(): ResponseEntity   │
│ + updateGas(): ResponseEntity   │
│ + deleteGas(): ResponseEntity   │
│ + uploadGasImage(): ResponseEntity│
└─────────────────────────────────┘
```

#### **OrderApiController**
```
┌─────────────────────────────────┐
│      OrderApiController         │
├─────────────────────────────────┤
│ - cartService: CartService      │
│ - gasService: GasService        │
├─────────────────────────────────┤
│ + getCartIcon(): ResponseEntity │
│ + getOrders(): ResponseEntity   │
│ + getOrder(): ResponseEntity    │
│ + updateOrder(): ResponseEntity │
│ + formOrder(): ResponseEntity   │
│ + completeOrder(): ResponseEntity│
│ + deleteOrder(): ResponseEntity │
│ + addGasToOrder(): ResponseEntity│
│ + updateGasInOrder(): ResponseEntity│
│ + removeGasFromOrder(): ResponseEntity│
└─────────────────────────────────┘
```

#### **UserApiController**
```
┌─────────────────────────────────┐
│      UserApiController          │
├─────────────────────────────────┤
│ - userService: UserService      │
├─────────────────────────────────┤
│ + registerUser(): ResponseEntity│
│ + loginUser(): ResponseEntity   │
│ + logoutUser(): ResponseEntity  │
│ + getUserProfile(): ResponseEntity│
│ + updateUserProfile(): ResponseEntity│
└─────────────────────────────────┘
```

---

## 🔗 Связи между классами

### **Наследование:**
- Все Repository наследуются от `JpaRepository<T, ID>`
- Все Controller наследуются от `@RestController`

### **Композиция:**
- `GasService` содержит `GasRepository` и `GasOrderRepository`
- `CartService` содержит `GasOrderRepository` и `CalcOrderRepository`
- `UserService` содержит `UserRepository`
- `GasApiController` содержит `GasService` и `MinioService`
- `OrderApiController` содержит `CartService` и `GasService`
- `UserApiController` содержит `UserService`

### **Ассоциация:**
- `Gas` → `GasOrder` (One-to-Many)
- `CalcOrder` → `GasOrder` (One-to-Many)
- `User` → `CalcOrder` (One-to-Many)
- `GasOrder` → `Gas` (Many-to-One)
- `GasOrder` → `CalcOrder` (Many-to-One)
- `CalcOrder` → `User` (Many-to-One)

---

## 📊 Инструкция для draw.io

### **1. Создание диаграммы:**
1. Откройте draw.io
2. Создайте новую диаграмму
3. Выберите "UML Class Diagram" или "Blank Diagram"

### **2. Добавление классов:**
1. Используйте элемент "Class" из панели UML
2. Добавьте все классы согласно описанию выше
3. Разместите их по слоям (Entity, DTO, Repository, Service, Controller)

### **3. Добавление связей:**
1. Используйте стрелки для показа связей
2. **Composition** (заполненный ромб) - для композиции
3. **Association** (простая стрелка) - для ассоциации
4. **Inheritance** (пустой треугольник) - для наследования

### **4. Цветовая схема:**
- **Entity** - светло-голубой
- **DTO** - светло-зеленый
- **Repository** - светло-желтый
- **Service** - светло-оранжевый
- **Controller** - светло-розовый

### **5. Группировка:**
- Создайте группы для каждого слоя
- Добавьте заголовки слоев
- Используйте границы для разделения слоев

---

## 🎯 Ключевые особенности архитектуры

### **1. Разделение ответственности:**
- **Entity** - модель данных
- **DTO** - передача данных
- **Repository** - доступ к данным
- **Service** - бизнес-логика
- **Controller** - HTTP обработка

### **2. Паттерны:**
- **Repository Pattern** - абстракция доступа к данным
- **DTO Pattern** - передача данных между слоями
- **Service Layer Pattern** - бизнес-логика
- **RESTful API** - стандартизированные HTTP методы

### **3. Принципы:**
- **Single Responsibility** - каждый класс имеет одну ответственность
- **Dependency Injection** - внедрение зависимостей
- **Interface Segregation** - разделение интерфейсов
- **Open/Closed** - открыт для расширения, закрыт для модификации

---

## ✅ Готово для draw.io!

Это описание содержит все необходимые классы, их атрибуты, методы и связи для создания полной диаграммы классов вашего API системы расчета температуры газов.
