export type Gender = 'mulher' | 'homem'

export type ProductColor = {
  name: string
  hex: string
}

export type Product = {
  id: string
  slug: string
  name: string
  gender: Gender
  category: string
  price: number
  compareAtPrice?: number
  colors: ProductColor[]
  sizes: string[]
  image: string
  description: string
  details: string[]
  isNew?: boolean
}

export type CartItem = {
  productId: string
  size: string
  color: string
  quantity: number
}
