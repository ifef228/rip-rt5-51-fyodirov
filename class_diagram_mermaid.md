# Mermaid Class Diagram для draw.io

## 🎯 Диаграмма классов в формате Mermaid

```mermaid
classDiagram
    %% Entity Layer
    class Gas {
        -Long id
        -String name
        -String formula
        -String detailedDescription
        -String imageUrl
        +Gas()
        +copy() Gas
    }

    class CalcOrder {
        -Long id
        -Long userId
        -Double tempResult
        -LocalDateTime timestamp
        -OrderStatus status
        -String description
        +CalcOrder()
        +copy() CalcOrder
    }

    class GasOrder {
        -Long id
        -Long gasId
        -Long calcOrderId
        -Double concentration
        -Double temperature
        +GasOrder()
        +copy() GasOrder
    }

    class User {
        -Long id
        -String login
        -String password
        -String email
        -String firstName
        -String lastName
        +User()
        +copy() User
    }

    class OrderStatus {
        <<enumeration>>
        +DRAFT
        +COMPLETED
        +DELETED
    }

    %% DTO Layer
    class ApiResponse~T~ {
        -Boolean success
        -String message
        -T data
        -Long total
        -Int page
        -Int size
        +success() ApiResponse~T~
        +error() ApiResponse~T~
    }

    class CreateGasDto {
        -String name
        -String formula
        -String detailedDescription
    }

    class UpdateGasDto {
        -String name
        -String formula
        -String detailedDescription
    }

    class GasResponseDto {
        -Long id
        -String name
        -String formula
        -String detailedDescription
        -String imageUrl
        -String createdAt
        -String updatedAt
    }

    class GasFilterDto {
        -String name
        -String formula
    }

    class OrderResponseDto {
        -Long id
        -Long userId
        -Double tempResult
        -LocalDateTime timestamp
        -String status
        -String description
        -List~GasOrderResponseDto~ gasOrders
    }

    class GasOrderResponseDto {
        -Long id
        -Long gasId
        -String gasName
        -String gasFormula
        -String gasImageUrl
        -Double concentration
        -Double temperature
    }

    class UpdateOrderDto {
        -String description
    }

    class AddGasToOrderDto {
        -Long gasId
        -Double concentration
        -Double temperature
    }

    class UpdateGasInOrderDto {
        -Double concentration
        -Double temperature
    }

    class OrderFilterDto {
        -String status
        -LocalDateTime startDate
        -LocalDateTime endDate
    }

    class CartIconDto {
        -Long orderId
        -Int itemCount
    }

    class RegisterUserDto {
        -String login
        -String password
        -String email
        -String firstName
        -String lastName
    }

    class LoginUserDto {
        -String login
        -String password
    }

    class UserResponseDto {
        -Long id
        -String login
        -String email
        -String firstName
        -String lastName
    }

    class UpdateUserDto {
        -String email
        -String firstName
        -String lastName
    }

    %% Repository Layer
    class GasRepository {
        <<interface>>
        +findByNameContainingIgnoreCase()
        +findByFormulaContainingIgnoreCase()
        +findByNameAndFormulaContainingIgnoreCase()
        +countByNameContainingIgnoreCase()
        +countByFormulaContainingIgnoreCase()
        +countByNameAndFormulaContainingIgnoreCase()
    }

    class CalcOrderRepository {
        <<interface>>
        +findByUserIdAndStatusAndTempResultIsNull()
        +findByStatusOrderByTimestampDesc()
        +findByStatusNotOrderByTimestampDesc()
        +countByStatus()
        +countByStatusNot()
    }

    class GasOrderRepository {
        <<interface>>
        +findByCalcOrderId()
        +findByCalcOrderIdAndGasId()
        +deleteByCalcOrderId()
    }

    class UserRepository {
        <<interface>>
        +findByLogin()
    }

    %% Service Layer
    class GasService {
        -GasRepository gasRepository
        -GasOrderRepository gasOrderRepository
        +getAllGases() List~GasModel~
        +searchGases() List~GasModel~
        +getGasById() GasModel
        +getGasEntityById() Gas
        +saveGas() Gas
        +deleteGas()
        +getAllGasesWithFilter()
        +getGasesCount()
    }

    class CartService {
        -GasOrderRepository gasOrderRepository
        -CalcOrderRepository calcOrderRepository
        +getActiveCart() CalcOrder
        +addToCart()
        +removeFromCart()
        +getCartItemsCount() Int
        +isInCart() Boolean
        +clearCart()
        +updateOrder()
        +formOrder()
        +completeOrder()
        +addGasToOrder()
        +updateGasInOrder()
        +removeGasFromOrder()
        +getOrdersWithFilter()
        +getOrdersCount()
    }

    class UserService {
        -UserRepository userRepository
        +registerUser() User
        +authenticateUser() String
        +getUserById() User
        +updateUser() User
    }

    class MinioService {
        -MinioClient minioClient
        +uploadImage() String
        +deleteImage()
        +getImageUrl() String
        +extractFileNameFromUrl()
    }

    %% Controller Layer
    class GasApiController {
        -GasService gasService
        -MinioService minioService
        +getAllGases() ResponseEntity
        +getGas() ResponseEntity
        +createGas() ResponseEntity
        +updateGas() ResponseEntity
        +deleteGas() ResponseEntity
        +uploadGasImage() ResponseEntity
    }

    class OrderApiController {
        -CartService cartService
        -GasService gasService
        +getCartIcon() ResponseEntity
        +getOrders() ResponseEntity
        +getOrder() ResponseEntity
        +updateOrder() ResponseEntity
        +formOrder() ResponseEntity
        +completeOrder() ResponseEntity
        +deleteOrder() ResponseEntity
        +addGasToOrder() ResponseEntity
        +updateGasInOrder() ResponseEntity
        +removeGasFromOrder() ResponseEntity
    }

    class UserApiController {
        -UserService userService
        +registerUser() ResponseEntity
        +loginUser() ResponseEntity
        +logoutUser() ResponseEntity
        +getUserProfile() ResponseEntity
        +updateUserProfile() ResponseEntity
    }

    %% Relationships
    Gas ||--o{ GasOrder : "1..*"
    CalcOrder ||--o{ GasOrder : "1..*"
    User ||--o{ CalcOrder : "1..*"
    GasOrder }o--|| Gas : "*..1"
    GasOrder }o--|| CalcOrder : "*..1"
    CalcOrder }o--|| User : "*..1"
    CalcOrder }o--|| OrderStatus : "1..1"

    %% Service Dependencies
    GasService --> GasRepository : uses
    GasService --> GasOrderRepository : uses
    CartService --> GasOrderRepository : uses
    CartService --> CalcOrderRepository : uses
    UserService --> UserRepository : uses

    %% Controller Dependencies
    GasApiController --> GasService : uses
    GasApiController --> MinioService : uses
    OrderApiController --> CartService : uses
    OrderApiController --> GasService : uses
    UserApiController --> UserService : uses

    %% DTO Usage
    GasApiController ..> CreateGasDto : uses
    GasApiController ..> UpdateGasDto : uses
    GasApiController ..> GasResponseDto : uses
    GasApiController ..> GasFilterDto : uses
    OrderApiController ..> OrderResponseDto : uses
    OrderApiController ..> GasOrderResponseDto : uses
    OrderApiController ..> UpdateOrderDto : uses
    OrderApiController ..> AddGasToOrderDto : uses
    OrderApiController ..> UpdateGasInOrderDto : uses
    OrderApiController ..> OrderFilterDto : uses
    OrderApiController ..> CartIconDto : uses
    UserApiController ..> RegisterUserDto : uses
    UserApiController ..> LoginUserDto : uses
    UserApiController ..> UserResponseDto : uses
    UserApiController ..> UpdateUserDto : uses

    %% API Response
    GasApiController ..> ApiResponse : uses
    OrderApiController ..> ApiResponse : uses
    UserApiController ..> ApiResponse : uses
```

