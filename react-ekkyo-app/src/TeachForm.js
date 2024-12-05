import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css"; // 共通のCSSファイルをインポート

function TeachForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // フォームの送信処理をここに追加
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Paper className="form-container" elevation={3}>
        <Typography variant="h5" className="form-title">
          対応可否
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="応募者に通知する内容を入力してください"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className="form-field"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="form-button"
          >
            送信
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default TeachForm;
