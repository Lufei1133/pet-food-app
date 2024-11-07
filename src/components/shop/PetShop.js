import React, { useState } from 'react';
import { 
  ShoppingCart, Package, History, Star, Filter, Search, 
  ArrowRight, Brain, X, CreditCard, Truck, Check,
  Scale, DollarSign, ThumbsUp, ThumbsDown
} from 'lucide-react';

const PetShop = ({ petInfo }) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [compareProducts, setCompareProducts] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  // 将products定义为状态
  const [products] = useState({
    recommended: [
      {
        id: 1,
        name: "Premium Dog Food",
        description: "High-quality, balanced nutrition for adult dogs",
        price: 49.99,
        image: "/api/placeholder/400/300",
        rating: 4.5,
        aiRecommended: true,
        nutritionInfo: {
          protein: "26%",
          fat: "15%",
          fiber: "4%"
        }
      },
      {
        id: 2,
        name: "Joint Health Supplement",
        description: "Supports healthy joints and mobility",
        price: 29.99,
        image: "/api/placeholder/400/300",
        rating: 4.8,
        aiRecommended: true,
        nutritionInfo: {
          glucosamine: "500mg",
          chondroitin: "200mg",
          msm: "100mg"
        }
      },
      {
        id: 3,
        name: "Dental Chew Treats",
        description: "Helps maintain dental hygiene",
        price: 19.99,
        image: "/api/placeholder/400/300",
        rating: 4.3,
        nutritionInfo: {
          protein: "12%",
          fat: "8%",
          fiber: "3%"
        }
      }
    ],
    aiRecommended: [
      {
        id: 4,
        name: "Personalized Food Blend",
        description: "Custom-made for your pet's specific needs",
        price: 59.99,
        image: "/api/placeholder/400/300",
        rating: 4.9,
        aiRecommended: true,
        nutritionInfo: {
          protein: "28%",
          fat: "14%",
          fiber: "5%"
        }
      },
      {
        id: 5,
        name: "Smart Health Monitor",
        description: "AI-powered health tracking device",
        price: 79.99,
        image: "/api/placeholder/400/300",
        rating: 4.7,
        aiRecommended: true,
        nutritionInfo: {
          battery: "5 days",
          sensors: "Multiple",
          weight: "15g"
        }
      }
    ]
  });

  // 模拟评价数据
  const reviews = {
    1: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        date: "2024-01-15",
        comment: "Great product! My dog loves it.",
        helpful: 12,
        verified: true
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        date: "2024-01-10",
        comment: "Good quality, but a bit pricey.",
        helpful: 8,
        verified: true
      }
    ]
  };

  // 购物车功能
  const CartView = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
        <div className="bg-white w-full max-w-md h-full overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500">${item.price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            className="px-2 py-1 border rounded"
                            onClick={() => {
                              const newItems = [...cartItems];
                              newItems[index].quantity = (item.quantity || 1) - 1;
                              if (newItems[index].quantity === 0) {
                                newItems.splice(index, 1);
                              }
                              setCartItems(newItems);
                            }}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity || 1}</span>
                          <button
                            className="px-2 py-1 border rounded"
                            onClick={() => {
                              const newItems = [...cartItems];
                              newItems[index].quantity = (item.quantity || 1) + 1;
                              setCartItems(newItems);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newItems = [...cartItems];
                          newItems.splice(index, 1);
                          setCartItems(newItems);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 结账流程
  const CheckoutView = () => {
    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
      name: '',
      address: '',
      city: '',
      zip: '',
      phone: ''
    });
    const [paymentInfo, setPaymentInfo] = useState({
      cardNumber: '',
      expiry: '',
      cvv: ''
    });

    const steps = [
      { number: 1, title: 'Shipping' },
      { number: 2, title: 'Payment' },
      { number: 3, title: 'Review' }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-full max-w-2xl rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Checkout</h2>
            <button onClick={() => setShowCheckout(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* 步骤指示器 */}
          <div className="flex justify-between mb-8">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex items-center ${
                  step === s.number
                    ? 'text-blue-600'
                    : step > s.number
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${step === s.number ? 'bg-blue-100' : 
                    step > s.number ? 'bg-green-100' : 'bg-gray-100'}
                `}>
                  {step > s.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    s.number
                  )}
                </div>
                <span className="ml-2">{s.title}</span>
                {s.number < steps.length && (
                  <ArrowRight className="h-4 w-4 mx-4" />
                )}
              </div>
            ))}
          </div>

          {/* 步骤内容 */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="col-span-2 p-2 border rounded"
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="col-span-2 p-2 border rounded"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-2 border rounded"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="p-2 border rounded"
                  value={shippingInfo.zip}
                  onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="col-span-2 p-2 border rounded"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">Payment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="col-span-2 p-2 border rounded"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="p-2 border rounded"
                  value={paymentInfo.expiry}
                  onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-2 border rounded"
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">Order Review</h3>
              <div className="border rounded p-4">
                <h4 className="font-medium mb-2">Items</h4>
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{item.name} x {item.quantity || 1}</span>
                    <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      ${cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  // 处理订单提交
                  alert('Order placed successfully!');
                  setCartItems([]);
                  setShowCheckout(false);
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {step === 3 ? 'Place Order' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 评价系统
  const ReviewsView = ({ productId }) => {
    const productReviews = reviews[productId] || [];

    return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white w-full max-w-2xl rounded-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Product Reviews</h2>
                  <button onClick={() => setShowReviews(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
      
                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium">{review.user}</span>
                          {review.verified && (
                            <span className="ml-2 text-green-500 text-sm">Verified Purchase</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <button className="flex items-center hover:text-gray-700">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </button>
                        <button className="flex items-center ml-4 hover:text-gray-700">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Not Helpful
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
      
                <button
                  className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => setShowReviews(false)}
                >
                  Write a Review
                </button>
              </div>
            </div>
          );
        };
      
        // 商品对比功能
        const ComparisonView = () => {
          const compareFeatures = [
            'Price',
            'Protein',
            'Fat',
            'Fiber',
            'Calories',
            'Main Ingredients',
            'Recommended Age',
            'Special Features'
          ];
      
          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white w-full max-w-4xl rounded-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Compare Products</h2>
                  <button onClick={() => setShowComparison(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
      
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 bg-gray-50">Features</th>
                        {compareProducts.map(product => (
                          <th key={product.id} className="p-2 bg-gray-50 min-w-[200px]">
                            <div className="relative">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded mb-2"
                              />
                              <h3 className="font-medium">{product.name}</h3>
                              <button
                                onClick={() => setCompareProducts(prev => 
                                  prev.filter(p => p.id !== product.id)
                                )}
                                className="absolute top-2 right-2 bg-white rounded-full p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {compareFeatures.map(feature => (
                        <tr key={feature} className="border-b">
                          <td className="p-2 font-medium">{feature}</td>
                          {compareProducts.map(product => (
                            <td key={product.id} className="p-2">
                              {feature === 'Price' && `$${product.price}`}
                              {feature === 'Protein' && product.nutritionInfo?.protein}
                              {feature === 'Fat' && product.nutritionInfo?.fat}
                              {feature === 'Fiber' && product.nutritionInfo?.fiber}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        };
      
        // 产品卡片组件
        const ProductCard = ({ product }) => (
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {product.aiRecommended && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Recommended
                </div>
              )}
            </div>
      
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{product.rating}</span>
              </div>
            </div>
      
            <div className="text-gray-600 mb-4 text-sm">
              {product.description}
            </div>
      
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Nutrition Info</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(product.nutritionInfo).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-white rounded">
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-gray-600">{value}</div>
                  </div>
                ))}
              </div>
            </div>
      
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedProduct(product)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  if (compareProducts.length < 3) {
                    setCompareProducts(prev => [...prev, product]);
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                disabled={compareProducts.length >= 3}
              >
                Add to Compare
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setShowReviews(true);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
              >
                Reviews
              </button>
            </div>
      
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold">${product.price}</span>
              <button
                onClick={() => setCartItems(prev => [...prev, { ...product, quantity: 1 }])}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      
        return (
          <div className="space-y-6">
            {/* 顶部操作栏 */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Health</option>
                  <option>Supplies</option>
                </select>
              </div>
      
              <div className="flex items-center space-x-4">
                {compareProducts.length > 0 && (
                  <button
                    onClick={() => setShowComparison(true)}
                    className="flex items-center text-blue-600"
                  >
                    <Scale className="h-5 w-5 mr-1" />
                    Compare ({compareProducts.length})
                  </button>
                )}
                <button
                  onClick={() => setShowCart(true)}
                  className="flex items-center"
                >
                  <ShoppingCart className="h-6 w-6 text-blue-500 mr-2" />
                  <span className="font-medium">Cart</span>
                  {cartItems.length > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
      
            {/* 标签页导航 */}
            <div className="flex space-x-4 border-b">
              <button
                onClick={() => setActiveTab('recommended')}
                className={`pb-2 ${
                  activeTab === 'recommended'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Recommended Products
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`pb-2 ${
                  activeTab === 'ai'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                AI Recommendations
              </button>
            </div>
      
            {/* 产品列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeTab === 'recommended' ? products.recommended : products.aiRecommended)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
      
            {/* 模态框 */}
            {showCart && <CartView />}
            {showCheckout && <CheckoutView />}
            {showComparison && <ComparisonView />}
            {showReviews && selectedProduct && (
              <ReviewsView productId={selectedProduct.id} />
            )}
          </div>
        );
      };
      
      export default PetShop;