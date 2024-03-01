import {useEffect, useState} from 'react'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qdlaqnjizbypvfevfyqu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkbGFxbmppemJ5cHZmZXZmeXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzMTMyMTEsImV4cCI6MjAyNDg4OTIxMX0.n3uqNy9eozACTHN5VyfkZ5G_pSwxJRmfUS1VQQm_kYI"
);

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase
        .from("products")
        .select()
        .order('price')
      setProducts(data);
    }
    loadData();
  }, [])


  const handleAddProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: 'Susicka 10',
        description: 'Huci, rotuje a susi',
        price: 25000
      })
      .select()
      .single()
    console.log(data)
  }

  const handleChangeProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: 'Susicka 5000',
        price: 5000
      })
      .eq('id', 5)
      .select()
      .single()

    console.log(data)
  }

  const handleDeleteProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', 6)

    console.log(data)
  }


  return (
    <>
      <h1>Supabase</h1>

      <button onClick={handleAddProduct}>Pridat novy produkt</button>

      <button onClick={handleChangeProduct}>Zmenit produkt</button>

      <button onClick={handleDeleteProduct}>Smazat produkt</button>


      <ul>
        {products.map(product => <li key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>{product.price}</strong></p>
        </li>)}
      </ul>
    </>
  )
}

export default App
