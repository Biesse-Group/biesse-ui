import { AnimatePresence, motion, wrap } from "framer-motion";
import { FC, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { Text, Title } from "..";
import { mqUntil } from "../../styles";
import CarouselControls from "./CarouselControls";
import { TextContainer } from "./TextContainer";
import { titleVariants } from "./variants";

export interface HeroCarouselSlide {
  renderImage: () => JSX.Element;
  title: string;
  description: string | JSX.Element;
}

export type HeroCarouselProps = {
  /**
   * List of displayed slides
   */
  slides: HeroCarouselSlide[];
  /**
   * Change slide automatically every provided seconds number
   */
  autoSlide?: number;
};

const CarouselContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  border-bottom-left-radius: ${(props) => props.theme.card.borderRadius};
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mqUntil(
    "md",
    css`
      height: 700px;
    `
  )}
`;

const StyledSlide = styled(motion.div)`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Mask = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const HeroCarousel: FC<HeroCarouselProps> = ({ slides, autoSlide }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  /**
   * Handle slide change
   */
  const handleSlide = useCallback(
    (direction: "prev" | "next") => {
      const slideAmount = direction === "prev" ? -1 : 1;
      const slideIndex = wrap(0, slides.length, activeSlide + slideAmount);
      setActiveSlide(slideIndex);
    },
    [activeSlide, slides.length]
  );

  // Auto slide effect
  useEffect(() => {
    let autoSlideInterval: NodeJS.Timer;

    if (autoSlide) {
      autoSlideInterval = setInterval(() => {
        handleSlide("next");
      }, autoSlide * 1000);
    }

    return () => {
      clearInterval(autoSlideInterval);
    };
  }, [autoSlide, handleSlide]);

  const { title, description, renderImage } = slides[activeSlide];

  return (
    <CarouselContainer>
      <ImageContainer>
        <Mask />
        <AnimatePresence initial={false}>
          <StyledSlide
            key={`slide-${activeSlide}`}
            initial={{ opacity: 0 }}
            animate={{ zIndex: 1, opacity: 1 }}
            exit={{ zIndex: 0, opacity: 0 }}
            transition={{ opacity: { duration: 1 } }}
          >
            {renderImage()}
          </StyledSlide>
        </AnimatePresence>
      </ImageContainer>

      <TextContainer>
        <motion.div
          key={`title-${activeSlide}`}
          variants={titleVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <Title variant="H2" color="light">
            {title}
          </Title>
        </motion.div>
        <motion.div
          key={`text-${activeSlide}`}
          variants={titleVariants}
          custom={true}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {typeof description === "string" ? (
            <Text color="light" size="lg">
              {description}
            </Text>
          ) : (
            description
          )}
        </motion.div>
        <CarouselControls onPrev={() => handleSlide("prev")} onNext={() => handleSlide("next")} />
      </TextContainer>
    </CarouselContainer>
  );
};