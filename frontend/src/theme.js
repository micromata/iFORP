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

const themeColors = {
  dark: {
    accentColor: '#EE9A02',
    textColorPrimary: '#4A4A4A',
    textColorSecondary: '#FFF',
    textColorTertiary: '#A9A9A9',
    bgColorPrimary: '#5E5E5E',
    bgColorSecondary: '#FFF',
    bgColorTertiary: '#E9E9E9',
    bgColorQuartary: '#C8C8C8'
  },
  light: {
    accentColor: '#EE9A02',
  },
  purple: {
    accentColor: '#EE9A02',
  },
}

export default {
  dark: {
    ...themeColors.dark,
    backgroundColor: themeColors.dark.bgColorPrimary,
    textColor: themeColors.dark.textColorPrimary,
    textColorOnBackground: themeColors.dark.textColorSecondary,
    DottedBackground: {
      dotColor: themeColors.dark.bgColorPrimary,
      backgroundColor: themeColors.dark.textColorPrimary
    },
    NavBar: {
      backgroundColor: themeColors.dark.bgColorSecondary,
      textColor: themeColors.dark.textColorPrimary
    },
    NavigationMenu: {
      backgroundColor: themeColors.dark.bgColorPrimary,
      textColor: themeColors.dark.textColorSecondary,
      accentColor: themeColors.dark.accentColor
    },
    ButtonBar: {
      backgroundColor: themeColors.dark.bgColorSecondary,
      backgroundColorGhost: themeColors.dark.textColorPrimary
    },
    Modal: {
      backgroundColor: 'rgba(100, 100, 100, 0.9)'
    },
    ViewportSwitch: {
      colorSelected: themeColors.dark.accentColor,
      colorDefault: themeColors.dark.bgColorTertiary
    },
    FilterChip: {
      textColor: themeColors.dark.bgColorPrimary,
      textColorChecked: themeColors.dark.textColorPrimary,
      backgroundColor: themeColors.dark.bgColorTertiary,
      backgroundColorChecked: themeColors.dark.bgColorQuartary
    }
  },
  light: {
    backgroundColor: '#FFF',
    accentColor: themeColors.light.accentColor,
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
      accentColor: themeColors.light.accentColor,
    },
    ButtonBar: {
      backgroundColor: 'rgba(100, 100, 100, 0.9)',
      backgroundColorGhost: '#4E4E4E'
    },
    Modal: {
      backgroundColor: 'rgba(100, 100, 100, 0.9)'
    },
    ViewportSwitch: {
      colorSelected: themeColors.light.accentColor,
      colorDefault: '#E9E9E9'
    },
    FilterChip: {
      textColor: '#5E5E5E',
      textColorChecked: '#4A4A4A',
      backgroundColor: '#E9E9e9',
      backgroundColorChecked: '#C8C8C8'
    }
  },
  purple: {
    backgroundColor: '#32394C',
    accentColor: themeColors.purple.accentColor,
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
      accentColor: themeColors.purple.accentColor,
    },
    ButtonBar: {
      backgroundColor: 'rgba(74, 85, 117, 0.9)',
      backgroundColorGhost: '#32394C'
    },
    Modal: {
      backgroundColor: 'rgba(74, 85, 117, 0.9)'
    },
    ViewportSwitch: {
      colorSelected: themeColors.purple.accentColor,
      colorDefault: '#E9E9E9'
    },
    FilterChip: {
      textColor: '#5E5E5E',
      textColorChecked: '#4A4A4A',
      backgroundColor: '#E9E9e9',
      backgroundColorChecked: '#C8C8C8'
    }
  },
};
