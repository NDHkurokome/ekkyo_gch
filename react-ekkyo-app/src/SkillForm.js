import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./App.css";

function SkillForm({ addData }) {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      summary,
      skills,
      availability: "教える",
      comments,
      guest: "0人",
    };

    // ローカルストレージにデータを保存
    const existingData = JSON.parse(localStorage.getItem("tableData")) || [];
    const newId = existingData.length + 5; // data.json に4件のデータがあるため、5から始まる
    const updatedData = [...existingData, { id: newId, ...newData }];
    localStorage.setItem("tableData", JSON.stringify(updatedData));

    // グローバルな状態にもデータを追加
    addData({ id: newId, ...newData });

    navigate("/");
  };

  return (
    <Container className="root">
      <Paper elevation={3} className="form-container">
        <Typography variant="h4" className="header">
          スキルマッチングサービス
        </Typography>
        <Typography variant="h6" className="subheader">
          募集要項
        </Typography>
        <Box mb={4}>
          <TextField
            label="募集要項"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="textField"
          />
        </Box>
        <Typography variant="h6" className="subheader">
          求めるスキル
        </Typography>
        <Box mb={4}>
          <TextField
            label="求めるスキル"
            variant="outlined"
            fullWidth
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="textField"
          />
        </Box>
        <Typography variant="h6" className="subheader">
          登録者コメント
        </Typography>
        <Box mb={4}>
          <TextField
            label="登録者コメント"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="textField"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="submitButton"
        >
          登録
        </Button>
      </Paper>
    </Container>
  );
}

export default SkillForm;
