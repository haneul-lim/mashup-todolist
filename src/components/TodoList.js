/**
 * 할 일에 대한 정보가 들어있는 todos 배열을 내장함수 map을 사용하여
 * 여러개의 Todoitem 컴포넌트를 렌더링하는 컴포넌트
 * 
 * state를 조회하고 렌더링해주어야 함
 */
import React from "react";
import styled from "styled-components";
import TodoItem from "../TodoItem";
import { useTodoState } from "../TodoContext";

const TodoListBlock = styled.div`
    flex: 1;    /* 자신이 차지할 수 있는 영역을 꽉 채우도록 하기 위함 */
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
    /* background: gray; <- flex: 1 적용이 잘되었나 확인을 위한 색지정*/
`;

function TodoList() {
    const todos = useTodoState();

    return (
        <TodoListBlock>
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />
            ))}
        </TodoListBlock>
    );
}

export default TodoList;