import {useEffect, useState} from 'react'

import {supabase} from './supabase'

function App() {

  const [products, setProducts] = useState(null)

  useEffect( () => {
    getProducts()


  }, [])


  const getProducts = async () => {
    const {data, error} = await supabase
    .from('products')
    .select()
    .order('name', {ascending: true})
    

    if (error) {
      console.log(error)
      return
    } 

  setProducts(data)

  }

  const addProducts = async (name, description, price) => {
    const {error} = await supabase
    .from('products')
    .insert({
      name,
      description,
      price,
    })
   

    if (error) {
      console.log(error)
      return
    }

   getProducts()
  }

    const updateProducts = async (id, name) => {

    const {error} = await supabase
    .from('products')
    .update({
      name,
    })
    .eq('id', id)
   

    if (error) {
      console.log(error)
      return
    }

   getProducts()
  }

    const deleteProducts = async (id) => {

    const {error} = await supabase
    .from('products')
    .delete()
    .eq('id', id)
   

    if (error) {
      console.log(error)
      return
    }

   getProducts()
  }

  return (
    <>
      <h1>Supabase</h1>

      <button onClick={() => {addProducts('Mycka', 'Myje nadobi', 11350)}}>Pridat mycku</button>

      {products === null
      ? <p>Nacitam data ...</p>
      : <table border="1">
          <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td><strong>{product.price}</strong></td>
            <td>
              <button onClick={() => {updateProducts(product.id, 'Fen')}}>Update</button>
            </td>
             <td>
              <button onClick={() => {deleteProducts(product.id)}}>Smazat</button>
            </td>

        </tr>))}
          </tbody>
      </table>
    }

    </>
  )
}

export default App
