(()=>{"use strict";console.log("Hello !"),document.querySelector("#user-list-get").onclick=async function(e){const n=await fetch("api/users/",{method:"GET",credentials:"same-origin",headers:{Accept:"application/json","Content-Type":"application/json"}}),t=await n.json(),o=document.querySelector("#user-list");o.textContent="",t.forEach((e=>{console.log(`<li>${e.name}</li>`);const n=document.createElement("li");n.innerHTML=`<b>Пользователь:</b> ${e.name}`,n.id=`${e.id}_${e.username}`,o.append(n)})),console.log(t),document.querySelector("#user-list").value+=t.name+"\n"}})();