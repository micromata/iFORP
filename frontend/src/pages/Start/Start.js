import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import ElementGrid from '../../components/ElementGrid/ElementGrid';
import ImageLink from '../../components/ImageLink/ImageLink';
import Bild from '../../assets/img/login.png'

class Start extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar title="iFORP" />
        <ElementGrid>
          <ImageLink src={Bild} alt="BLUB" height="200px" blur title="blub" />
          <ImageLink src={Bild} alt="BLUB" height="200px" blur subtitle="blub" />
        </ElementGrid>
      </React.Fragment>
    );
  }
}

export default Start;
