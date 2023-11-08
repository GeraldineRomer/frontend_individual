import React, { Component } from 'react';
import './LateralMenu.scss';
import { Link, animateScroll as scroll } from "react-scroll";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: true
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 500) {
      this.setState({ isMenuVisible: true });
    } else {
      this.setState({ isMenuVisible: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.isMenuVisible && (
          <nav>
            <div className='LateralMenu' id='LateralMenu'>
              <ul id="items">
                <li>
                  <Link
                    activeClass="active"
                    to="Section1"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className='svg_icon' height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="Section2"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className='svg_icon' height="1em" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"/></svg>
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    to="Section3"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className='svg_icon' height="1em" viewBox="0 0 640 512"><path d="M36.8 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V384 224H320V384H128V224H64zm448 0V480c0 17.7 14.3 32 32 32s32-14.3 32-32V224H512z"/></svg>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

export const LateralMenu = () => {
  return (
    <div>
      <Menu /> 
    </div>
  )
}
