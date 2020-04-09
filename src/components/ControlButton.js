import React, { useRef } from 'react';
import styled from 'styled-components';

const ControlButton = styled.div`
    position: absolute;
    top: ${props => `${props.top}%` || 'unset'};
    left:  ${props => `${props.left}%` || 'unset'};
    width: 16px;
    height: 16px;
    border: 2px solid #111111;
    background: #ffffff;
    z-index: 1;

    transform: translate(-8px, -8px);

    &:hover, :active {
        cursor: pointer;
        background: yellow;
    }
`;

export default props => {
    const ref = useRef(null);
    const { containerRef, left, top, axis, setLeft, setTop } = props;

    const onXMove = () => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerLeft = containerRect.left;
        const containerWidth = containerRect.width;
        const mouseLeft = window.event.clientX;
        const percent = ((mouseLeft - containerLeft) / containerWidth * 100).toFixed(0);

        if (percent >= 0 && percent <= 100) {
            ref.current.style.left = `${percent}%`;
            setLeft(percent);
        }
    }

    const onYMove = () => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const mouseTop = window.event.clientY;
        const percent = ((mouseTop - containerTop) / containerHeight * 100).toFixed(0);

        if (percent >= 0 && percent <= 100) {
            ref.current.style.top = `${percent}%`;
            setTop(percent);
        }
    };

    const stopMove = () => {
        document.onmousemove = null;
    };

    const onMouseDown = () => {
        if (axis === 'x') {
            document.onmousemove = onXMove;
        } else if (axis === 'y') {
            document.onmousemove = onYMove;
        }
        document.onmouseup = stopMove;
    };

    return (
        <ControlButton
            ref={ref}
            top={top}
            left={left}
            onMouseDown={onMouseDown}
        />
    );
};