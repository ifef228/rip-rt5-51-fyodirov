# Инструкция по импорту XML диаграмм в draw.io

## 🎯 Созданные XML файлы

### **1. `class_diagram.xml`** - Полная версия
- **Размер:** Большой, детальный
- **Содержит:** Все классы с полными методами и атрибутами
- **Подходит для:** Подробного анализа архитектуры

### **2. `class_diagram_compact.xml`** - Компактная версия
- **Размер:** Компактный, читаемый
- **Содержит:** Основные классы с ключевыми атрибутами
- **Подходит для:** Презентаций и обзора архитектуры

## 🚀 Импорт в draw.io

### **Способ 1: Импорт файла**

1. **Откройте draw.io**
   - Перейдите на [app.diagrams.net](https://app.diagrams.net)
   - Или откройте приложение draw.io

2. **Импортируйте XML файл**
   - Нажмите **File** → **Import** → **From Device**
   - Выберите файл `class_diagram.xml` или `class_diagram_compact.xml`
   - Нажмите **Open**

3. **Диаграмма загрузится автоматически**
   - Все классы будут расположены по слоям
   - Связи между классами будут отображены
   - Цветовая схема будет применена

### **Способ 2: Копирование содержимого**

1. **Откройте XML файл**
   - Откройте `class_diagram.xml` или `class_diagram_compact.xml`
   - Скопируйте все содержимое (Ctrl+A, Ctrl+C)

2. **Вставьте в draw.io**
   - Откройте draw.io
   - Нажмите **File** → **Import** → **From Text**
   - Вставьте содержимое XML файла
   - Нажмите **Import**

### **Способ 3: Drag & Drop**

1. **Перетащите файл**
   - Откройте draw.io
   - Перетащите XML файл в окно браузера
   - Диаграмма загрузится автоматически

## 🎨 Структура диаграммы

### **5 слоев архитектуры:**

#### **1. Entity Layer (голубой)**
- `Gas` - Услуга/Газ
- `CalcOrder` - Заявка/Заказ
- `GasOrder` - Связь Газ-Заявка
- `User` - Пользователь
- `OrderStatus` - Статус заявки

#### **2. DTO Layer (зеленый)**
- `ApiResponse<T>` - Стандартизированный ответ
- `CreateGasDto` - Создание услуги
- `GasResponseDto` - Ответ с услугой
- `OrderResponseDto` - Ответ с заявкой
- `UserResponseDto` - Ответ с пользователем

#### **3. Repository Layer (желтый)**
- `GasRepository` - Репозиторий газов
- `CalcOrderRepository` - Репозиторий заявок
- `GasOrderRepository` - Репозиторий связей
- `UserRepository` - Репозиторий пользователей

#### **4. Service Layer (розовый)**
- `GasService` - Сервис газов
- `CartService` - Сервис корзины
- `UserService` - Сервис пользователей
- `MinioService` - Сервис файлов

#### **5. Controller Layer (фиолетовый)**
- `GasApiController` - Контроллер газов
- `OrderApiController` - Контроллер заявок
- `UserApiController` - Контроллер пользователей

## 🔗 Типы связей

### **Сплошные стрелки (Composition/Association):**
- **1..*** - One-to-Many (один ко многим)
- **\*..1** - Many-to-One (многие к одному)
- **1..1** - One-to-One (один к одному)

### **Пунктирные стрелки (Dependency):**
- **uses** - Service использует Repository
- **uses** - Controller использует Service/DTO

## 🎯 Ключевые связи

### **Entity Relationships:**
- `Gas` → `GasOrder` (1..*)
- `CalcOrder` → `GasOrder` (1..*)
- `User` → `CalcOrder` (1..*)
- `GasOrder` → `Gas` (*..1)
- `GasOrder` → `CalcOrder` (*..1)
- `CalcOrder` → `User` (*..1)

### **Service Dependencies:**
- `GasService` → `GasRepository`
- `GasService` → `GasOrderRepository`
- `CartService` → `GasOrderRepository`
- `CartService` → `CalcOrderRepository`
- `UserService` → `UserRepository`

### **Controller Dependencies:**
- `GasApiController` → `GasService`
- `GasApiController` → `MinioService`
- `OrderApiController` → `CartService`
- `OrderApiController` → `GasService`
- `UserApiController` → `UserService`

### **DTO Usage:**
- `GasApiController` → `CreateGasDto`
- `GasApiController` → `GasResponseDto`
- `OrderApiController` → `OrderResponseDto`
- `UserApiController` → `UserResponseDto`
- Все контроллеры → `ApiResponse<T>`

## 🛠️ Редактирование диаграммы

### **После импорта вы можете:**

1. **Изменять размеры классов**
   - Перетаскивайте углы для изменения размера
   - Изменяйте высоту для добавления методов

2. **Добавлять новые классы**
   - Используйте элемент "Class" из панели UML
   - Добавляйте атрибуты и методы

3. **Изменять связи**
   - Перетаскивайте стрелки для изменения направления
   - Добавляйте новые связи между классами

4. **Изменять цвета**
   - Выбирайте класс и меняйте цвет заливки
   - Применяйте цветовую схему по слоям

5. **Добавлять аннотации**
   - Используйте элемент "Text" для добавления комментариев
   - Добавляйте заголовки и описания

## 📊 Экспорт диаграммы

### **После редактирования можете экспортировать:**

1. **PNG/JPG** - для презентаций
2. **PDF** - для документации
3. **SVG** - для веб-страниц
4. **XML** - для дальнейшего редактирования

## ✅ Готово к использованию!

### **Преимущества XML формата:**
- ✅ **Полная совместимость** с draw.io
- ✅ **Сохранение всех связей** и атрибутов
- ✅ **Возможность редактирования** после импорта
- ✅ **Профессиональный вид** диаграммы
- ✅ **Цветовая схема** по слоям архитектуры

### **Рекомендации:**
- Используйте **`class_diagram_compact.xml`** для презентаций
- Используйте **`class_diagram.xml`** для детального анализа
- Сохраняйте копию после импорта для дальнейшего использования

**Диаграмма классов готова для импорта в draw.io!** 🚀
