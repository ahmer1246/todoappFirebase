import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore ,collection, setDoc, query,onSnapshot,  getDocs ,doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js';


const firebaseConfig = {
  apiKey: "AIzaSyCr-YPMPsitF9U7Ipiez1O4wvJcl-YV4m0",
  authDomain: "todoapp-firebas.firebaseapp.com",
  projectId: "todoapp-firebas",
  storageBucket: "todoapp-firebas.appspot.com",
  messagingSenderId: "90679693246",
  appId: "1:90679693246:web:fba810eb8c8f9ee092b3ef",
  measurementId: "G-E8TLPYFJTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);






console.log("hello")

let input = document.getElementById("inpval");
let addBtn = document.getElementById("add");
let readBtn = document.getElementById("save");
let deleteAllBtn = document.getElementById("deleteAll");
let ulEl = document.getElementById("list");
let delBtn = document.getElementById("delBtn");





let id= new Date().getTime();
let timestamp = new Date();
console.log(timestamp)

const addData = async ()=>{
    let inputVal = input.value;
    const id = new Date().getTime()
    let payload ={
        id,
        todo:inputVal,
        time:timestamp
    }
    console.log(inputVal)
// try {
//         const docRef = await addDoc(collection(db, "Todos"),payload);
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }


  await setDoc(doc(db, "Todos", `${id}`), payload);
}


const readData = async()=>{
let items = "";
   const q = query(collection(db, "Todos"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const blogs = [];
  querySnapshot.forEach((doc) => {
      blogs.push(doc.data());
  });
  

  items = blogs.map((todoObj)=>`<li class="todoList"> Todo : ${todoObj.todo } <button id="delBtn" onclick="const delFun = ()=>{
    console.log("hello ahmer")  }">Delete</button></li>`).join("");
  console.log("Current cities in CA: ", blogs.join(", "));
  ulEl.innerHTML = items;
});


}



const deleteData = async ()=>{
  let idNo = `${id}`;
  console.log(idNo)
  await deleteDoc(doc(db, "Todos",`${idNo}`));
}
readBtn.addEventListener("click",readData)
addBtn.addEventListener("click",addData)



deleteAllBtn.addEventListener("click",deleteData)