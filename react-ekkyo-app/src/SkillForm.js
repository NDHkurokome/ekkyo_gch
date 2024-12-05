import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addData } from "./data";
import "./App.css";

function SkillForm() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addData({ summary, skills, availability: "可", comments, guest: "可能" });
    navigate("/");
  };

  return (
    <Container className="root">
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        登録
      </Button>
    </Container>
  );
}

export default SkillForm;
