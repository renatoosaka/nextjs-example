import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'


const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
  loading: () => <p>loading...</p>,
  ssr: false
} )

export default function Product() {
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

  const router = useRouter()

  const handleAddToCart = useCallback(() => {
    setIsAddToCartModalVisible(true)
  }, [setIsAddToCartModalVisible]);

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button type='button' onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  )
}