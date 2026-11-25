
'use client'

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import { getAllProducts } from '@/src/lib/products'
import type { CartItem, Product } from '@/src/lib/types'

type CartLine = CartItem & {
  product: Product
  lineTotal: number
}

type CartAction =
  | { type: 'add'; item: CartItem }
  | { type: 'update'; index: number; quantity: number }
  | { type: 'remove'; index: number }
  | { type: 'hydrate'; items: CartItem[] }

type CartContextValue = {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  updateQuantity: (index: number, quantity: number) => void
  removeItem: (index: number) => void
}

const MAX_QUANTITY = 10
const CART_STORAGE_KEY = 'cart'

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'hydrate':
      return action.items

    case 'add': {
      const existing = state.findIndex(
        (item) =>
          item.productId === action.item.productId &&
          item.size === action.item.size &&
          item.color === action.item.color,
      )

      if (existing === -1) return [...state, action.item]

      return state.map((item, index) =>
        index === existing
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                item.quantity + action.item.quantity,
              ),
            }
          : item,
      )
    }

    case 'update':
      return state.map((item, index) =>
        index === action.index
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(MAX_QUANTITY, action.quantity),
              ),
            }
          : item,
      )

    case 'remove':
      return state.filter((_, index) => index !== action.index)
  }
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)

      if (savedCart) {
        const parsedCart: CartItem[] = JSON.parse(savedCart)

        if (Array.isArray(parsedCart)) {
          dispatch({
            type: 'hydrate',
            items: parsedCart,
          })
        }
      }
    } catch (error) {
      console.error('Erro ao recuperar a cesta:', error)
      localStorage.removeItem(CART_STORAGE_KEY)
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items),
      )
    }
  }, [items, isLoaded])

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((error) => {
        console.error('Erro ao carregar produtos da cesta:', error)
      })
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((item) => {
      const product = products.find(
        (product) => product.id === item.productId,
      )

      return product
        ? [
            {
              ...item,
              product,
              lineTotal: product.price * item.quantity,
            },
          ]
        : []
    })

    return {
      lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      addItem: (item) => dispatch({ type: 'add', item }),
      updateQuantity: (index, quantity) =>
        dispatch({ type: 'update', index, quantity }),
      removeItem: (index) =>
        dispatch({ type: 'remove', index }),
    }
  }, [items, products])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}

export const CART_MAX_QUANTITY = MAX_QUANTITY
