jQuery((function(t){if("undefined"==typeof wc_add_to_cart_params)return!1;t(document).on("submit","form.cart",(function(a){var e=t(this),n=e.find(".single_add_to_cart_button"),r=e.find('input:not([name="product_id"]), select, button, textarea'),o=[];if(r.each((function(t,a){var n=a.name,r=a.value;if(n&&r){if("add-to-cart"==n&&(n="product_id",r=e.find("input[name=variation_id]").val()||r),("checkbox"==a.type||"radio"==a.type)&&0==a.checked)return;o.push({name:n,value:r})}})),o.length)return a.preventDefault(),e.block({message:null,overlayCSS:{background:"#ffffff",opacity:.6}}),t(document.body).trigger("adding_to_cart",[n,o]),t.ajax({type:"POST",url:woocommerce_params.wc_ajax_url.toString().replace("%%endpoint%%","add_to_cart"),data:o,success:function(a){a&&(a.error&a.product_url?window.location=a.product_url:t(document.body).trigger("added_to_cart",[a.fragments,a.cart_hash,n]))},complete:function(){e.unblock()}}),!1}))}));