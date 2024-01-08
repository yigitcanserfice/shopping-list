import React, {useEffect, useState} from "react";
import { GoPlus } from "react-icons/go";
import ShoppingList from "./Components/ShoppingList";
import {collection, onSnapshot, query, querySnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import {db} from './firebase'
import Welcome from "./Components/Welcome";
import Homepage from "./Components/Homepage";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";




function App() {
  
//   const [items, setItems] = useState([])
//   const [input, setInput] = useState('')
//   const [desc, setDesc] = useState('')
//   // Create shopping list
//   const createList = async (e) => {
//     e.preventDefault(e)
//     if(input === ''){
//       alert('Please enter a shopping item!')
//       return
//     }
//     await addDoc(collection(db, 'shopping-items'), {
//       text: input,
//       completed: false,
//       description: desc,
//     })
//     setInput('')
//     setDesc('')
    
//   }


//   // Read shopping list
//   useEffect(()=>{
//     const q = query(collection(db, 'shopping-items'))
//     const unsubscribe = onSnapshot(q, (querySnapshot) =>{
//       let itemsArr = []
//       querySnapshot.forEach((doc) => {
//         itemsArr.push({...doc.data(), id: doc.id})
//       })
//       setItems(itemsArr)
//     })
//     return () => unsubscribe
//   },[])

//   // Update shopping list
//   const updateItem = async (id, newText) => {
//   await updateDoc(doc(db, 'shopping-items', id), {
//     text: newText,
//   });
// };


//   // ToggleComplete
//   const toggleComplete = async (item) => {
//     await updateDoc(doc(db, 'shopping-items', item.id), {
//       completed: !item.completed
//     })
//   }
//   // Delete shopping list
//   const deleteItem = async (id) =>{
//     await deleteDoc(doc(db, 'shopping-items', id))
//   }



  return (
    // <div className='h-screen w-screen p-4 bg-gradient-to-r from-[#7BD3EA] to-[#A1EEBD]'>
    //   <div className='bg-slate-100 w-full m-auto max-w-[500px] rounded-md shadow-xl p-5'>

    //   <h3 className='font-bold text-3xl text-center text-gray-600 p-2 '>Shopping List</h3>
    //   <form onSubmit={createList} className='flex justify-between'>
    //     <input value={input} onChange={(e) => setInput(e.target.value)} className='border p-2 w-full text-lg' type="text" placeholder="Add Shopping Item"/>
    //     <input value={desc} onChange={(e) => setDesc(e.target.value)} className='border p-2 w-full text-lg ml-2' type="text" placeholder="Add Description"/>
    //     <button className='border p-4 ml-2 bg-[#3887BE] text-slate-100'><GoPlus size={30} /></button>
    //   </form>
    //   <ul>
    //     {items.map((item, index)=>(
    //       <ShoppingList key={index} item={item} toggleComplete={toggleComplete} deleteItem={deleteItem} updateItem={updateItem} ></ShoppingList>
    //     ))}
        
    //   </ul>
    //   {items.length < 1 ? '' : <p className=" text-center p2">{`You have ${items.length} shopping items`}</p>}
      
    //   </div>
    // </div>
    <div className="app">
    
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/homepage" element={<Homepage/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
//<ShoppingList></ShoppingList>