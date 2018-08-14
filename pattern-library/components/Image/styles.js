export default {
  image: {
    position: 'relative',
    height: props => props.height || '',
    width: props => props.width || '',
    objectFit: props => props.objectFit || '',
    background: '#D9D9D9',
    border: '1px solid',
    borderColor: props => props.borderColor || '#D9D9D9',
    borderRadius: props => props.borderRadius || '8px',
    filter: props => (props.blur ? 'blur(1px)' : '')
  }
};
