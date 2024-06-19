window.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem('todo')===null){
        localStorage.setItem('todo',JSON.stringify([]));
    }
        var todo=JSON.parse(localStorage.getItem('todo'));
        const newtask = document.getElementsByName('note')[0];
        const add = document.getElementById('addbtn');
        const tasklist = document.getElementById("list");
        const completed = document.getElementById('completed');
        const clear = document.getElementById('clear');
        const alert=document.getElementById("alert");
        clear.addEventListener("click", clearcompleted);
            todo.forEach(element => {
                addtask(element);
            });
            showalert("Tasks loaded successfully")
        add.addEventListener("click", () => {
            if (newtask.value.length == 0) {
                showalert("Task cannot be empty");                
            }
            else {
                addtask('*' + newtask.value);
                newtask.value = "";
                savetodo();
            }
        });
        function markasread(text) {
            console.log(localStorage.getItem('todo'));
            console.log(text);
            todo[todo.indexOf(text)]=text.substr(1);
            console.log(todo);
            savetodo();
        }
        function addtask(text) {
            if (text[0] == '*') {
                let ele = document.createElement("li");
                ele.classList.add("item", "incomplete");
                ele.innerHTML = `<img src="task2.svg" id="ind" title="Click to mark it as read..">${text.substr(1)}<img src="./remove.svg" class="icon" id="delete">`;
                ele.querySelector("#ind").addEventListener("click", addlistener, false);
                ele.querySelector('#delete').addEventListener("click", deletenote, true);
                todo.push(text);
                tasklist.append(ele);
                showalert("Task added successfully");
            }
            else {
                let ele = document.createElement("li");
                ele.innerHTML = `<img src="task.svg" id="ind" title="Click to mark it as read..">${text}`;
                ele.classList.add("item", "completed");
                completed.append(ele);
            }
        }
        function clearcompleted(event) {
            event.stopPropagation();
            let node = completed.querySelectorAll('li');
            node.forEach(element => {
                completed.removeChild(element);
            });
            todo = todo.filter((task) => {
                return task[0] == '*';
            })
            savetodo();
            showalert("Completed tasks dumped out...");
        }
        function addlistener(event) {
            event.preventDefault();
            ele = event.target.parentNode;
            event.target.removeEventListener("click", addlistener);
            ele.removeChild(ele.querySelector('#delete'));
            ele.classList.remove("incomplete");
            ele.classList.add("completed");
            ele.querySelector("#ind").setAttribute("src", "./task.svg");
            tasklist.removeChild(ele);
            markasread("*" + ele.innerText);
            completed.append(ele);
            showalert("Keep going......");
        }
        function deletenote(event) {
            event.stopPropagation();
            node = event.target.parentNode;
            let deleted = node.innerText;
            todo.splice(todo.indexOf("*"+deleted), 1);
            savetodo();
            console.log(todo);
            tasklist.removeChild(node);
            showalert("Task deleted successfully");
        }
        function savetodo() {
            localStorage.setItem('todo', JSON.stringify(todo));
        }
        function showalert(msg){
            alert.innerText=msg;
                setTimeout(()=>{
                    alert.innerText=""; 
                },1000);
        }
    });
