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
    profiYellow: '#F9BB1F',
    accentColor: '#F9BB1F',
    DottedBackground: {
      backgroundColor: '#3D3D3D',
      dotColor: '#5E5E5E',
    },
    NavBar: {
      backgroundColor: '#5E5E5E',
      textColor: '#FFFFFF',
    },
  },
  light: {
    backgroundColor: '#FFFFFF',
    accentColor: '#F9BB1F',
    DottedBackground: {
      backgroundColor: '',
      dotColor: '',
    },
    NavBar: {
      backgroundColor: '#E9E9E9',
      textColor: '#FFFFFF',
    },
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
  },
};
