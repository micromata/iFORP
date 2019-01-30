export const dottedBackground = (
  backgroundColor = '#fff',
  dotColor = '#000',
  dotSpace = '22px',
  dotSize = '4px'
) => ({
  background: `linear-gradient(90deg, ${backgroundColor} calc(${dotSpace} - ${dotSize}), transparent 1%) center,
linear-gradient(${backgroundColor} calc(${dotSpace} - ${dotSize}), transparent 1%) center, ${dotColor}`,
  backgroundSize: `${dotSpace} ${dotSpace}`,
});

export default {
  dark: {
    backgroundColor: '#3D3D3D',
    textColor: '#5E5E5E',
    textColorLight: '#FFF',
    accentColor: '#F9BB1F',
    DottedBackground: {
      backgroundColor: '#3D3D3D',
      dotColor: '#5E5E5E',
    },
    NavBar: {
      backgroundColor: '#5E5E5E',
      textColor: '#FFF',
    },
    NavigationMenu: {
      backgroundColor: '#5E5E5E',
      textColor: '#FFF',
      accentColor: '#F9BB1F'
    },
    ButtonBar: {
      backgroundColor: 'rgba(100, 100, 100, 0.9)'
    }
  },
  light: {
    backgroundColor: '#FFF',
    accentColor: '#F9BB1F',
    DottedBackground: {
      backgroundColor: '',
      dotColor: '',
    },
    NavBar: {
      backgroundColor: '#E9E9E9',
      textColor: '#FFFFFF',
    },
    NavigationMenu: {
      backgroundColor: '#E9E9E9',
      textColor: '#FFFFFF',
      accentColor: '#F9BB1F',
    },
    ButtonBar: {
      backgroundColor: 'rgba(100, 100, 100, 0.9)'
    }
  },
  purple: {
    backgroundColor: '#32394C',
    accentColor: '#F9BB1F',
    DottedBackground: {
      backgroundColor: '',
      dotColor: '',
    },
    NavBar: {
      backgroundColor: '#485578',
      textColor: '#FFFFFF',
    },
    NavigationMenu: {
      backgroundColor: '#485578',
      textColor: '#FFFFFF',
      accentColor: '#F9BB1F',
    },
    ButtonBar: {
      backgroundColor: 'rgba(100, 100, 100, 0.9)'
    }
  },
};
