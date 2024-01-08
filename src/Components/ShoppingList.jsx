import React from 'react'
import { MdDeleteForever } from "react-icons/md"
import { FaPen } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useState } from 'react';


// ShoppingList.jsx
// ...

export default function ShoppingList({ item, toggleComplete, deleteItem, updateItem }) {
  const [editMode, setEditMode] = useState(false);
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

  return (
    <li className={item.completed ? 'flex justify-between bg-slate-400 p-4 my-2 capitalize' : 'flex justify-between bg-slate-200 p-4 my-2 capitalize'}>
      <div className='flex'>
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
            <input onChange={() => toggleComplete(item)} type="checkbox" checked={item.completed ? 'checked' : ''} />
            <p onClick={() => toggleComplete(item)} className={item.completed ? 'ml-2 cursor-pointer line-through' : 'ml-2 cursor-pointer'}>{item.text}</p>
          </>
        )}
      </div>
      <div className='flex gap-2'>
        <button className='flex items-center cursor-pointer' onClick={activateEditMode}><FaPen size={20} /></button>
        <button onClick={() => deleteItem(item.id)} className='flex items-center cursor-pointer'><MdDeleteForever size={30} /></button>
      </div>
    </li>
  );
}

