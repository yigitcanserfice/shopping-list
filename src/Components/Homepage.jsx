import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import ShoppingListItem from "./ShoppingListItems";
import { collection, onSnapshot, updateDoc, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { uid } from 'uid';

export default function Homepage() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [desc, setDesc] = useState('');

  const navigate = useNavigate();

  //Create  shoppingList -> Daha önce şu anki kullanıcıya özel bir collection oluşturulmadıysa oluşturur ve veri girişi yapar.
  const createList = async (e) => {
    const uidd = uid();
    e.preventDefault(e);

    if (input === '') {
      alert('Please enter a shopping item!');
      return;
    }

    // auth.currentUser nesnesi null olabilir, bu durumu kontrol et
    if (!auth.currentUser) {
      return;
    }

    await addDoc(collection(db, `/${auth.currentUser.uid}`), {
      text: input,
      completed: false,
      description: desc,
      uid: uidd,
    });
    setInput('');
    setDesc('');
  }

  // Read shopping list -> Kullanıcı oturumu kontrolü bittikten sonra şu anki kullanıcının id sine göre verileri çek.
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      } else {
       
        const q = collection(db, `/${auth.currentUser.uid}`);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let itemsArr = [];
          querySnapshot.forEach((doc) => {
            itemsArr.push({ ...doc.data(), id: doc.id });
          });
          setItems(itemsArr);
        });
  
        return () => unsubscribe;
      }
    });
  
    return () => {
      unsubscribeAuth();
    };
  }, [auth.currentUser, navigate]);


  
  // Update shopping list -> Verileri güncellediğimiz kısım.
  const updateItem = async (id, newText) => {
    // auth.currentUser nesnesi null olabilir, bu durumu kontrol et
    if (!auth.currentUser) {
      return;
    }

    await updateDoc(doc(db, `/${auth.currentUser.uid}`, id), {
      text: newText,
    });
  };

  // ToggleComplete -> listedeki itemın complate özelliğini tıklandığında true ve false yap.
  const toggleComplete = async (item) => {
    // auth.currentUser nesnesi null olabilir, bu durumu kontrol et
    if (!auth.currentUser) {
      return;
    }

    await updateDoc(doc(db, `/${auth.currentUser.uid}`, item.id), {
      completed: !item.completed
    })
  }

  // Delete shopping list -> listedki item i silme işlemi
  const deleteItem = async (id) => {
    // auth.currentUser nesnesi null olabilir, bu durumu kontrol et
    if (!auth.currentUser) {
      return;
    }

    await deleteDoc(doc(db, `/${auth.currentUser.uid}`, id))
  }


  // Çıkış yapma.
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch(err => alert(err.message))
  }


  //Homepage tasarımı
  return (
    <div className='h-screen w-screen p-4 bg-gradient-to-r from-[#7BD3EA] to-[#A1EEBD]'>
      
      <div className='bg-slate-100 w-full m-auto max-w-[500px] rounded-md shadow-xl p-5'>
        <div className='flex justify-end -mt-2 -mr-2'>
        <button onClick={handleSignOut} className=' rounded-md bg-red-500 text-slate-200 font-semibold px-2 py-1'>Sign Out</button>
        </div>
      
        <h3 className='font-bold text-3xl text-center text-gray-600 p-2 mb-5'>Shopping List</h3>
        <form onSubmit={createList} className='flex justify-between'>
          <input value={input} onChange={(e) => setInput(e.target.value)} className='border p-2 w-full text-lg' type="text" placeholder="Add Shopping Item"/>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} className='border p-2 w-full text-lg ml-2' type="text" placeholder="Add Description"/>
          <button className='border p-4 ml-2 bg-[#3887BE] text-slate-100'><GoPlus size={30} /></button>
        </form>
        <ul>
          {items.map((item, index) => (
            <ShoppingListItem key={index} item={item} toggleComplete={toggleComplete} deleteItem={deleteItem} updateItem={updateItem}></ShoppingListItem>
          ))}
        </ul>
        {items.length < 1 ? '' : <p className="text-center p2">{`You have ${items.length} shopping items`}</p>}
        
      </div>
      
   
    </div>
  );
}
