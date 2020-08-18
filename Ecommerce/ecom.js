// init "Product"
var arrProduct = [
    { id: 1579581080923,category: 'Fast Food' , name: "Noodle", price: 3500, stock : 9},
    { id: 1579581081130,category: 'Electronic' , name: "Headphone", price: 4300000, stock :8 },
    { id: 1579581081342,category: 'Cloth' , name: "Hoodie", price: 300000, stock :7 },
    { id: 1579581081577,category: 'Fruit' , name: "Apple", price: 10000, stock :8 }
  ];

// init "Category"
var arrCategory = ["All","Fast Food","Electronic","Cloth","Fruit"];

// ini "Cart"
var cart=[]

// everthing that has to be rendered when web initially opened
const tampilanawal=()=>{
    // Show init list
    var outprod=arrProduct.map((val,index)=>{
        return `<tr>
                    <td>${val.id}</td>
                    <td>${val.category}</td>
                    <td>${val.name}</td>
                    <td>${val.price}</td>
                    <td>${val.stock}</td>
                    <td><input type="button" value="delete" onclick="funcdelete(${index})"></td>
                    <td><input type="button" value="edit" onclick="funcedit(${index})"></td>
                <tr>`
    })
    // Adding options into <select>"Category"
    var outcategory=arrCategory.map((val)=>{
        return (`<option value="${val}">${val}</option>`)
    })
    document.getElementById("categoryFilter").innerHTML=outcategory.join('')
    document.getElementById("categoryInput").innerHTML=outcategory.join('')
    document.getElementById("renderData").innerHTML=outprod.join('')
}



/* functions of Filter */

const funcfilter=()=>{
    var nameinput=document.getElementById("keyword").value
    var minprice=document.getElementById("min").value
    var maxprice=document.getElementById("max").value
    var category=document.getElementById("categoryFilter").value
    
    var newarrprod=arrProduct.filter((val)=>{
        var inputname=val.name.toLowerCase().includes(nameinput.toLowerCase()) // return boolean
        var inputprice=val.price>=minprice && val.price<=maxprice // return boolean
        if(!minprice||!maxprice){ 
            inputprice=true
        } // to make 0 value still filtered
        var inputcategory=val.category==category && category!="All"
        if(category=="All"){ 
            inputcategory=true
        } // when user doesnt choose any category so "all" prod will showed up
        return inputname && inputprice && inputcategory
    })

    console.log(newarrprod)
    document.getElementById("renderData").innerHTML=Showfilter(newarrprod).join('')
}

// let funcfiltername=()=>{
//     var nameinput=document.getElementById("keyword").value
//     var newarrprod= arrProduct.funcfilter((val)=>{
//         return val.name.toLowerCase().includes(nameinput.toLowerCase())
//     })
//     document.getElementById("renderData").innerHTML=Showfilter(newarrprod).join('')

// }
// let funfilterprice=()=>{
//     var minprice=document.getElementById('min').value
//     var maxprice=document.getElementById('max').value
//     var newarr=arrProduct
//     if(minprice!='' && maxprice!=''){
//         newarr=arrProduct.filter((val)=>val.price>=minprice&&val.price<=maxprice)
//     }
//     document.getElementById('render').innerHTML=Showfilter(newarr).join('')
// }

// let funcfiltercategory=()=>{
//     var category=document.getElementById('categoryFilter').value
//     // document.getElementById('categoryFilter').value
//     console.log(category)
//     var newarr
//     if(category!=='All'){
//         console.log('ass')
//         newarr= arrProduct.filter((val)=>{
//             return val.category==category&&category!=='All'
//         })
//     }else{
//         newarr= arrProduct
//         console.log('aaa')
//     }
//     document.getElementById('render').innerHTML=Showfilter(newarr).join('')

// }
// var 

/* functions of Input Data */
// push user input into "Product"
const funcinputdata=()=>{
    // get user input value of name, price, category, stok, and id (based on time inputed)
    var _nama=document.getElementById("nameInput").value
    var _price=document.getElementById("priceInput").value
    var _category=document.getElementById("categoryInput").value
    var _stock=document.getElementById("stockInput").value
    var _id=new Date().getTime()

    // push into "Product"
    arrProduct.push(
        {
            id: _id,
            category: _category,
            name: _nama,
            price: _price,
            stock: _stock
        },
    )
    document.getElementById("nameInput").value='';
    document.getElementById("priceInput").value='';
    document.getElementById("categoryInput").value='';
    document.getElementById("stockInput").value='';
    tampilanawal()
}
/* -- functions of Input Data -- end */

