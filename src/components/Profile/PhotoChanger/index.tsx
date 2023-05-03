import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import editIcon from 'assets/edit.svg';
import defaultDoctorPhoto from '@assets/mockDoctorPhoto.png';
import { authApi } from 'services/AuthService';
import { useMount } from '../AvatarEditor/hooksAvatarEditor';
import { Photo, PhotoChangerWrapper, EditIconContainer } from './styles';
import AvatarChanger from '../AvatarEditor';
import { getDoctorAvatar } from '../api/getPhoto';
import axios from '../api/axios';
import AvatarLoader from './Skeleton';

const PhotoChanger = () => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const { mounted } = useMount({ opened });
  const { data: doctor } = authApi.useGetMeQuery({});
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');
  const [avatarLoading, setAvatarLoading] = React.useState<boolean>(false);

  const avatar = async () => {
    setAvatarLoading(true);
    const avatarStatic = await getDoctorAvatar(1);
    setAvatarUrl(avatarStatic);
    setAvatarLoading(false);
  };

  React.useEffect(() => {
    avatar();
  }, []);

  const { t } = useTranslation();

  return (
    <PhotoChangerWrapper>
      <p> {t('Profile.editProfile') ?? ''}</p>
      {!doctor?.photoUrl ? (
        <Photo>
          <img src={defaultDoctorPhoto} alt="Photo" width="160px" />
        </Photo>
      ) : null}

      <Photo>
        {avatarLoading && doctor?.photoUrl ? (
          <AvatarLoader />
        ) : (
          <img
            src={import.meta.env.VITE_REACT_APP_BASE_URL_SERVER + avatarUrl}
            alt="Photo"
            width="160px"
          />
        )}
        <EditIconContainer onClick={() => setOpened(true)}>
          <img src={editIcon} />
        </EditIconContainer>
      </Photo>
      {mounted
        ? createPortal(
            <AvatarChanger
              opened={opened}
              onClose={setOpened}
              setAvatarUrl={setAvatarUrl}
              avatar={avatar}
            />,
            document.body
          )
        : null}
    </PhotoChangerWrapper>
  );
};

export default PhotoChanger;
