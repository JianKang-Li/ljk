wordpress 插件 woocommerce自定义订单信息验证-浮生阁阁主1. 使用php钩子函数增加自定义验证
```php
add_action('woocommerce_after_checkout_validation', function ($fields){
  if ($fields['billing_phone'] && !preg_match('/^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/', $fields['billing_phone'])){
    wc_add_notice(__('<strong>Billing Phone</strong> is invalidate.'), 'error');
  }
}, 10, 1 );
```
2. 使用js进行输入框失焦校验，修改验证后样式
```js
jQuery(function($){
      // 正则验证
      const validateList = {
        '#billing_phone': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/
      }
	  // 失焦和触发验证时进行样式和自定义校验
	  $(input).on('blur validate', function () {
		  const id = `#${this.getAttribute('id')}`
		  const wrapper = $(this).closest('.form-row');

		  // 等待checkout.js 触发完validate_field修改样式
		  setTimeout(() => {// 重点，需要等待先触发插件的校验后再进行样式修改
			  if (!validateList[id].test($(this).val())) {
				  wrapper.removeClass('woocommerce-validated').addClass('woocommerce-invalid')
			  } else {
				  wrapper.removeClass('woocommerce-invalid').addClass('woocommerce-validated')
			  }
		  }, 100);
	  })

	// 聚焦消除样式
	$(input).on('focus',function () {
		const id = this.getAttribute('id')
		const wrapper = $(`#${id}_field`)

		if (wrapper.hasClass('woocommerce-invalid')) {
			wrapper.removeClass('woocommerce-invalid')
		}
	})
    });
```
