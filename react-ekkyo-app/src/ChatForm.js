import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import "./App.css";
import "./FormStyles.css"; // 共通のCSSファイルをインポート

function ChatForm() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [selectedPost, setSelectedPost] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setPosts([...posts, newPost]);
    setNewPost("");
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <Container maxWidth="sm">
      <Paper className="form-container" elevation={3}>
        <Typography variant="h5" className="form-title">
          ゲスト参加
        </Typography>
        <Typography variant="h6" className="subheader">
          共有事項を投稿してください。
        </Typography>
        {selectedPost && (
          <Box mb={4}>
            <Typography variant="body1" className="selectedPost">
              {selectedPost}
            </Typography>
          </Box>
        )}
        <Box mb={4}>
          <TextField
            label="投稿内容"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="form-field"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="form-button"
        >
          送信
        </Button>
        <List className="comment-list">
          {posts.map((post, index) => (
            <ListItem
              key={index}
              onClick={() => handlePostClick(post)}
              className="comment"
            >
              <ListItemText primary={post} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ChatForm;
