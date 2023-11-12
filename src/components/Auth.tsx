import { app } from 'auth/AuthApp';
import { useInitialMicro } from '../hooks';

function Auth() {
  const initialMicro = useInitialMicro(app);

  return <div ref={initialMicro.ref} />;
}

export default Auth;
