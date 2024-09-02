import { app } from 'auth/AuthApp';
import { useInitialMicro } from '../hooks';

function Auth() {
  const initialMicro = useInitialMicro(app);

  return (
    <div
      id="_auth-service-wrapper"
      style={{ width: '100%', height: '100%', overflow: 'overlay' }}
      ref={initialMicro.ref}
    />
  );
}

export default Auth;
