import { app } from 'bank/BankApp';
import { useInitialMicro } from '../hooks';
import { addScriptToHead } from '../lib';

addScriptToHead('https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js');

function Bank() {
  const initialMicro = useInitialMicro(app);

  return <div style={{ width: '100%', height: '100%', overflow: 'overlay' }} ref={initialMicro.ref} />;
}

export default Bank;
