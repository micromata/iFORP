export default () => ({
  Card: {
    boxShadow: '0 3px 6px 1px rgba(0,0,0,0.2)',
    padding: '29px 48px',
    display: 'inline-block',
    background: '#fff',
    position: props => props.position || 'relative',
    width: props => props.width || 'auto',
    height: props => props.height || 'auto',
    top: props => props.top || 'auto',
    left: props => props.left || 'auto',
    right: props => props.right || 'auto',
    bottom: props => props.bottom || 'auto',
  },
});
