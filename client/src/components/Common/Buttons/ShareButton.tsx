import { ButtonPost } from './ButtonPost';
import ShareIcon from '@mui/icons-material/Share';
import { pink } from '@mui/material/colors';

export const ShareButton = ({ isActive = false }) => {
  const likeHandler = () => {
    console.log('Liked');
  };

  return (
    <ButtonPost
      sx={{
        mx: 1,
        px: 1,
        color: isActive ? pink[400] : '#b0b3b8',
        '&:hover': {
          color: pink[400],
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
      }}
      onClick={likeHandler}
      nums={12}
      startIcon={<ShareIcon />}
    />
  );
};
