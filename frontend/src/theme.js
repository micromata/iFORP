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
    textColorOnBackground: '#FFF',
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
    },
    Select: {
      default: {
        textColor: '#000',
        backgroundColor: '#5A5A5A'
      },
      notDefault: {
        textColor: '#F9BB1F',
        backgroundColor: '#5A5A5A',
        borderColor: '#F9BB1F'
      }
    }
  },
  light: {
    backgroundColor: '#FFF',
    accentColor: '#F9BB1F',
    textColor: '#5E5E5E',
    textColorOnBackground: '#5E5E5E',
    DottedBackground: {
      backgroundColor: '#FFF',
      dotColor: '#E9E9E9',
    },
    NavBar: {
      backgroundColor: '#E9E9E9',
      textColor: '#5E5E5E',
    },
    NavigationMenu: {
      backgroundColor: '#E9E9E9',
      textColor: '#5E5E5E',
      accentColor: '#F9BB1F',
    },
    ButtonBar: {
      backgroundColor: 'rgba(100, 100, 100, 0.9)'
    },
    Select: {
      default: {
        textColor: '#5E5E5E',
        backgroundColor: '#E9E9E9'
      },
      notDefault: {
        textColor: '#868686',
        backgroundColor: '#E9E9E9',
        borderColor: '#868686'
      }
    }
  },
  purple: {
    backgroundColor: '#32394C',
    accentColor: '#F9BB1F',
    textColor: '#5E5E5E',
    textColorOnBackground: '#FFF',
    DottedBackground: {
      backgroundColor: '#32394C',
      dotColor: '#485578',
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
      backgroundColor: 'rgba(74, 85, 117, 0.9)'
    },
    Select: {
      default: {
        textColor: '#000',
        backgroundColor: '#5A5A5A'
      },
      notDefault: {
        textColor: '#F9BB1F',
        backgroundColor: '#5A5A5A',
        borderColor: '#F9BB1F'
      }
    }
  },
};
