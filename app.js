const K="wnar_pos_v1";
const D=[
["Nasi Goreng Ayam","NASI GORENG SPECIAL",10],["Nasi Goreng Ayam Sambal","NASI GORENG SPECIAL",11],["Nasi Goreng Kg. Ayam","NASI GORENG SPECIAL",10],["Nasi Goreng Kg. Ayam Sambal","NASI GORENG SPECIAL",11],["Nasi Goreng Cina Ayam","NASI GORENG SPECIAL",10],["Nasi Goreng Cina Ayam Sambal","NASI GORENG SPECIAL",11],
["Madu","NASI AYAM",9],["Sambal","NASI AYAM",10],["Penyet","NASI AYAM",10],["Nasi Putih Ayam Sambal","NASI AYAM",8],
["Merah / Kampung / Cina","NASI GORENG SIMPLE",7],
["Goreng Biasa / Sup","MEE / MIHUN / KUETIAU",7],["Goreng + Ayam Seketul","MEE / MIHUN / KUETIAU",9],
["Sambal / Rempah / Penyet","AYAM",6],["Madu","SET AYAM",5],["Penyet","SET AYAM",8],
["Mata","TELUR",1.5],["Dadar","TELUR",1.8],
["Nasi Ayam Penuh","NASI TAMBAH",4],["Separuh","NASI TAMBAH",2],["Nasi Putih Penuh","NASI TAMBAH",2],["Separuh","NASI TAMBAH",1],
["Sos Nasi Ayam / Sambal Ayam / Belacan","ADD ON",1]
].map((x,i)=>({id:"m"+(i+1),name:x[0],cat:x[1],price:x[2]}));
let S=JSON.parse(localStorage.getItem(K)||"null")||{menus:D,sales:[],tables:{}};
S.tables=S.tables||{};
let cart=[],pay="Cash",cat="SEMUA",table="01",splitPay="Cash",splitSelection={};
const TABLES=Array.from({length:20},(_,i)=>String(i+1).padStart(2,"0"));
const $=id=>document.getElementById(id), rm=n=>"RM"+n.toFixed(2), today=d=>new Date(d||Date.now()).toLocaleDateString("en-CA");
function save(){localStorage.setItem(K,JSON.stringify(S))}
function tableTotal(t){return (S.tables[t]||[]).reduce((a,x)=>{let m=S.menus.find(z=>z.id==x.id);return a+(m?m.price*x.q:0)},0)}
function renderTables(){$("tables").innerHTML=TABLES.map(t=>{let busy=(S.tables[t]||[]).length;return `<button class="tablebtn ${t==table?"on ":""}${busy?"busy":""}" onclick="selectTable('${t}')"><b>Meja ${t}</b><small>${busy?rm(tableTotal(t)):"Kosong"}</small></button>`}).join("")}
function selectTable(t){S.tables[table]=cart.length?cart:undefined;if(!cart.length)delete S.tables[table];table=t;cart=(S.tables[t]||[]).map(x=>({...x}));save();render()}
window.selectTable=selectTable;
function render(){renderTables();
 let cs=["SEMUA",...new Set(S.menus.map(x=>x.cat))];$("cats").innerHTML=cs.map(x=>`<button class="${cat==x?"on":""}" onclick="cat='${x.replaceAll("'","&#39;")}';render()">${x}</button>`).join("");
 let ms=cat=="SEMUA"?S.menus:S.menus.filter(x=>x.cat==cat);
 $("products").innerHTML=ms.map(x=>`<button class="product" onclick="add('${x.id}')"><b>${x.name}</b><small>${x.cat}</small><strong>${rm(x.price)}</strong></button>`).join("");
 let total=0,n=0;
 $("cart").innerHTML=cart.length?cart.map(x=>{let m=S.menus.find(a=>a.id==x.id);total+=m.price*x.q;n+=x.q;return `<div class="cartrow"><div><b>${m.name}</b><br><small>${rm(m.price)} × ${x.q}</small></div><div class="qty"><button onclick="chg('${x.id}',-1)">−</button> ${x.q} <button onclick="chg('${x.id}',1)">+</button></div></div>`}).join(""):"<p style='text-align:center;color:#999'>Belum ada menu dipilih.</p>";
 $("total").textContent=rm(total);$("selectedTable").textContent="Meja "+table;$("order").textContent="#"+String(S.sales.length+1).padStart(4,"0");
}
function syncTable(){if(cart.length)S.tables[table]=cart.map(x=>({...x}));else delete S.tables[table];save()}
function add(id){let x=cart.find(a=>a.id==id);x?x.q++:cart.push({id,q:1});syncTable();render()}
function chg(id,n){let x=cart.find(a=>a.id==id);x.q+=n;if(x.q<1)cart=cart.filter(a=>a.id!=id);syncTable();render()}
window.add=add;window.chg=chg;
document.querySelectorAll(".pay button").forEach(b=>b.onclick=()=>{pay=b.dataset.pay;document.querySelectorAll(".pay button").forEach(x=>x.classList.toggle("sel",x==b))});
$("clear").onclick=()=>{if(confirm("Kosongkan pesanan Meja "+table+"?")){cart=[];syncTable();render()}};
function openSplit(){
 if(!cart.length)return alert("Pesanan masih kosong.");
 splitSelection={};
 $("splitTable").textContent=table;
 $("splitItems").innerHTML=cart.map(x=>{let m=S.menus.find(a=>a.id==x.id);return `<div class="splitrow"><div><b>${m.name}</b><small>${rm(m.price)} × ${x.q}</small></div><div class="splitqty"><button type="button" onclick="splitQty('${x.id}',-1)">−</button><b id="sq-${x.id}">0</b><button type="button" onclick="splitQty('${x.id}',1)">+</button></div></div>`}).join("");
 splitPay="Cash";document.querySelectorAll("#splitPay button").forEach(b=>b.classList.toggle("sel",b.dataset.pay==splitPay));
 updateSplitTotal();$("splitModal").classList.remove("hide");
}
function splitQty(id,n){let item=cart.find(x=>x.id==id);if(!item)return;let cur=splitSelection[id]||0;cur=Math.max(0,Math.min(item.q,cur+n));if(cur)splitSelection[id]=cur;else delete splitSelection[id];$("sq-"+id).textContent=cur;updateSplitTotal()}
function updateSplitTotal(){let total=Object.entries(splitSelection).reduce((sum,[id,q])=>{let m=S.menus.find(x=>x.id==id);return sum+(m?m.price*q:0)},0);$("splitTotal").textContent=rm(total)}
function finishSplit(){
 let chosen=cart.filter(x=>splitSelection[x.id]>0).map(x=>{let m=S.menus.find(a=>a.id==x.id);return{name:m.name,price:m.price,q:splitSelection[x.id]}});
 if(!chosen.length)return alert("Pilih sekurang-kurangnya satu item.");
 let total=chosen.reduce((a,x)=>a+x.price*x.q,0);
 S.sales.unshift({no:S.sales.length+1,date:new Date().toISOString(),table,pay:splitPay,items:chosen,total,split:true});
 cart=cart.map(x=>{let paid=splitSelection[x.id]||0;return {...x,q:x.q-paid}}).filter(x=>x.q>0);
 syncTable();$("splitModal").classList.add("hide");render();history();report();alert("Bayaran split berjaya disimpan.");
}
window.splitQty=splitQty;
$("splitBill").onclick=openSplit;
$("cancelSplit").onclick=()=>$("splitModal").classList.add("hide");
$("confirmSplit").onclick=finishSplit;
document.querySelectorAll("#splitPay button").forEach(b=>b.onclick=()=>{splitPay=b.dataset.pay;document.querySelectorAll("#splitPay button").forEach(x=>x.classList.toggle("sel",x==b))});
$("saveSale").onclick=()=>{if(!cart.length)return alert("Pesanan masih kosong.");let items=cart.map(x=>{let m=S.menus.find(a=>a.id==x.id);return{name:m.name,price:m.price,q:x.q}}),total=items.reduce((a,x)=>a+x.price*x.q,0);S.sales.unshift({no:S.sales.length+1,date:new Date().toISOString(),table,pay,items,total});delete S.tables[table];save();cart=[];render();history();report();alert("Jualan berjaya disimpan.")};
function history(){if(!S.sales.length){$("history").innerHTML="<p>Belum ada rekod jualan.</p>";return}$("history").innerHTML=`<table class="table"><tr><th>No.</th><th>Meja</th><th>Tarikh/Masa</th><th>Item</th><th>Bayaran</th><th>Jumlah</th></tr>${S.sales.map(s=>`<tr><td>#${s.no}</td><td>Meja ${s.table||"-"}</td><td>${new Date(s.date).toLocaleString("ms-MY")}</td><td>${s.items.map(i=>i.name+" × "+i.q).join("<br>")}</td><td>${s.pay}</td><td><b>${rm(s.total)}</b></td></tr>`).join("")}</table>`}
$("clearSales").onclick=()=>{if(confirm("Padam semua rekod jualan?")){S.sales=[];save();history();report();render()}};
function admin(){$("admin").innerHTML=`<table class="table"><tr><th>Menu</th><th>Kategori</th><th>Harga</th><th></th></tr>${S.menus.map(m=>`<tr><td>${m.name}</td><td>${m.cat}</td><td>${rm(m.price)}</td><td><button class="action" onclick="edit('${m.id}')">Edit</button><button class="action danger" onclick="del('${m.id}')">Padam</button></td></tr>`).join("")}</table>`}
window.del=id=>{if(confirm("Padam menu ini?")){S.menus=S.menus.filter(m=>m.id!=id);save();admin();render()}};
window.edit=id=>{let m=S.menus.find(x=>x.id==id);$("eid").value=m.id;$("mn").value=m.name;$("mc").value=m.cat;$("mp").value=m.price;$("mt").textContent="Edit Menu";$("modal").classList.remove("hide")};
$("add").onclick=()=>{$("form").reset();$("eid").value="";$("mt").textContent="Tambah Menu";$("modal").classList.remove("hide")};
$("cancel").onclick=()=>$("modal").classList.add("hide");
$("form").onsubmit=e=>{e.preventDefault();let id=$("eid").value,m={id:id||"m"+Date.now(),name:$("mn").value.trim(),cat:$("mc").value.trim(),price:+$("mp").value};if(id)S.menus[S.menus.findIndex(x=>x.id==id)]=m;else S.menus.push(m);save();$("modal").classList.add("hide");admin();render()};
function report(){let d=$("rdate").value||today(),a=S.sales.filter(s=>today(s.date)==d),t=a.reduce((x,s)=>x+s.total,0),c=a.filter(s=>s.pay=="Cash").reduce((x,s)=>x+s.total,0),q=a.filter(s=>s.pay=="QR Pay").reduce((x,s)=>x+s.total,0);$("rt").textContent=rm(t);$("rc").textContent=rm(c);$("rq").textContent=rm(q);$("rn").textContent=a.length;let z={};a.forEach(s=>s.items.forEach(i=>z[i.name]=(z[i.name]||0)+i.q));$("items").innerHTML=Object.entries(z).map(x=>`<p>${x[0]} — <b>${x[1]}</b></p>`).join("")||"<p>Tiada jualan pada tarikh ini.</p>"}
$("rdate").value=today();$("rdate").onchange=report;
document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on",x==b));document.querySelectorAll(".page").forEach(x=>x.classList.toggle("on",x.id==b.dataset.page));if(b.dataset.page=="rekod")history();if(b.dataset.page=="menu")admin();if(b.dataset.page=="laporan")report()});
$("backup").onclick=()=>{let a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,2)],{type:"application/json"}));a.download="backup-warung-nasi-ayam-rindu.json";a.click()};
$("restore").onchange=e=>{let r=new FileReader;r.onload=()=>{try{S=JSON.parse(r.result);save();cart=S.tables[table]||[];render();history();admin();report();alert("Backup dipulihkan.")}catch{alert("Fail backup tidak sah.")}};r.readAsText(e.target.files[0])};
cart=S.tables[table]||[];render();history();admin();report();