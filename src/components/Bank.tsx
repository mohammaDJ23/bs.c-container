import { app } from 'bank/BankApp';
import { useInitialMicro } from '../hooks';

function Bank() {
  const initialMicro = useInitialMicro(app);

  return <div ref={initialMicro.ref} />;
}

export default Bank;
