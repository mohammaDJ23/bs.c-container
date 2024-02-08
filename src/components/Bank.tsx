import { app } from 'bank/BankApp';
import { useInitialMicro } from '../hooks';

function Bank() {
  const initialMicro = useInitialMicro(app);

  return <div style={{ width: '100%', height: '100%' }} ref={initialMicro.ref} />;
}

export default Bank;
