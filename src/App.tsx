import { Container, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
            </div>
        </ThemeProvider>
    );
}

export default App;
