import React from 'react';
import injectSheet, { ThemeProvider } from 'react-jss';

import theme from './theme';

export class ThemeProviderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false
    };
  }

  toggleTheme = () => {
    this.setState(previousState => ({
      darkMode: !previousState.darkMode
    }));
  };

  render() {
    return (
      <ThemeProvider theme={this.props.darkMode ? theme.dark : theme.light}>
        <OuterDecorator
          storyFn={this.props.storyFn}
          isDarkMode={this.props.darkMode}
          toggleTheme={this.toggleTheme}
        />
      </ThemeProvider>
    );
  }
}

export const OuterDecorator = injectSheet(theme => ({
  viewport: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  contentContainer: {
    fontFamily: 'Verdana',
    background: theme.primaryBg,
    backgroundImage: `radial-gradient(${
      theme.backgroundDots
    } 10%, transparent 0%)`,
    backgroundSize: '30px 30px',
    padding: '25px 25px',
    margin: '10px',
    boxShadow: '2px 2px 5px grey'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap'
  }}))(({ classes, isDarkMode, storyFn }) => {
  return (
    <div id="viewport" className={classes.viewport}>
      <div className={classes.contentContainer}>
        <div className={classes.content}>{storyFn()}</div>
      </div>
    </div>
  );
});

export default ThemeProviderContainer;
