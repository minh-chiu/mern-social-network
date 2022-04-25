import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputText, FormInputDate } from 'components/Common';
import { MDialog } from 'components/Common/Modal';

import { registerSchema } from 'validations';
import { RegisterData } from 'interface';
import { styles } from './styles';
import { storage } from 'utils';
import { useRegister } from 'RQhooks';
import { LoadingButton } from '@mui/lab';

const defaultValues: RegisterData = {
  email: '',
  name: '',
  password: '',
  dateOfBirth: null,
};

export const SignUp = () => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const { mutateAsync, isLoading } = useRegister();

  const [openModal, setOpenModal] = useState(false);

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    await mutateAsync(data);
    setOpenModal(true);
  };
  const token = storage.getToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!!token) navigate('/', { replace: true });
  }, [token, navigate]);

  return (
    <Box sx={{ background: '#36393f', borderRadius: 2, p: 4, color: 'white' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="600" component="h3" align="center">
            Tạo tài khoản
          </Typography>
        </Box>

        <Box mb={3}>
          <FormInputText label="Email" name="email" autoFocus={true} control={control} />
        </Box>

        <Box mb={3}>
          <FormInputText label="Tên tài khoản" name="name" control={control} />
        </Box>

        <Box mb={3}>
          <FormInputText label="Password" name="password" type="password" control={control} />
        </Box>

        <Box mb={3}>
          <FormInputDate label="Ngày Sinh" name="dateOfBirth" control={control} />
        </Box>

        <LoadingButton
          loadingIndicator="Sign Up..."
          loading={isLoading}
          variant="contained"
          fullWidth
          type="submit"
          sx={styles.button}
        >
          Đăng Ký
        </LoadingButton>

        <Box my={2}>
          <Typography sx={styles.text}>
            <Link to="/auth"> Already have an account?</Link>
          </Typography>
        </Box>
      </form>

      <MDialog
        type="ok"
        position="center"
        confirmButton={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        open={openModal}
        title="Đã gửi hướng dẫn"
      >
        <>
          Chúng tôi đã gửi thông tin xác nhận tạo tài khoản vào <b>{getValues('email')}</b>, vui
          lòng kiếm tra hộp thư cũng như thư rác của bạn.
        </>
      </MDialog>
    </Box>
  );
};
