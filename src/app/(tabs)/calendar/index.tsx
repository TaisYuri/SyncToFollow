import { Controller } from "./Controller";
import { Layout } from "./Layout";

export default function Calendar() {
  const { dataScheduled, getScheduled, loading } = Controller();
  return (
    <Layout
      dataScheduled={dataScheduled}
      getScheduled={getScheduled}
      loading={loading}
    />
  );
}

/* 
#181818
#ffaa00   #ff881B
#eeeeee 


#03318c
#0487D9
#F2A477

#DAE1E7
#142850
#00909E

#D7D7D9
#734743
#0E3A73

*/
