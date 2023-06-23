var btn = document.querySelector(".btn")
var text = document.querySelector(".text")
var list = document.querySelector(".list")
var select = document.querySelector(".todolist")
gettodo()


btn.addEventListener("click",(event)=>{
    if(text.value=="")
    {
        alert("enter something")
    }
    else{ 
        //preventing from reloading 
        event.preventDefault()

        //creating a div to append to the list 
        // here list is ul inside the ul there will be div and then li 
        const div=document.createElement("div")
        div.classList.add("task")
        list.append(div)
        
        //creating li inside the div and appending to div

         let item = document.createElement("li")
        item.innerText=text.value
        div.append(item)
        item.classList.add("item1")
        localdata(text.value)
        text.value=""//after appending the text as todo then after maxing the text box empty

        //creating complete button and then appending to the div
        const complete = document.createElement("button")
        complete.innerHTML= '<i class="fa-solid fa-check"></i>'
        div.append(complete)
        complete.classList.add("complete")


        //creating trash button and then appending to the div

        const trash = document.createElement("button")   
        trash.innerHTML='<i class="fa-solid fa-trash"></i>'
        trash.classList.add("trash")
        div.append(trash)

       
        console.log(text.value)
       
    }
})
list.addEventListener('click',(e)=>{
    // console.log(e.target)
    // console.log(e.target.classList)
    const btn= e.target

    if(e.target.classList[0]=="trash")
    {

        btn.parentElement.classList.add("fall")
        deltodo(btn.parentElement.innerText)

        btn.parentElement.addEventListener("transitionend",()=>{
            btn.parentElement.remove()
        })
        // btn.parentElement.remove()
        
    }
    if(e.target.classList[0]=="complete")
    {
        btn.parentElement.classList.toggle("done")
        console.log(btn.parentElement.classList)
       
        if(btn.innerHTML=='<i class="fa-solid fa-check"></i>')
        {
            console.log("hello")
            btn.innerHTML='<i class="fa-solid fa-xmark"></i>' 
        }
        else
        {
            console.log("bye")
             btn.innerHTML='<i class="fa-solid fa-check"></i>'
        }
       
    }
})


//adding eventlistener on select

select.addEventListener("click",filtertodo)

//creating function for nodlist of the ul 
function filtertodo(e)
{
    let nodes = list.childNodes
    console.log(nodes)
    nodes.forEach((node)=>
    {
        switch(e.target.value)
        {
            case "all":
                 node.style.display="flex"
                 break;
            case "complete":
                if(node.classList.contains("done"))
                node.style.display="flex"
                else
                node.style.display="none"
                break;
            case "uncomplete":
                if(!node.classList.contains("done"))
                node.style.display="flex"
                else
                node.style.display="none"
                break;
        }
    })
}


function localdata(todo)
{
    //check weather the data is already present in local storage 
    let  todos;

    if(localStorage.getItem("todos")==null)
    {
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))



   
}

function gettodo()
{
    if(localStorage.getItem("todos")==null)
    {
        todos=[]
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }


    todos.forEach((value)=>{
        // here list is ul inside the ul there will be div and then li 
        const div=document.createElement("div")
        div.classList.add("task")
        list.append(div)
        
        //creating li inside the div and appending to div

         let item = document.createElement("li")
        item.innerText=value
        div.append(item)
        item.classList.add("item1")
        text.value=""//after appending the text as todo then after maxing the text box empty

        //creating complete button and then appending to the div
        const complete = document.createElement("button")
        complete.innerHTML= '<i class="fa-solid fa-check"></i>'
        div.append(complete)
        complete.classList.add("complete")


        //creating trash button and then appending to the div

        const trash = document.createElement("button")   
        trash.innerHTML='<i class="fa-solid fa-trash"></i>'
        trash.classList.add("trash")
        div.append(trash)

    })

}
function deltodo(todo)
{
    let todos;
    if(localStorage.getItem("todos")==null)
    todos=[]
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    let ind = todos.indexOf(todo.toLowerCase())
    todos.splice(ind,1)
    localStorage.setItem("todos",JSON.stringify(todos))
   
}
