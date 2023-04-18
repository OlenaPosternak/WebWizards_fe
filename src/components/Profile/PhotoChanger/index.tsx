import { Stack, Typography } from '@mui/material';
import DoctorPhoto from '@assets/doctorPic.png';
import EditIcon from '@assets/edit.svg';
import React from 'react';
import { Photo, PhotoChangerWrapper, EditIconContainer } from './styles';

const PhotoChanger = () => {
  return (
    <PhotoChangerWrapper>
      <p>Edit Profile</p>
      <Photo>
        <img src={DoctorPhoto} alt="Photo" width="160px" />
        <EditIconContainer>
          <img src={EditIcon} />
        </EditIconContainer>
      </Photo>
    </PhotoChangerWrapper>
  );
};

export default PhotoChanger;
