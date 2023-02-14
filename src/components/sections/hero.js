import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .bg-text-container {
    font-family: montserrat;
    overflow-x: hidden;
    display: inline-block;
    top: 100px;
    width: 100%;
    height: 100%;
    align-items: center;
    opacity: 0.7;
       
    line-height: 1.7;
    
    transform: skewY(-5deg);
    transform: translateX(-50%);
    left: 50%;
    position: absolute;
    z-index: -1;
  }


  @keyframes text-scrolling {
    0% { transform: translate3d(-100%, 0, 0); }
    100% { transform: translate3d(0%, 0, 0); }
  }

  .animate-text {
    animation: text-scrolling 20s linear infinite;
    will-change: transform;
    display: block;
    position: relative;
    white-space: nowrap;
  }

        .animate-text.left{
            animation: text-scrolling 20s linear infinite;
            will-change: transform;
            display: block;
            position: relative;
            white-space: nowrap;
            animation-direction: reverse;
            
            
            }

        span {
        font-size: 280px;
        color: transparent;
        -webkit-text-stroke: 2px #30442a;
        text-transform: uppercase;
        display: inline-block;
        line-height: 0.75;
        min-width: auto;
        font-weight: 800;
        }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Arya Bagde.</h2>;
  const three = <h3 className="big-heading">I build things with humour.</h3>;
  const four = (
    <>
      <p>
        I’m a software engineer specializing in building (and occasionally designing) exceptional
        digital experiences. Currently, I’m focused on Machine Learning and Software development.
        {/* <a href="https://upstatement.com/" target="_blank" rel="noreferrer">
          Upstatement
        </a> */}
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://medium.com/@aryabagde"
      target="_blank"
      rel="noreferrer">
      Check out my articles!
    </a>
  );
  const six =(
    <div class="bg-text-container">
      <div class="animate-text">
        <span>Node React NPM&nbsp;</span>
        <span>Vue Next Vite&nbsp;</span>
      </div>
      <div class="animate-text left">
        <span>Gatsby Anime Three&nbsp;</span>
        <span>Pixi Flask Django&nbsp;</span>
      </div>
      <div class="animate-text">
        <span>Numpy OpenCV GraphQL&nbsp;</span>
        <span>Express SQL MongoDB&nbsp;</span>
      </div>
    </div>
  )

  const items = [six, one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
