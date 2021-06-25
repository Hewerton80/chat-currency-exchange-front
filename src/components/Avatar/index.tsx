import { ReactNode } from 'react';

import * as Styled from './styles';

interface AvatarProps {
  src: string;
}

function Avatar({ src }: AvatarProps) {
  return (
    <Styled.Container>
      <div>
        <img src={src} alt='avatar' />
      </div>
    </Styled.Container>
  );
};

export default Avatar;
