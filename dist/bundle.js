(()=>{const e=document.getElementsByTagName("button"),t=document.getElementById("text"),a=document.getElementsByClassName("tags-area")[0],l=document.getElementsByTagName("input")[0];function n(e){e.innerHTML=""}const o={showTags:()=>{n(a);for(let e=0;e<o.tagsName.length;e++)a.innerHTML+=`<span>${o.tagsName[e]}<button name="${o.tagsName[e]}">X</button></span> `;for(let t=1;t<e.length;t++)e[t].onclick=e=>o.deleteTag(e.target.name)},deleteTag:e=>{localStorage.removeItem(e),o.showTags()},get tagsName(){let e=Object.keys(localStorage),t=[];for(let a of e)t.push(localStorage.getItem(a));return t},set tagsName(e){if(""==e||" "==e)return void alert("you not input tag");" "===e[e.length-1]&&(e=e.slice(0,-1))," "===e[0]&&(e=e.slice(1));let t=e.split(" ");for(let e=0;e<t.length;e++)localStorage.setItem(t[e],t[e])}};l.onchange=()=>{t.disabled=!t.disabled;for(let t=0;t<e.length;t++)e[t].classList.toggle("hide")},o.showTags(),t.oninput=()=>t.value=t.value.replace(/\s+/g," "),e[0].onclick=()=>{o.tagsName=t.value,n(t),o.showTags()}})();