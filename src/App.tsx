// import { SuccessContext, SuccessProvider } from './SuccessContext';

import { SnackbarProvider } from 'notistack';
import Authorization from './pages/Authorization';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Authorization />
    </SnackbarProvider>
  );
}

export default App;
