import SEO from '@/components/SEO';
import { GetServerSideProps } from 'next';
import { useCallback } from 'react';

import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  const handleSum = useCallback(async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL)
    
    const math = (await import('../lib/math')).default

    alert(math.sum(1, 2))
  }, [])

  return (
    <div>
      <SEO 
        title='DevCommerce, your best e-commerce' 
        image='boost.png'
        shouldExcludeTitleSuffix 
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum} type='button'>Sum</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ()  => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}