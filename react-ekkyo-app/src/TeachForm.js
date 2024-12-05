import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./App.css";

function TeachForm() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // フォームの送信処理をここに追加
    navigate("/");
  };

  return (
    <Container className="root">
      <Typography variant="h4" className="header">
        社内スキルマッチング
      </Typography>
      <Typography variant="h6" className="subheader">
        スキトラ 登録フォーム
      </Typography>
      <Box mb={4}>
        <TextField
          label="どのようなことを応募者に伝えますか。"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          className="textField"
        />
      </Box>
      <Box mb={4}>
        <TextField
          label="開催の希望日を記載ください"
          variant="outlined"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          className="textField"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        登録
      </Button>
    </Container>
  );
}

export default TeachForm;
