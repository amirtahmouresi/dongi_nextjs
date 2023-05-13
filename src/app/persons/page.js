'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';

function Persons() {
  const [persons, setPersons] = useState([]);
  const toast = useRef(null);

  const showError = (messageContent) => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: messageContent,
      life: 3000,
    });
  };

  const actionBtn = (rowData, options) => {
    const icon = 'pi pi-cog';

    return (
      <Button
        type="button"
        icon={icon}
        className="p-button-sm p-button-text"
        label="Actions"
      />
    );
  };

  useEffect(() => {
    fetch('https://localhost:44325/api/app/person', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setPersons(data.items))
      .catch((error) => {
        console.log(error);
        showError('خطا در بازیابی اطلاعات');
      });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="columns-1">
        <Panel header="Persons" className="my-10">
          <div className="card">
            <DataTable
              value={persons}
              tableStyle={{ minWidth: '50rem' }}
              stripedRows
            >
              <Column body={actionBtn} header="Actions"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="creationTime" header="Creation Time"></Column>
            </DataTable>
            <Toast ref={toast} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default Persons;
