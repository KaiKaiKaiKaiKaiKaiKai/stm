import { useState } from 'react'
import { db } from '../lib/firebase'
import { collection, addDoc, Timestamp } from "firebase/firestore"

function ListForm({ trans, bgColor }) {
    
    const [formData, setFormData]=useState({
        title: "",
        quantity: "",
        price: "",
        tier: "",
      })

      function submitForm() {
        docRef()
        setFormData({
          title: "",
          quantity: "",
          price: "",
          tier: "",
      })}
      
      const docRef = async () => { await addDoc(collection(db, trans), {
        title: formData.title,
        quantity: parseInt(formData.quantity),
        price: parseInt(formData.price),
        tier: parseInt(formData.tier),
        timestamp: Timestamp.now()
      })}


  return (
    <form className="p-8 rounded-md bg-zinc-800">
      <input onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} placeholder="Title" className="rounded-md mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <input onChange={(e) => setFormData({...formData, quantity: e.target.value})} value={formData.quantity} type="number" placeholder="Quantity" className="rounded-md mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <input onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price} type="number" placeholder="Price" className="rounded-md mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <input onChange={(e) => setFormData({...formData, tier: e.target.value})} value={formData.tier} type="number" placeholder="Tier" className="rounded-md mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <div onClick={ submitForm } className={`rounded-md text-center font-semibold cursor-pointer bg-${bgColor} text-zinc-800 text-base p-2`}>List</div>
    </form>
  )
}

export default ListForm