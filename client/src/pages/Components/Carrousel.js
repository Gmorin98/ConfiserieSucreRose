// Necessary Import
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components and Other Import

const Carrousel = ({ children }) => {
  const [position, setPosition] = useState(0);

  const changePosition = (distance) => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition + distance;
      if (newPosition < 0) {
        return children.length - 1;
      }
      return newPosition % children.length;
    });
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      changePosition(1);
    }, 10000);

    return () => clearInterval(interval);
  }, [position]);

  const prevPosition = (position - 1 + children.length) % children.length;
  const nextPosition = (position + 1) % children.length;

  return (
    <Wrapper>
      <CarouselContainer>
        <CarouselItem className="left" src={children[prevPosition].img} loading="lazy"/>
        <button onClick={() => {changePosition(-1)}}>&lt;</button>
        <CarouselItem className="center" src={children[position].img} loading="lazy"/>
        <button onClick={() => {changePosition(1)}}>&gt;</button>
        <CarouselItem className="right" src={children[nextPosition].img} loading="lazy"/>
      </CarouselContainer>
      {children[position].info && <p>{children[position].info}</p> }
    </Wrapper>
  );
};

export default Carrousel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2em 0em;
  height: fit-content;
  width: 100%;

  img {
    border-radius: 35px;
    border: solid 5px var(--primary-color);
  }

  
  p {
    font-size: 0.75em;
    background-color: var(--background-color);
    border-radius: 35px;
    padding: 1em;
    text-align: center;
    max-width: 1000px;
    min-width: 350px;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: fit-content;
  justify-content: center;
  margin-bottom: 2em;
  align-items: center;
  overflow-x: hidden;
  height: 350px;

  button {
    color: var(--primary-color);
    border: none;
    width: fit-content;
    margin: 0em 0.5em;
    font-size: 5em;
    width: fit-content;
    z-index: 5;
    background-color: transparent;
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 0;
    button {
      position: absolute;
      font-size: 5rem;
    }
    button:first-of-type {
      left: -2.5vw;
    }
    button:last-of-type {
      right: -2.5vw;
    }
  }
`;

const CarouselItem = styled.img`
  min-height: 200px;
  max-height: 350px;

  &.left {
    transform: translateX(-50%) scale(0.8); /* Shrink and translate */
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.8); /* Center vertically */
    filter: blur(2px);
  }

  &.center {
    transform: translateX(0) scale(1); /* Full size */
    position: relative;
  }

  &.right {
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translate(50%, -50%) scale(0.8); /* Center vertically */
    filter: blur(2px);
  }

  @media screen and (max-width: 900px) {

    &.left {
      display: none;
    }

    &.right {
      display: none;
    }
  }
`;