## 🎨 Цветовая схема для draw.io

### **Слои архитектуры:**
- **Entity Layer** - `#E3F2FD` (светло-голубой)
- **DTO Layer** - `#E8F5E8` (светло-зеленый)
- **Repository Layer** - `#FFF3E0` (светло-желтый)
- **Service Layer** - `#FCE4EC` (светло-розовый)
- **Controller Layer** - `#F3E5F5` (светло-фиолетовый)

### **Типы связей:**
- **Composition** (заполненный ромб) - для композиции
- **Association** (простая стрелка) - для ассоциации
- **Dependency** (пунктирная стрелка) - для зависимостей
- **Inheritance** (пустой треугольник) - для наследования

## 📋 Инструкция для импорта в draw.io

### **1. Через PlantUML:**
1. Откройте draw.io
2. File → Import → From URL
3. Вставьте содержимое файла `class_diagram.puml`
4. Нажмите Import

### **2. Через Mermaid:**
1. Откройте draw.io
2. File → Import → From URL
3. Вставьте содержимое Mermaid диаграммы выше
4. Нажмите Import

### **3. Ручное создание:**
1. Используйте описание из `CLASS_DIAGRAM_DRAWIO.md`
2. Создайте классы по слоям
3. Добавьте связи согласно описанию
4. Примените цветовую схему

## 🎯 Ключевые особенности диаграммы

### **1. Слоистая архитектура:**
- **Entity** - модель данных
- **DTO** - передача данных
- **Repository** - доступ к данным
- **Service** - бизнес-логика
- **Controller** - HTTP обработка

### **2. Паттерны проектирования:**
- **Repository Pattern** - абстракция доступа к данным
- **DTO Pattern** - передача данных между слоями
- **Service Layer Pattern** - бизнес-логика
- **RESTful API** - стандартизированные HTTP методы

### **3. Связи между классами:**
- **One-to-Many** - Gas → GasOrder, CalcOrder → GasOrder, User → CalcOrder
- **Many-to-One** - GasOrder → Gas, GasOrder → CalcOrder, CalcOrder → User
- **Composition** - Service содержит Repository
- **Dependency** - Controller использует Service

## ✅ Готово для draw.io!

Теперь у вас есть три варианта создания диаграммы классов:
1. **PlantUML** - `class_diagram.puml`
2. **Mermaid** - содержимое выше
3. **Ручное описание** - `CLASS_DIAGRAM_DRAWIO.md`

Выберите наиболее удобный для вас способ!
