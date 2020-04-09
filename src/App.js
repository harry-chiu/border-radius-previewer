import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import ControlButton from './components/ControlButton';

const Container = styled.div`
    position: relative;
    width: 500px;
    height: 500px;
    border: 2px dashed #cccccc;
`;

const Title = styled.h1`
    margin: 16px;
`;

const Shape = styled.div`
    background: linear-gradient(45deg, #1976D2, #4FC3F7, #00BCD4);
    width: 100%;
    height: 100%;
    border-radius: ${props => props.borderRadius || 'unset'};
`;

const CodePreviewer = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    margin: 16px;
    border: 1px solid #cccccc;
`;

const Code = styled.p`
    display: inline-flex;
    margin: 0;
`;

const Copy = styled.div`
    display: inline-flex;
    padding: 8px 24px;
    color: #ffffff;
    background: #2196F3;
    margin-left: 8px;
    cursor: pointer;

    &:hover {
        background: #42A5F5;
    }
`;

const HiddenInput = styled.input`
    position: fixed;
    opacity: 0;
`;

const App = () => {
    const containerRef = useRef(null);
    const [leftTopX, setLeftTopX] = useState(10);
    const [leftTopY, setLeftTopY] = useState(10);
    const [rightTopX, setRightTopX] = useState(90);
    const [rightTopY, setRightTopY] = useState(10);
    const [rightBottomX, setRightBottomX] = useState(90);
    const [rightBottomY, setRightBottomY] = useState(90);
    const [leftBottomX, setLeftBottomX] = useState(10);
    const [leftBottomY, setLeftBottomY] = useState(90);

    const horizentalRadius = `${leftTopX}% ${100 - rightTopX}% ${100 - rightBottomX}% ${leftBottomX}%`;
    const verticalRadius = `${leftTopY}% ${rightTopY}% ${100 - rightBottomY}% ${100 - leftBottomY}%`;
    const borderRadius = `${horizentalRadius} / ${verticalRadius}`;

    const copy = () => {
        const copyText = document.getElementById('border-radius');
        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand('copy');
        alert(`Successfully copy the css: \r\n${copyText.value}`);
    };

    return (
        <>
            <Title>Border Radius Previewer</Title>
            <Container ref={containerRef}>
                <Shape borderRadius={borderRadius} />
                <ControlButton
                    axis="x"
                    left={leftTopX}
                    top={0}
                    setLeft={setLeftTopX}
                    containerRef={containerRef}
                />
                <ControlButton
                    axis="y"
                    left={0}
                    top={leftTopY}
                    setTop={setLeftTopY}
                    containerRef={containerRef}
                />
                <ControlButton
                    axis="x"
                    left={rightTopX}
                    top={0}
                    setLeft={setRightTopX}
                    containerRef={containerRef}
                />
                <ControlButton
                    axis="y"
                    left={100}
                    top={rightTopY}
                    setTop={setRightTopY}
                    containerRef={containerRef}
                />
                <ControlButton
                    axis="x"
                    left={rightBottomX}
                    top={100}
                    setLeft={setRightBottomX}
                    containerRef={containerRef}
                />
                <ControlButton
                    axis="y"
                    left={100}
                    top={rightBottomY}
                    setTop={setRightBottomY}
                    containerRef={containerRef}
                />
                <ControlButton
                    axis="x"
                    left={leftBottomX}
                    top={100}
                    setLeft={setLeftBottomX}
                    containerRef={containerRef}
                />
                <ControlButton
                    axis="y"
                    left={0}
                    top={leftBottomY}
                    setTop={setLeftBottomY}
                    containerRef={containerRef}
                />
            </Container>
            <CodePreviewer>
                <HiddenInput id="border-radius" type="text" value={`border-radius: ${borderRadius};`} onChange={() => { }} />
                <Code>border-radius: {borderRadius};</Code>
                <Copy onClick={copy}>Copy</Copy>
            </CodePreviewer>
        </>
    );
};

export default App;