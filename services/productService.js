// ========================================
// 產品服務
// ========================================

const { fetchProducts } = require('../api');
const { getDiscountRate, getAllCategories, formatCurrency } = require('../utils');

/**
 * 取得所有產品
 * @returns {Promise<Object>}
 */
async function getProducts() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得產品陣列
  // 回傳格式：{ products, count: 產品數量 }
  try {
    const products = await fetchProducts();
    return { products, count: products.length };
  } catch (error) {
    return { isValid: false, error: 'getProducts:' + error.message };
  }
}

/**
 * 根據分類篩選產品
 * @param {string} category - 分類名稱
 * @returns {Promise<Array>}
 */
async function getProductsByCategory(category) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，篩選出符合 category 的產品
  // 回傳格式：篩選後的產品陣列
  try {
    const products = await fetchProducts();
    return products.filter(product => product.category === category);
  } catch (error) {
    return { isValid: false, error: 'getProductsByCategory:' + error.message };
  }
}

/**
 * 根據 ID 取得單一產品
 * @param {string} productId - 產品 ID
 * @returns {Promise<Object|null>}
 */
async function getProductById(productId) {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，找出 id 符合的產品
  // 若找不到，回傳 null
  try {
    const products = await fetchProducts();
    const target = products.find(product => product.id === productId);
    return target || null;
  } catch (error) {
    return { isValid: false, error: 'getProductById:' + error.message };
  }
  
}

/**
 * 取得所有分類（不重複）
 * @returns {Promise<Array>}
 */
async function getCategories() {
  // 請實作此函式
  // 提示：使用 fetchProducts() 取得所有產品後，代入到 utils getAllCategories()
  try {
    const products = await fetchProducts();
    return getAllCategories(products);
  } catch (error) {
    return { isValid: false, error: 'getCategories:' + error.message };
  }
  
}

/**
 * 顯示產品列表
 * @param {Array} products - 產品陣列
 */
function displayProducts(products) {
  // 請實作此函式
  // 提示：使用 forEach 遍歷產品陣列，依序輸出每筆產品資訊
  // 會使用到 utils getDiscountRate() 計算折扣率，以及 utils formatCurrency() 格式化金額
  //
  // 預期輸出格式：
  // 產品列表：
  // ----------------------------------------
  // 1. 產品名稱
  //    分類：xxx
  //    原價：NT$ 1,000
  //    售價：NT$ 800 (8折)
  // ----------------------------------------
  // let count = 0;
  // console.log(`產品列表：`);
  // console.log(`----------------------------------------`);
  // products.forEach(product => {
  //   count ++;
  //   console.log(`${count}. 產品名稱：${product.title}`);
  //   console.log(`分類：${product.category}`);
  //   console.log(`原價：NT$ ${formatCurrency(product.origin_price)}`);
    // console.log(`售價：NT$ ${formatCurrency(product.price)} (${getDiscountRate(product)})`)
  //   console.log(`----------------------------------------`);
  // })

  // 方法二
  console.log(`產品列表：`);
  console.log(`----------------------------------------`);
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.title}`);
    console.log(`   分類：${product.category}`);
    console.log(`   原價：${formatCurrency(product.origin_price)}`);
    console.log(`   售價：${formatCurrency(product.price)}  (${getDiscountRate(product)})`);
    console.log(`----------------------------------------`);
  })
}

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  getCategories,
  displayProducts
};
