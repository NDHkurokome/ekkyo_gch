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
} from "@mui/material";
import "./App.css";

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
    <Container className="root">
      <Typography variant="h4" className="header">
        社内スキルマッチングスキトラチャットフォーム
      </Typography>
      <Typography variant="h6" className="subheader">
        マッチングした同士で事前に細かい要望や調整がありましたら、こちらのフォームで確認してください。
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
          className="textField"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        投稿
      </Button>
      <List>
        {posts.map((post, index) => (
          <ListItem button key={index} onClick={() => handlePostClick(post)}>
            <ListItemText primary={post} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ChatForm;
