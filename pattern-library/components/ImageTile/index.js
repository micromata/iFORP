import React from 'react';
import injectSheet from 'react-jss';
import styles from './styles.js';
import Text from '../Text/index';
import Image from '../Image/index';
import IconButton from '../IconButton/index';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ImageTile = ({
  classes,
  title,
  imageSrc,
  imageAlt,
  onClick,
  selected
}) => (
  <div className={classes.tile} onClick={onClick}>
    <Text marginBottom={'5px'} marginLeft={'8px'}>
      {title}
    </Text>
    <div className={classes.tileImageArea}>
      <Image
        width="185px"
        height="132px"
        objectFit="cover"
        blur={selected}
        src={imageSrc}
        alt={imageAlt}
      />
      {selected && (
        <div className={classes.tileOverlay}>
          <IconButton icon={faEdit} />
          <IconButton icon={faTrash} />
        </div>
      )}
    </div>
  </div>
);

export default injectSheet(styles)(ImageTile);
