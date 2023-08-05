# Pinia

[Pinia官网](https://pinia.vuejs.org/)

## 特性

+ Vue2和Vue3都支持
+ 支持Vue DevTool
+ 模块热更新
+ 支持使用插件扩展
+ 有更好的TypeScript支持
+ 支持服务端渲染

## 核心概念

+ State
+ Getter
+ Action（同步和异步都支持）

## 快速入门

### 安装

`npm install pinia`

Vue2 需要下载组合式API包`@vue/composition-api`

### 初始化配置

```ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

// 创建pinia实例
const pinia = createPinia();

const app = createApp(App);
//挂载到Vue根实例
app.use(pinia);

app.mount("#app");

```

## 基本使用

### 容器定义

```ts
import { defineStore } from "pinia";
// 1.定义并导出容器
// 参数1 容器的id 必须唯一 将来pinia 会把所有的容器挂载到根容器
// 参数2 选项对象
// 返回值：一个函数，调用得到容器实例
export const userMainStore = defineStore("main", {
  /* 
    类似组件的data，用来存储全局状态
    1.必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    2.必须是箭头函数：这是为了更好的TS类型推导
  */
  state: () => {
    return {
      count: 100,
    };
  },
  /* 
  类似于组件的computed用来封装计算属性，有缓存功能
  */
  getters: {},
  /* 
  封装业务逻辑，类似于组件的methods 修改state
  */
  actions: {},
});
// 2.使用容器中的state

// 3.修改state，容器中的action的使用

```

### 组件内使用

```vue
<template>
  <p>{{ mainStore.count }}</p>
</template>
<script lang="ts" setup>
import { userMainStore } from "../store";
const mainStore = userMainStore();
// console.log(mainStore.count);
</script>
<style></style>

```

### 注意

```ts
// 这是有问题的，因为这样拿到的数据不是响应式的，是一次性的
const { count, foo } = mainStore;
// 解决 使用storeToRefs
// Pinia 其实就是把state数据都做了reactive处理
// 把结构出来的数据做ref响应式处理
const { count, foo } = storeToRefs(mainStore);
```

### 数据修改

#### 组件内直接修改

```ts
const handleChangeState = () => {
  // 最简单的方式
  /*   mainStore.count++;
  mainStore.foo = "hello"; */
  // 方式2:如果需要修改多个数据,建议使用$patch批量更新
  /*   mainStore.$patch({
    count: mainStore.count + 1,
    foo: "hello",
    arr: [...mainStore.arr, 4],
  }); */
  // 方式三 更好的批量更新$patch 一个函数
  mainStore.$patch((state) => {
    state.count++;
    state.foo = "hello";
    state.arr.push(4);
  });
};
```

#### 调用actions

```ts
actions: {
    changeState() {
        this.count++;
        this.foo = "hello";
    },
},
```

```ts
// 方式四 逻辑比较多的时候可以封装到action做处理
mainStore.changeState();
```

#### 带参数

```ts
actions: {
    changeState(val: number) {
        this.count += val;
        this.foo = "hello";
        // this.$patch({})
        // this.$patch(state=>{})
    },
},
```

```ts
mainStore.changeState(10);
```

patch 和普通多次修改有区别，多次修改会多次更新

不能使用箭头函数定义action，因为箭头函数绑定外部this

### Getter的使用

```vue
  <p>{{ mainStore.count10 }}</p>
```

```ts
getters: {
    //函数接受一个可选参数：state状态对象，使用this同时不传state也可以但ts会无法推导返回类型，需要手动定义
    count10(state) {
        console.log("count10");
        return state.count + 10;
    },
},
```

## 案例

### 购物车案例

```ts
//shop.ts
export interface IProduct {
  id: number;
  title: string;
  price: number;
  inventory: number; //库存
}

const _products: IProduct[] = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
  { id: 2, title: "T-shirt", price: 10.99, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 },
];

export const getProducts = async () => {
  await wait(100);
  return _products;
};

export const buyProducts = async () => {
  await wait(100);
  return Math.random() > 0.5;
};

async function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
```

```vue
<template>
 <!--ProdectList.vue-->
  <ul>
    <li v-for="item in productsStore.all">
      {{ item.title }}-{{ item.price }}
      <br />
      <button
        @click="cartStore.addProductToCart(item)"
        :disabled="!item.inventory"
      >
        添加到购物车
      </button>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { userProdectsStore } from "../store/products";
import { userCartStore } from "../store/cart";

const productsStore = userProdectsStore();
const cartStore = userCartStore();
// 加载所有的数据
productsStore.loadAllProducts();
</script>
<style></style>
```

```vue
<template>
 <!--ShoppingCart.vue-->
  <div class="cart">
    <h2>你的购物车</h2>
    <p v-if="!CartStore.cartProducts">
      <i>请添加一些商品到购物车</i>
    </p>
    <ul v-else>
      <li v-for="item in CartStore.cartProducts">
        {{ item.title }} - {{ item.price }} x {{ item.quantity }}
      </li>
    </ul>
    <p>商品总价:{{ CartStore.totalPrice }}</p>
    <p><button @click="CartStore.checkout">结算</button></p>
    <p v-show="CartStore.checkoutStatus">结算{{ CartStore.checkoutStatus }}</p>
  </div>
</template>
<script lang="ts" setup>
import { userCartStore } from "../store/cart";
const CartStore = userCartStore();
</script>
```

```ts
//cart.ts
import { defineStore } from "pinia";
import { buyProducts, IProduct } from "../api/shop";
import { userProdectsStore } from "./products";

type CartProdect = {
  quantity: number;
} & Omit<IProduct, "inventory">;

export const userCartStore = defineStore("cart", {
  state: () => {
    return {
      cartProducts: [] as CartProdect[], //购物车商品列表
      checkoutStatus: null as null | string,
    };
  },
  getters: {
    totalPrice(): number {
      return this.cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  actions: {
    addProductToCart(product: IProduct) {
      // console.log("add", product);

      // 查看商品有没有库存
      if (product.inventory < 1) {
        return;
      }
      // 检查购物车中是否已有该商品
      const cartItem = this.cartProducts.find((item) => item.id === product.id);
      if (cartItem) {
        // 如果有则让该商品数量+1
        cartItem.quantity++;
      } else {
        // 如果没有则添加到购物车列表中去
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1, //第一次加入购物车
        });
      }
      // 更新商品的库存
      const productsStore = userProdectsStore();
      productsStore.decrementProdect(product);
    },
    async checkout() {
      const ret = await buyProducts();
      this.checkoutStatus = ret ? "成功" : "失败";
      if (ret) {
        this.cartProducts = [];
      }
    },
  },
});
```

```ts
//products.ts
import { defineStore } from "pinia";
import { getProducts, IProduct } from "../api/shop";
export const userProdectsStore = defineStore("products", {
  state: () => {
    return {
      all: [] as IProduct[], //所有商品列表
    };
  },
  getters: {},
  actions: {
    async loadAllProducts() {
      const ret = await getProducts();
      this.all = ret;
    },

    decrementProdect(product: IProduct) {
      const ret = this.all.find((item) => item.id === product.id);
      if (ret) {
        ret.inventory--;
      }
    },
  },
});
```

```vue
<template>
  <!--App.vue-->
  <h1>Pinia 购物车案例</h1>
  <hr />
  <h2>商品列表</h2>
  <ProductList></ProductList>
  <hr />
  <ShoppingCart></ShoppingCart>
</template>

<script setup lang="ts">
import ProductList from "./components/ProductList.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
</script>

<style scoped></style>
```
