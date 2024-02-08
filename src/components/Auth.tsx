import { app } from 'auth/AuthApp';
import { useInitialMicro } from '../hooks';

function Auth() {
  const initialMicro = useInitialMicro(app);

  return <div style={{ width: '100%', height: '100%' }} ref={initialMicro.ref} />;
}

export default Auth;
