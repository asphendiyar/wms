import styled, { keyframes } from "styled-components"

const AlertInLeft = keyframes`
  from {
	  transform: translateX(-100%);
	}
	to {
	  transform: translateX(0);
	}
`
export const AlertContainer = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 9999;
  &.bottom-left {
    bottom: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: ${AlertInLeft} 0.3s;
  }
`
export const AlertWrapper = styled.div`
  background: #fff;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 30px;
  align-items: flex-start;
  margin-bottom: 15px;
  border-radius: 3px 3px 3px 3px;
  box-shadow: 0 0 10px #999;
  color: #000;
  opacity: 0.9;
  background-position: 15px;
  background-repeat: no-repeat;
  &.bottom-left {
    bottom: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: ${AlertInLeft} 0.3s;
  }
  &:hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: pointer;
  }
  &.Alert {
    width: 365px;
    color: #fff;
    padding: 20px 15px;
  }
`
export const AlertCloserButton = styled.button`
  font-weight: 700;
  color: #fff;
  outline: none;
  border: none;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.8;
  line-height: 1;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;
`
export const AlertIcon = styled.div`
  margin-right: 15px;
  font-size: 30px;
`
export const AlertInfo = styled.div``
export const AlertTitle = styled.h5`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 300px;
  height: 18px;
`
export const AlertMessage = styled.p`
  margin: 0;
  text-align: left;
  margin-left: -1px;
`
