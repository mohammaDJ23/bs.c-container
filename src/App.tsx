import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LoadingFallback from './components/LoadingFallback';
import RedirectionProvider from './components/RedirectionProvider';
import UserServiceSocketProvider from './components/UserServiceSocketProvider';
import NotificationSubscription from './components/NotificationSubscription';
import { isUserAuthenticated, Pathes, routes } from './lib';
import './lib/socket';

function App() {
  return (
    <BrowserRouter>
      <RedirectionProvider>
        <SnackbarProvider dense maxSnack={Infinity} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <UserServiceSocketProvider>
                      <NotificationSubscription>{route.element}</NotificationSubscription>
                    </UserServiceSocketProvider>
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to={isUserAuthenticated() ? Pathes.DASHBOARD : Pathes.LOGIN} />} />
          </Routes>
        </SnackbarProvider>
      </RedirectionProvider>
    </BrowserRouter>
  );
}

export default App;
