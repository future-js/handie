---
title: 数学运算

flag:
  primary: api
  secondary: calculation
---

为了避免直接计算时精度问题引起的结果不准确而存在。

## 目录

* 四则运算
  * [`.calculate.plus(a, b)`](#calculate-plus-default)
  * [`.calculate.minus(a, b)`](#calculate-minus-default)
  * [`.calculate.multiply(a, b)`](#calculate-multiply-default)
  * [`.calculate.divided(a, b)`](#calculate-divided-default)

## `.calculate.plus()` {#calculate-default}

加法运算。

### `.calculate.plus(a, b)` {#calculate-plus-default}

算出 `a` 与 `b` 相加后的值。

#### 参数

1. `a`（Number）：加数；
2. `b`（Number）：加数。

#### 返回值

（Number）：和。

## `.calculate.minus()` {#calculate-minus}

减法运算。

### `.calculate.minus(a, b)` {#calculate-minus-default}

算出 `a` 与 `b` 相减后的值。

#### 参数

1. `a`（Number）：被减数；
2. `b`（Number）：减数。

#### 返回值

（Number）：差。

## `.calculate.multiply()` {#calculate-multiply}

乘法运算。

### `.calculate.multiply(a, b)`  {#calculate-multiply-default}

算出 `a` 与 `b` 相乘后的值。

#### 参数

1. `a`（Number）：被乘数；
2. `b`（Number）：乘数。

#### 返回值

（Number）：积。

## `.calculate.divided()` {#calculate-divided}

除法运算。

### `.calculate.divided(a, b)` {#calculate-divided-default}

算出 `a` 与 `b` 相除后的值。

#### 参数

1. `a`（Number）：被除数；
2. `b`（Number）：除数。

#### 返回值

（Number）：商。
