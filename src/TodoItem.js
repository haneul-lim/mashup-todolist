/**
 * 각 할 일에 대한 정보를 렌더링해주는 컴포넌트
 * : 좌측 원을 누르면 할 일의 완료여부 toggle 가능, 
 *   완료되면 좌측에 체크가 나타나고 텍스트의 색상이 연해짐,
 *   마우스를 올리면 휴지통 아이콘이 나타나고 누르면 항목 삭제
 * 
 * dispatch를 사용하여 토글기능과 삭제기능 구현 
 */
import React from "react";
import styled, {css} from "styled-components";
import {MdDone, MdDelete} from 'react-icons/md';
import { useTodoDispatch } from "./TodoContext";

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {   /* Component Selector 기능으로 TodoItemBlock 위에 컼서가 있을 때 Remove 컴포넌트를 보여주라는 의미 */
        ${Remove} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${props => 
        props.done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `
    }
`;

const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props =>
        props.done &&
        css`
            color: #ced4da;
        `
    }
`;

function TodoItem({id, done, text}){
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({type: 'TOGGLE', id});
    const onRemove = () => dispatch({type: 'REMOVE', id});

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone />}
            </CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem);    // React.memo를 사용하면 다른 항목이 업데이트될 때 불필요한 리렌더링을 방지하게 되어 성능 최적화 가능