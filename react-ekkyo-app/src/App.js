import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import SkillForm from "./SkillForm";
import TeachForm from "./TeachForm";
import ChatForm from "./ChatForm";
import Header from "./Header";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // public ディレクトリから data.json を読み込む
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const addData = (newData) => {
    const newId = data.length + 1;
    const updatedData = [...data, { id: newId, ...newData }];
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  return (
    <Router>
      <Header />
      <Container className="root">
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/skill-form" element={<SkillForm addData={addData} />} />
          <Route path="/teach-form" element={<TeachForm />} />
          <Route path="/chat-form" element={<ChatForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

function Home({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = () => {
    const filtered = data.filter(
      (item) =>
        item.summary.includes(searchTerm) ||
        item.skills.includes(searchTerm) ||
        item.comments.includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <Box mb={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          className="button"
          component={Link}
          to="/skill-form"
        >
          スキル募集フォーム
        </Button>
      </Box>
      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
        <TextField
          label="検索"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchField"
          style={{ marginRight: "16px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          検索
        </Button>
      </Box>
      <TableContainer component={Paper} className="tableContainer">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>募集概要</TableCell>
              <TableCell>求めるスキル</TableCell>
              <TableCell align="center">対応可否</TableCell>
              <TableCell>登録者コメント</TableCell>
              <TableCell align="center">ゲスト参加</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.summary}</TableCell>
                <TableCell>{row.skills}</TableCell>
                <TableCell align="center">
                  {row.availability === "教える" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/teach-form"
                    >
                      教える
                    </Button>
                  ) : (
                    row.availability
                  )}
                </TableCell>
                <TableCell>{row.comments}</TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {row.guest}
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to="/chat-form"
                      style={{ marginTop: "8px" }}
                    >
                      参加
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
