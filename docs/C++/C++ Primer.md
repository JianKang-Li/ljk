## 基本储备

- #include <iostream> //标准输入输出库
- 输入 std::cin >> item1;
- 输出 std::cout<<item1<<std::endl;
- 输出错误 std::cerr<< "错误信息"<<std::endl;
- 读取数量不定的输入`while(std::cin>> value)`

## 变量和基本类型

| 类型 | 含义 | 最小存储空间 |
| --- | --- | --- |
| bool | 布尔 | 8bit |
| char | 字符 | 16bit |
| wchar_t | 宽字符 | 16 |
| short | 短整型 | 16 |
| int | 整型 | 16 |
| long | 长整型 | 32 |
| float | 单精度浮点数 | 6位有效数字 |
| double | 双精度浮点数 | 10位有效数字 |
| long_double | 扩展精度浮点数 | 10位有效数字 |

除布尔和扩展字符型外，其他整型可以分为带符号和无符号两种，无符号只能表示大于等于0的值

```cpp
unsigned u=10,u2=42;
std::cout<<u-u2<<std::endl;
```

输出结果错误，因为负数会自动转化为无符号数

##### 字符和字符串字面量

单引号为char型字面量
双引号为字符串型字面量
:::info
字符串结尾会有一个空字符`\0`
:::
转义序列与js相似 转义序列可以当一个字符使用

##### 指定字面值的类型

![image.png](https://cdn.nlark.com/yuque/0/2023/png/22874800/1697105312905-fea33f49-4254-4b2a-b514-bb577f4ce8b0.png#averageHue=%23f1f1f1&clientId=uee16f9a1-65d1-4&from=paste&height=218&id=uf762ae7d&originHeight=218&originWidth=440&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53770&status=done&style=none&taskId=ue5467c32-bba2-4022-9eac-c54fbc8991f&title=&width=440)

#### 变量声明和定义的关系

- 声明使得名字为程序所知
- 定义负责创建和名字关联的实体
:::info
变量能且只能被定义一次，但可以被多次声明
:::
声明一个变量而非定义在变量名前添加`extern`语句 **如果包含了初始值就是定义**

#### 名字的作用域

一般作用域以花括号作分隔
C++ 操作符替代名
and bitand compl not_eq or_eq xor_eq and_eq bitor not or xor
作用域操作符`::`

- 当存在具有相同名称的局部变量时，要访问全局变量
- 在类之外定义函数
- 访问一个类的静态变量
- 如果有多个继承：如果两个祖先类中存在相同的变量名，则可以使用作用域运算符进行区分
- 如果两个命名空间中都存在一个具有相同名称的类，则可以将名称空间名称与作用域解析运算符一起使用，以引用该类而不会发生任何冲突
- 在另一个类中引用一个类

### 复合类型

#### 引用

```cpp
int ival = 1024;
int &refVal = ival; // refVal 指向 ival(是ival 的另一个名字)
```

:::info
引用即别名；引用只能绑定在对象上，不能与字面量或某个表达式计算结果绑定
:::

#### 指针

指针实现对其他对象的间接访问；指针使用`*`标识
取地址符`&`
引用不是对象所以不能定义指向引用的指针

##### 指针值

1. 指向一个对象
2. 指向紧邻对象所占空间的下一个位置
3. 空指针，没有指向任何对象
4. 无效指针，上述情况之外

##### 利用指针访问对象

使用解引用符（操作符`*`）

##### 空指针

生成空指针

```cpp
int *p1 = nullptr
int *p2 = 0
// #include cstdlib
int *p3 = NULL

```

##### void* 指针

可以存放**任意对象的地址**

##### 指向指针的指针

`**p` 可以以此类推

## 定义对象

### 初始化

int ival(1024); // 直接初始化
int ival = 1024; // 复制初始化

### const 限定符

const int i, j =0;
限定后不能被修改；默认作为文件的局部变量

#### const 指针

允许把指针本身定为常量。常量指针必须初始化，初始化后不可改变

#### 顶层const

- 顶层const表示指针本身是一个常量
- 底层const表示指针指向的对象是一个常量

```c++
一个永远不会忘记的方法，const默认是修饰它左边的符号的，如果左边没有，那么就修饰它右边的符号，比如

1. const int *p;左边没有，看右边的一个，是int，自然就是p指针指向的值不能改变
2. int const *p;此时左边有int，其实和上面一样，还是修饰的int
3. int* const p :修饰的是*，指针不能改变
4. const int *const p :第一个左边没有，所以修饰的是右边的int，第二个左边有，所以修饰的是 * ，因此指针和指针指向的值都不能改变
5. const int const * p :这里两个修饰的都是int了，所以重复修饰了，有的编译器可以通过，但是会有警告，你重复修饰了，有的可能直接编译不过去
因此，永远记住，看到const就看它左边是什么，如果左边没有，才看右边的，就永远不会出错
```

#### constexpr 和常量表达式

常量表达式指值不会改变并且在编译过程就能得到计算结果的表达式

```c++
const int max_files = 20; //yes
const int limit = max_files + 1; //yes
int staff_size = 27; // false
const int sz = get_size(); // false
```

##### constexpr 变量

允许将变量声明为constexpr 类型以便编辑器来验证变量的值是否是一个常量表达式；声明constexpr的类型必须是字面量值类型

#### 指针和constexpr

在constexpr声明中如果定义了一个指针，限定符constexpr仅对指针有效，与指针所指的对象无关

## 处理类型

### typeof 定义类型别名

`typeof double wages;`

### auto类型说明符

auto 让编译器通过初始值推算变量类型；**auto定义的变量必须有初始值**
**一条声明语句只能有一个基本数据类型，所以声明多个变量时必须类型一致**
:::warning
编译器推测出来的auto类型和初始值类型不完全一样，会适当改变类型使其更加符合初始化规则
:::
:::warning
auto 一般会忽略顶层const
:::

#### decltype 类型指示符

选择并返回操作数的数据类型
decltype(f()) sum = x; 推断sum的类型是函数f的返回类型。
不会忽略顶层const。
如果对变量加括号，编译器会将其认为是一个表达式，如int i-->(i),则decltype((i))得到结果为int&引用。
赋值是会产生引用的一类典型表达式，引用的类型就是左值的类型。也就是说，如果 i 是 int，则表达式 i=x 的类型是 int&。
C++11

## 自定义数据结构
