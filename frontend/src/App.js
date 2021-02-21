import MainScreen from './components/MainScreen'
import { SharedSnackbarProvider } from './contexts/SnackbarProvider';

function App() {
    return (
        <main>
            <SharedSnackbarProvider>
                <MainScreen />
            </SharedSnackbarProvider>
        </main>
    )
}

export default App;