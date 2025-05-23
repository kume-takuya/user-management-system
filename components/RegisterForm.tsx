// components/RegisterForm.tsx

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createUser } from "../utils/api";

// 必要に応じて利用する
interface RegisterFormInputs {
  name: string;
  email: string;
  role: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
  disabled?: boolean;
}

// TODO: 新規登録フォームコンポーネントを実装する
const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onError, disabled }) => {
  // 必要に応じて利用する
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await createUser(data);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        新規登録
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="名前"
          fullWidth
          margin="normal"
          disabled={disabled}
        />
        <TextField
          label="メール"
          fullWidth
          margin="normal"
          disabled={disabled}
        />
        <TextField
          label="ロール"
          fullWidth
          margin="normal"
          disabled={disabled}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={disabled}
        >
          登録
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
