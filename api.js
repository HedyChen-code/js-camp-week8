// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

const api = axios.create({
  baseURL: `${BASE_URL}/api/livejs/v1/customer/${API_PATH}`
});
const adminApi = axios.create({
  baseURL: `${BASE_URL}/api/livejs/v1/admin/${API_PATH}`,
  headers: { authorization: ADMIN_TOKEN }
});

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  try {
    const response = await api.get('/products');
    return response.data.products; 
  } catch (error) {
    throw error;
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    const response = await api.get('/carts');
    const data =  response.data;
    return { carts: data.carts, total: data.total, finalTotal: data.finalTotal };
  } catch (error) {
    throw error;
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  try {
    const data = {
      data: {
        productId,
        quantity
      }
    };
    const response = await api.post('/carts', data);
  return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  try {
    const data = {
      data: {
        id: cartId,
        quantity
      }
    };
    const response = await api.patch('/carts', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  try {
    const response = await api.delete(`/carts/${cartId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  try {
    const response = await api.delete('/carts');
    return response.data;
  } catch (error) {
    throw error;
  }
  
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try {
    const data = {
      data: {
        user: {
          name: userInfo.name,
          tel: userInfo.tel,
          email: userInfo.email,
          address: userInfo.address,
          payment: userInfo.payment
        }
      }
    };
    const response = await api.post('/orders', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  try {
    const response = await adminApi.get('/orders');
    return response.data.orders;
  } catch (error) {
    throw error;
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  try {
    const data = {
      data: {
        id: orderId,
        paid: isPaid
      }
    };
    const response = await adminApi.put('/orders', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  try {
    const response = await adminApi.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
