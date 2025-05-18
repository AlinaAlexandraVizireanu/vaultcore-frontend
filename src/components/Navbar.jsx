import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

export default function Navbar({ selectedStock }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            gap: 1,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            InvestifAI
          </Typography>
          {token && (
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "500px",
                },
              }}
            >
              <SearchBar onSelect={selectedStock} />
            </Box>
          )}
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
