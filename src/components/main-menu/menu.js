'use client';

import { Menubar } from 'primereact/menubar';

function MainMenu() {
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      url: '/',
    },
    {
      label: 'Persons',
      icon: 'pi pi-fw pi-users',
      url: '/persons',
    },
    {
      label: 'Transactions',
      icon: 'pi pi-fw pi-dollar',
      url: 'transactions',
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off',
    },
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}

export default MainMenu;
