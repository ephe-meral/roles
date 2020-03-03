import React, { useEffect, useState } from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components/macro';
import { Button, Carousel, CarouselItem, ListItem } from 'react-onsenui';

const DeletableListItem = ({ children, className, onClick, onDelete, modifier }) => {
  const [carousel, setCarousel] = useState();

  useEffect(() => carousel && carousel.addEventListener('prechange', e => e.stopPropagation()), [
    carousel
  ]);

  return (
    <ListItem css="padding: 0" modifier={modifier} tabable>
      <div className="center" css="padding: 0">
        <Carousel
          ref={c => setCarousel(findDOMNode(c))}
          css="width: 100%; height: 100%;"
          index={0}
          autoScroll
          autoScrollRatio={0.2}
          swipeable
          overscrollable
        >
          <CarouselItem
            css="padding: 0 0.5em; display: flex; align-items: center; justify-content: space-between;"
            className={className}
            onClick={onClick}
          >
            {children}
          </CarouselItem>
          <CarouselItem css="background-color: red; display: flex; align-items: center; justify-content: flex-end;">
            <Button css="color: white" modifier="quiet" onClick={onDelete}>
              Delete
            </Button>
          </CarouselItem>
        </Carousel>
      </div>
    </ListItem>
  );
};

export { DeletableListItem };
