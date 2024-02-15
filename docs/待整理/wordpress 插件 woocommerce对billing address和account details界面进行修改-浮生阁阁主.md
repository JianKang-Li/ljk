wordpress 插件 woocommerce对billing address和account details界面进行修改-浮生阁阁主# wordpress 插件 woocommerce高级使用

## 对界面结构进行修改：
[参考 How To Edit Files](https://woocommerce.com/document/template-structure/#how-to-edit-files)

## 只修改部分field
1. billing address
```php
add_filter('woocommerce_billing_fields', function ($billing_fields) {
  unset($billing_fields['billing_email']);

  return $billing_fields;
}, 10, 1);
```

2. account details
```php
add_filter('woocommerce_save_account_details_required_fields', function ($require_fields) {
  unset($require_fields['account_email']);

  return $require_fields;
}, 10, 1);
```
**注account界面模板不使用apply_filters生成，所以需要先覆盖原界面再去除必要验证**