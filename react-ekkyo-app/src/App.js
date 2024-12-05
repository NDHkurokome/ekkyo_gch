import React from "react";
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
  Typography,
} from "@mui/material";
import "./App.css";

function App() {
  return (
    <Container className="root">
      <Typography variant="h4" className="header">
        スキルマッチングサービス
      </Typography>
      <Button variant="contained" color="primary" className="button">
        スキル募集フォーム
      </Button>
      <TextField
        label="検索"
        variant="outlined"
        fullWidth
        className="searchField"
      />
      <TableContainer component={Paper}>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>募集概要</TableCell>
              <TableCell>求めるスキル</TableCell>
              <TableCell>対応可否</TableCell>
              <TableCell>登録者コメント</TableCell>
              <TableCell>ゲスト参加</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ここにデータを追加 */}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>例: フロントエンド開発</TableCell>
              <TableCell>React, JavaScript</TableCell>
              <TableCell>可</TableCell>
              <TableCell>経験あり</TableCell>
              <TableCell>可能</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
