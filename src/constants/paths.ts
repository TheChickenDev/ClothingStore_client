const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password/:token',
  profile: '/profile',
  cart: '/cart',
  orders: '/orders',
  about: '/about',
  contact: '/contact',
  shop: '/shop',
  product: '/product/:id'
} as const

export default paths
