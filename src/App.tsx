import { useContext } from 'react';
// import { SuccessContext, SuccessProvider } from './SuccessContext';
import Registration from './pages/Registration';
import SuccessPage from './pages/Success';
import { SuccessProvider, SuccessContext } from './context/SuccessContext';
import { SnackbarProvider } from 'notistack';

function AppContent() {
  const context = useContext(SuccessContext);

  if (!context) {
    throw new Error('AppContent must be used within a SuccessProvider');
  }

  const { isSuccess } = context;

  return <>{isSuccess ? <SuccessPage /> : <Registration />}</>;
}

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SuccessProvider>
        <AppContent />
      </SuccessProvider>
    </SnackbarProvider>
  );
}

export default App;
