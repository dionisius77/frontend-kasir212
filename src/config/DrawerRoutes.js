import HRD from '../pages/HRD';
import User from '../pages/User';
import StockBarang from '../pages/StockBarang';

const DrawerRoutes =[

{path: '/App/HRD',name: 'HRD', component:HRD},
{path : '/App/User',name:'User', component:User},
{path:'/App/StockBarang',name: 'StockBarang', component:StockBarang}

]

export default DrawerRoutes;