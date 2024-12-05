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
import "./SkillForm.css"; // CSSファイルをインポート

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
    addData(newData);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Paper className="form-container" elevation={3}>
        <Typography variant="h5" className="form-title">
          スキルフォーム
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="概要"
              variant="outlined"
              fullWidth
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="form-field"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="スキル"
              variant="outlined"
              fullWidth
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="form-field"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="コメント"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
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

export default SkillForm;
