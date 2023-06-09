'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';

export default function Home() {
  const [Checkouts, setCheckouts] = useState([]);
  const toast = useRef(null);

  const showError = (messageContent) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: messageContent,
      life: 3000,
    });
  };

  useEffect(() => {
    var inputParams = {
      maxResultCount: 25,
      skipCount: 0,
      sorting: 'string',
    };
    fetch('https://localhost:44325/api/app/tx-manager/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputParams),
    })
      .then((res) => res.json())
      .then((data) => setCheckouts(data.items))
      .catch((error) => {
        console.log(error);
        showError('خطا در بازیابی اطلاعات');
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="columns-1">
        <Panel header="Welcome" className="my-10">
          <p className="m-0">
            This is a minimalist, single layer application startup template for
            the ABP Framework.
          </p>
        </Panel>
        <Panel header="Checkout" className="my-10">
          <div className="card">
            <DataTable
              value={Checkouts}
              tableStyle={{ minWidth: '50rem' }}
              stripedRows
            >
              <Column field="name" header="Name"></Column>
              <Column field="checkoutAmount" header="Checkout Amount"></Column>
            </DataTable>
            <Toast ref={toast} />
          </div>
        </Panel>
      </div>
    </div>
  );
}
