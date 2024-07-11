import React, {useReducer, createContext, useContext, useRef} from "react"; // useContext를 직접 사용하는 대신, useContext를 사용하는 커스텀Hook을 만들어 내보내기

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    }
];

function todoReducer(state, action) {
    switch(action.type)  {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo => 
                todo.id === action.id ? {...todo, done: !todo.done} : todo   
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type : ${action.type}`);
    }
}

// Context를 통해 다른 컴포넌트에서 바로 사용 가능하도록
// 두개를 따로 만든 이유는 dispatch만 필요한 컴포넌트에서 불필요한 렌더링을 방지하기 위함
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();

const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        // Context에서 사용할 값을 지정할 때 Provider 컴포넌트를 렌더링하고 value를 설정하면 됨.
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if(!context) {  // 만약 TodoProvider로 감싸져 있지 않다면 에러 발생
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

/**
 * 커스텀Hook을 만들어 사용하면
 * state = useContext(TodoStateContext);가 아니라
 * const state = useTodoState(); 형태로 사용 할 수 있게 됨
 * 
 * 커스텀 Hook을 사용하려면 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링되어 있어야 함
 * (예: App 컴포넌트에서 모든 내용을 TodoProvider로 감싸기)
 */