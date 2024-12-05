import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Message as MessageIcon,
  Settings as SettingsIcon,
  ContactMail as ContactMailIcon,
} from "@mui/icons-material";

const Menu = ({ drawerOpen, toggleDrawer }) => {
  return (
    <Drawer variant="permanent" open={drawerOpen}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="ダッシュボード" />
        </ListItem>
        <ListItem button component={Link} to="/skill-form">
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="募集を作成" />
        </ListItem>
        <ListItem button component={Link} to="/candidate-management">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="候補者管理" />
        </ListItem>
        <ListItem button component={Link} to="/recruitment-management">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="募集管理" />
        </ListItem>
        <ListItem button component={Link} to="/messages">
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="メッセージ" />
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List>
        <ListItem button component={Link} to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="設定" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="お問い合わせ" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Menu;
