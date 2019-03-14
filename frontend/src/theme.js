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
    accentColor: '#EE9A02',
    backgroundColor: '#5E5E5E',
    textColor: '#4A4A4A',
    textColorOnBackground: '#FFF',
    DottedBackground: {
      dotColor: '#5E5E5E',
      backgroundColor: '#4A4A4A'
    },
    NavBar: {
      backgroundColor: '#FFF',
      textColor: '#4A4A4A'
    },
    NavigationMenu: {
      backgroundColor: '#5E5E5E',
      textColor: '#FFF',
      accentColor: '#EE9A02'
    },
    Button: {
      textColor: '#FFF',
      textColorDisabled: '#A9A9A9',
      backgroundColorDisabled: '#E9E9E9',
      backgroundColorGhost: '#5E5E5E'
    },
    ButtonBar: {
      backgroundColor: '#FFF',
      backgroundColorGhost: '#4A4A4A'
    },
    Modal: {
      backgroundColor: '#FFF',
      backdropColor: 'rgba(100, 100, 100, 0.9)'
    },
    ViewportSwitch: {
      colorSelected: '#EE9A02',
      colorDefault: '#E9E9E9'
    },
    FilterChip: {
      textColor: '#5E5E5E',
      textColorChecked: '#FFF',
      backgroundColor: '#E9E9E9',
      backgroundColorChecked: '#EE9A02'
    },
    Sidebar: {
      backgroundColor: '#FFF'
    },
    Select: {
      backgroundColor: '#FFF'
    },
    ButtonTile: {
      backgroundColor: '#E9E9E9'
    }
  },
  light: {
    accentColor: '#EE9A02',
    backgroundColor: '#FFF',
    textColor: '#5E5E5E',
    textColorOnBackground: '#5E5E5E',
    DottedBackground: {
      backgroundColor: '#FFF',
      dotColor: '#E9E9E9'
    },
    NavBar: {
      backgroundColor: '#E9E9E9',
      textColor: '#5E5E5E'
    },
    NavigationMenu: {
      backgroundColor: '#E9E9E9',
      textColor: '#5E5E5E',
      accentColor: '#EE9A02'
    },
    Button: {
      textColor: '#FFF',
      textColorDisabled: '#A9A9A9',
      backgroundColorDisabled: '#E9E9E9',
      backgroundColorGhost: '#5E5E5E'
    },
    ButtonBar: {
      backgroundColor: '#E9E9E9',
      backgroundColorGhost: '#4A4A4A'
    },
    Modal: {
      backgroundColor: '#FFF',
      backdropColor: 'rgba(100, 100, 100, 0.9)'
    },
    ViewportSwitch: {
      colorSelected: '#EE9A02',
      colorDefault: '#C8C8C8'
    },
    FilterChip: {
      textColor: '#5E5E5E',
      textColorChecked: '#4A4A4A',
      backgroundColor: '#E9E9E9',
      backgroundColorChecked: '#C8C8C8'
    },
    Sidebar: {
      backgroundColor: '#FFF'
    },
    Select: {
      backgroundColor: '#FFF'
    },
    ButtonTile: {
      backgroundColor: '#E9E9E9'
    }
  },
  purple: {
    accentColor: '#EE9A02',
    backgroundColor: '#32394C',
    textColor: '#5E5E5E',
    textColorOnBackground: '#FFF',
    DottedBackground: {
      dotColor: '#485578',
      backgroundColor: '#32394C',
    },
    NavBar: {
      backgroundColor: '#485578',
      textColor: '#FFFFFF',
    },
    NavigationMenu: {
      backgroundColor: '#485578',
      textColor: '#FFFFFF',
      accentColor: '#EE9A02'
    },
    Button: {
      textColor: '#FFF',
      textColorDisabled: '#A9A9A9',
      backgroundColorDisabled: '#E9E9E9',
      backgroundColorGhost: '#5E5E5E'
    },
    ButtonBar: {
      backgroundColor: 'rgba(74, 85, 117)',
      backgroundColorGhost: '#32394C'
    },
    Modal: {
      backgroundColor: '#FFF',
      backdropColor: 'rgba(74, 85, 117, 0.9)'
    },
    ViewportSwitch: {
      colorSelected: '#EE9A02',
      colorDefault: '#E9E9E9'
    },
    FilterChip: {
      textColor: '#5E5E5E',
      textColorChecked: '#4A4A4A',
      backgroundColor: '#E9E9E9',
      backgroundColorChecked: '#C8C8C8'
    },
    Sidebar: {
      backgroundColor: '#FFF'
    },
    Select: {
      backgroundColor: '#FFF'
    },
    ButtonTile: {
      backgroundColor: '#E9E9E9'
    }
  },
};
