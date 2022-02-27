import { useState } from 'react'
import { db } from '../lib/firebase'
import { collection, addDoc, Timestamp } from "firebase/firestore"
import {Colors} from './Color'

function ListForm({ trans }) {
    
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
    <form className="p-4 bg-zinc-800">
      <input onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} placeholder="Title..." className="mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <input onChange={(e) => setFormData({...formData, quantity: e.target.value})} value={formData.quantity} type="number" placeholder="Quantity..." className="mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <input onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price} type="number" placeholder="Price..." className="mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <input onChange={(e) => setFormData({...formData, tier: e.target.value})} value={formData.tier} type="number" placeholder="Tier..." className="mb-4 bg-zinc-900 p-2 text-white w-full outline-0"/>
      <br />
      <div onClick={ submitForm } className={`rounded-sm text-center font-semibold cursor-pointer ${Colors.wtb} text-zinc-800 text-base p-2`}>List</div>
    </form>
  )
}

export default ListForm