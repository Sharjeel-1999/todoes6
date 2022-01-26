const firebaseConfig = {
  apiKey: "AIzaSyDSlypZZQeqZy5Z0hgrVxBDE1x2N_dQThs",
  authDomain: "quiz-b261f.firebaseapp.com",
  projectId: "quiz-b261f",
  storageBucket: "quiz-b261f.appspot.com",
  messagingSenderId: "88952241952",
  appId: "1:88952241952:web:25efa874ad8722acaba145",
};
const app = firebase.initializeApp(firebaseConfig);
// console.log(app)
firebase
  .database()
  .ref("todos")
  .on("child_added", (data)=>{
    // console.log(data.val())
      let trVar = document.createElement("tr");
      let tHVar = document.createElement("th");
      let editVar = document.createElement("td");
      let deleteVar = document.createElement("td");

      let editBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");

      editBtn.setAttribute("class", "editBtn");
      deleteBtn.setAttribute("class", "delBtn");

      editBtn.setAttribute("onclick", "editItem(this)");
      editBtn.setAttribute("id", data.val().key);
      deleteBtn.setAttribute("onclick", "delItem(this)");
      deleteBtn.setAttribute("id", data.val().key);



      // var itemVal = document.createTextNode(val.value);
      // var val = document.getElementById("item");
      let itemVal = document.createTextNode(data.val().value);  
      let editBtnTxt = document.createTextNode("Edit");
      let deleteBtnTxt = document.createTextNode("Delete");

      editBtn.appendChild(editBtnTxt);
      deleteBtn.appendChild(deleteBtnTxt);

      tHVar.appendChild(itemVal);
      editVar.appendChild(editBtn);
      deleteVar.appendChild(deleteBtn);

      trVar.appendChild(tHVar);
      trVar.appendChild(editVar);
      trVar.appendChild(deleteVar);

      tHVar.setAttribute("class", "firstTd");
      editVar.setAttribute("class", "secondTd");
      deleteVar.setAttribute("class", "thirdTd");

      let tbVar = document.getElementById("table");
      tbVar.appendChild(trVar);
    
  });
  let randomkey = firebase.database().ref("todos"); //random firebase ki key heee path addresstype
  let  addItem=()=> {
  let val = document.getElementById("item");
  if (val.value != "") {
  let key = randomkey.push().key;
  let todo = {
    value: val.value,
    key: key,
  };
  randomkey.child(key).set(todo);
  val.value = "";
  }
}

 let clearall=()=> {
  let tbData = document.getElementById("table");
  tbData.innerHTML = "";
}
 delItem=(e)=> {
  randomkey.child(e.id).remove();
  e.parentNode.parentNode.remove();
  // console.log(e.id)
}

 let editItem=(e)=> {
  // console.log(e.id)
  let litxt = e.parentNode.parentNode.firstChild.firstChild.nodeValue;
  let editLiTxt = prompt("EDIT TODO", litxt);
  let edittodo={
    value:editLiTxt,
    key:e.id
  }
  randomkey.child(e.id).set(edittodo)
  e.parentNode.parentNode.firstChild.firstChild.nodeValue = editLiTxt;
  // console.log(edittodo)
}