/* functions of Table Data */
var indexdelete=-1
var indexedit=-1

const funcdelete=(index)=>{
    indexdelete=index
    document.getElementById("renderData").innerHTML=Showfilter(arrProduct).join('')
}

const funcsavedelete=()=>{
    arrProduct.splice(indexdelete,1)
    indexdelete=-1
    document.getElementById("renderData").innerHTML=Showfilter(arrProduct).join('')
}

const funccanceldelete=()=>{
    indexdelete=-1
    document.getElementById("renderData").innerHTML=Showfilter(arrProduct).join('')
}

const funcedit=(index)=>{
    indexedit=index
    document.getElementById("renderData").innerHTML=Showfilter(arrProduct).join('')
}

const funccanceledit=()=>{
    indexedit=-1
    document.getElementById("renderData").innerHTML=Showfilter(arrProduct).join('')
}

const funcsaveedit=()=>{
    // get input edit values
    var nameedit=document.getElementById("editnama"+indexedit).value
    var priceedit=document.getElementById("editprice"+indexedit).value
    var stockedit=document.getElementById("editstock"+indexedit).value
    var categoryedit=document.getElementById("editcategory"+indexedit).value
    
    arrProduct.splice(indexedit,1,{
        ...arrProduct[indexedit],
        category: categoryedit,
        name: nameedit,
        price: priceedit,
        stock: stockedit
    })
    indexedit=-1
    document.getElementById("renderData").innerHTML=Showfilter(arrProduct).join('')
}
/* -- functions of Table Data -- end */

function Showfilter(arr){
    return arr.map((val,index)=>{
        if(index==indexdelete){
            return `<tr>
                        <td>${val.id}</td>
                        <td>${val.category}</td>
                        <td>${val.name}</td>
                        <td>${val.price}</td>
                        <td>${val.stock}</td>
                        <td><input type="button" value="yes" onclick="funcsavedelete()"></td>
                        <td><button onclick="funccanceldelete()">cancel</td>
                    <tr>`
        }else if(index==indexedit){
            var outcategory=arrCategory.map((val1)=>{
                if(val1===val.category){
                    return `<option value="${val1}" selected>${val1}</option>`
                } // to make list drop down start from init category of product(index)
                return (`<option value="${val1}">${val1}</option>`)
            }).join('')
            return (`<tr>
                        <td>${val.id}</td>
                        <td><select id="editcategory${index}">${outcategory}</select></td>
                        <td><input type="text" value="${val.name}" id="editnama${index}"></td>
                        <td><input type="number" value="${val.price}" id="editprice${index}"></td>
                        <td><input type="number" value="${val.stock}" id="editstock${index}"></td>
                        <td><input type="button" onclick="funcsaveedit()" value="save"/></td>
                        <td><button onclick="funccanceledit()">cancel</button></td>
                    </tr>`)
        }
        return (`<tr>
                    <td>${val.id}</td>
                    <td>${val.category}</td>
                    <td>${val.name}</td>
                    <td>${val.price}</td>
                    <td>${val.stock}</td>
                    <td><input type="button" value="delete" onclick="funcdelete(${index})"/></td>
                    <td><input type="button" value="edit" onclick="funcedit(${index})"/></td>
                </tr>`)
    })
}

function tampilkancart(){
    if(cart.length){
        var output=cart.map((val,index)=>{
            return `<tr>
                        <td>${val.id}</td>
                        <td>${val.category}</td>
                        <td>${val.name}</td>
                        <td>${val.price}</td>
                        <td>${val.qty}</td>
                        <td><input type='button' value='delete' onclick='deletecart(${val.id})'/></td>
                    <tr>`
        }).join('')
        return output
    }else{
        return ''
    }
}

const deletecart=(id)=>{
    var indexcart=cart.findIndex((val)=>val.id===id)
    cart.splice(indexcart,1)
    document.getElementById('cart').innerHTML=tampilkancart()
}

tampilanawal()