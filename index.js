let upcomingTab = document.querySelector(".upcoming");
let finishedTab = document.querySelector(".finished");
let unfinishedTask = document.querySelector(".unfinished");
let finishedTask = document.querySelector(".finishedTask");
let addButton = document.querySelector(".add");
let taskarea = document.querySelector("#addNew");
let nav = document.querySelector(".nav");

let uid = new ShortUniqueId();

// using local storage
let allIncompleteTask = [];
if(localStorage.getItem("taskItem")){
    allIncompleteTask = JSON.parse(localStorage.getItem("taskItem"));
    for(let i = 0; i < allIncompleteTask.length; i++){
        let task = allIncompleteTask[i];
        makeTask(task.text, task.parent, task.id);
    }
}

upcomingTab.addEventListener("click", ()=>{
    if(unfinishedTask.classList.contains("invisible")){
        unfinishedTask.classList.remove("invisible");
        unfinishedTask.classList.add("visible");
        finishedTask.classList.add("invisible");
        addButton.classList.remove("invisible");
        finishedTask.classList.remove("visible");
        nav.style.backgroundColor = "#96CEB4";
    }
});
finishedTab.addEventListener("click", ()=>{
    if(finishedTask.classList.contains("invisible")){
        unfinishedTask.classList.remove("visible");
        unfinishedTask.classList.add("invisible");
        finishedTask.classList.remove("invisible");
        finishedTask.classList.add("visible");
        addButton.classList.add("invisible");
        nav.style.backgroundColor = "#FFAD60";

    }
});

addButton.addEventListener("click", ()=>{
    taskarea.classList.toggle("invisible");
    if(addButton.textContent === "+"){
        addButton.textContent = "";
    }else{
        addButton.textContent = "+";
    }
});

taskarea.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        let text = taskarea.value.trim();
        taskarea.value = "";
        taskarea.classList.add("invisible")
        let parent ;
        let id;
        makeTask(text, parent, id);
        addButton.textContent = "+";
    }
});

function makeTask(text, parent, oldId){
    if(text!=""){
        let id;
        let task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = `<input type="checkbox" class="check">
                            <div class="content">${text}</div>
                            <div class="remove">x</div>`;
        if(oldId != undefined){
            id = oldId;
            if(parent === 1){
                unfinishedTask.append(task);
            }else{
                task.querySelector(".check").remove();
                finishedTask.append(task);
            }
        }else{
            let ckecBtn = task.querySelector(".check");
            ckecBtn.addEventListener("click", ()=>{
                finishedTask.prepend(task);
                ckecBtn.remove();
                for(let i = 0; i < allIncompleteTask.length; i++){
                    if(allIncompleteTask[i].id===id){
                        allIncompleteTask[i].parent = 0;
                        break;
                    }
                }
                addToArray();
                // console.log(allIncompleteTask);
            });
            id = uid();
            unfinishedTask.prepend(task);
            let data = {
                text,
                parent:1,
                id
            }
            allIncompleteTask.push(data);
            // console.log(allIncompleteTask);
            addToArray();
        }
        
        let delBtn = task.querySelector(".remove");
        delBtn.addEventListener("click", ()=>{
            task.remove();
            for(let i = 0; i < allIncompleteTask.length; i++){
                if(allIncompleteTask[i].id===id){
                    allIncompleteTask.splice(i,1);
                    break;
                }
            }
            addToArray();            
        })

    }
}

// function that add array to 
function addToArray(){
    localStorage.setItem("taskItem", JSON.stringify(allIncompleteTask));
}