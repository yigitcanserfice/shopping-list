import React from 'react'
import { MdDeleteForever } from "react-icons/md"
import { FaPen } from "react-icons/fa";
import { useState } from 'react';
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { IoIosArrowDropupCircle } from "react-icons/io";

// ShoppingList.jsx
// ...

export default function ShoppingList({ item, toggleComplete, deleteItem, updateItem }) {
  const [editMode, setEditMode] = useState(false);
  const [dropdown, setdropdown] = useState(false);
  const [editedText, setEditedText] = useState(item.text);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditComplete = () => {
    // Öğeyi güncelleme fonksiyonunu çağır
    updateItem(item.id, editedText);
    setEditMode(false);
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setEditedText(item.text);
  };

  //Dropdown
  const activateDropdown = () =>{
    setdropdown(!dropdown)
  }
  

  return (
    <li className={item.completed ? 'flex justify-between bg-slate-400 p-4 my-2 capitalize' : 'flex justify-between bg-slate-200 p-4 my-2 capitalize'}>
      <div className='flex'>
        {dropdown ? <>{editMode ? (
          <>
          <div className='flex gap-2'>
          <input type="text" value={editedText} onChange={handleEditChange} />
            <button onClick={handleEditComplete} className=' bg-green-500 rounded-lg px-2 py-1 text-slate-100'>Save</button>
            <button onClick={handleEditCancel} className='bg-red-500 text-slate-100 rounded-lg px-2 py-1'>Cancel</button>
          </div>
            
          </>
        ) : (
          <>
          
            <div className='flex flex-col gap-2'>
            <div className='flex text-xl font-semibold'>
            
            <p onClick={() => toggleComplete(item)} className={item.completed ? 'ml-2 cursor-pointer line-through' : 'ml-2 cursor-pointer'}>{item.text}</p>
            </div>
            <div className=' '>
            <p onClick={() => toggleComplete(item)} className={item.completed ? 'ml-2 cursor-pointer line-through max-w-64 break-words' : 'ml-2 cursor-pointer max-w-64 break-words'}>{item.description}</p>
            </div>
            </div>
                         
            
            
          </>
        )}</> : 
        <>
       
        {editMode ? (
          <>
          <div className='flex gap-2'>
          <input type="text" value={editedText} onChange={handleEditChange} />
            <button onClick={handleEditComplete} className=' bg-green-500 rounded-lg px-2 py-1 text-slate-100'>Save</button>
            <button onClick={handleEditCancel} className='bg-red-500 text-slate-100 rounded-lg px-2 py-1'>Cancel</button>
          </div>
            
          </>
        ) : (
          <>
          
            <p onClick={() => toggleComplete(item)} className={item.completed ? 'ml-2 cursor-pointer line-through' : 'ml-2 cursor-pointer'}>{item.text}</p>
            
            
          </>
        )}
        
        </>
        
        }       
        
      </div>
      <div className='flex gap-2'>
        {dropdown ? <button className='flex items-center cursor-pointer' onClick={activateDropdown}><IoIosArrowDropupCircle size={30}/></button>: <button className='flex items-center cursor-pointer' onClick={activateDropdown}><IoIosArrowDropdownCircle size={30}/></button>}
      
        <button className='flex items-center cursor-pointer' onClick={activateEditMode}><FaPen size={20} /></button>
        <button onClick={() => deleteItem(item.id)} className='flex items-center cursor-pointer'><MdDeleteForever size={30} /></button>
      </div>
    </li>
  );
}

