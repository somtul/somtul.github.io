
// 1. 기본 HTML 영역 불러오기

const todoForm = document.querySelector("#todo-form");
//todo 입력창을 지정한다.
const todoInput = todoForm.querySelector("#todo-form input");
//todoForm이 지정되어 있으므로, todoForm에 쿼리셀렉터를 돌리자
const todoList = document.querySelector("#todo-list");
//todo ul을 지정한다.

// 2. todo 목록 만들기

let todos = [];
//local storage에 저장하기 위해 todo를 array로 지정한다. 이때 수정이 가능하도록 let을 사용
const TODOS_KEY = "todos"
//todos 라는 키값이 반복 사용되므로 변수로 지정해준다.

// 3. todo를 로컬 스토리지에 저장하는 함수 만들기 

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
    //만들어진 todos array를 string 형태로 만들어 로컬 스토리지에 저장하는 함수를 만든다.
}

// 4. todo를 로컬 스토리지에서 지우는 함수 만들기

function deleteTodo(event){
    const li = event.target.parentElement
    //클릭한 버튼 (target)의 path를 검색해 parentElement를 지정한다.
    li.remove();
    // 방금 지정한 parentElement를 삭제한다.
    todos = todos.filter((todos) => todos.id !== parseInt(li.id))
    // todos arrays에 방금 지정한 parentElement의 id와 같지 않은 항목만 나오게 필터링한다. 그리고 이 필터를 다시 todos에 넣는다.
    saveTodos()
    // 필터링한 todos를 로컬 스토리지에 저장한다.
}

// 5. todo 목록을 화면에 표시하는 함수 만들기

function paintTodo(newTodo){
    //(1) 요소 만들기
    const list = document.createElement("li");
    //HTML 파일에 <li> 삽입
    list.id = newTodo.id
    // list의 id에 newTodo의 id 대입
    const span = document.createElement("span");
    //HTML 파일에 <span> 삽입
    span.innerText = newTodo.text;
    //span 내부에 newTodo의 text 삽입
    const button = document.createElement("button");
    //HTML 내부에 <button> 삽입
    button.innerText = "❌";
    //button의 텍스트를 X로 바꿈
    
    // (2) 함수 넣기
    button.addEventListener("click", deleteTodo)
    //button click 시 deleteTodo 함수 실행
    
    // (3) 요소들 정렬하기
    list.appendChild(span)
    // list 안에 <span> 넣어주기
    list.appendChild(button)
    // list 안에 <button> 넣어주기
    todoList.appendChild(list)
    // todoList (ul) 안에 list 넣어주기 
}

// 6. todo를 제출하는 함수 만들기 

function handleToDoSubmit(event){
    event.preventDefault();
    // submit시 새로고침 방지 
    const newTodo = todoInput.value;
    // todoInput 칸의 값을 newTodo로 지정해주기
    todoInput.value = "";
    // 함수 실행 시, todoInput 칸 비우기
    const newTodoObj = {
        text : newTodo,
        id: Date.now()
    }
    // newTodo를 텍스트로 갖고, 랜덤 id를 가진 newTodoObj 라는 오브젝트 만들기
    todos.push(newTodoObj);
    // todos array에 newTodoObj 밀어넣기
    paintTodo(newTodoObj);
    // newTodoObj를 넣고 paintTodo() 실행 -> 이걸 위해 list.id [44줄] / span.innertext [48줄] 따로 지정함 
    saveTodos();
    // todos array를 local strage에 저장하는 함수 실행
}

todoForm.addEventListener("submit", handleToDoSubmit) 
// submit 하면 handelToDoSubmit 함수 실행

// 7. 저장된 todos 불러오기

const savedTodos = localStorage.getItem(TODOS_KEY);
// local storage에 저장된 todos array를 savedTodos 라는 이름으로 지정

if(savedTodos !== null){
    //!==란 값과 유형까지 포함해서 savedTodos가 null 이 아니어야 true란 뜻
    const parsedTodos = JSON.parse(savedTodos)
    // savedTodos를 다시 JS 코드 형태로 변환, parsedTodos 라는 이름으로 지정
    todos = parsedTodos;
    // JS 코드 형태로 변환된 savedTodos를 todos array에 대입
    parsedTodos.forEach(paintTodo);
    //array의 각 item에 대해 paintTodo을 시행 -> 저장된 todo를 다시 화면에 표시 
}
