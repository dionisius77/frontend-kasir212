import HRD from '../pages/HRD';
import User from '../pages/User';
import StockBarang from '../pages/StockBarang';
import BeliBarang from '../pages/BeliBarang';
import InputStock from '../pages/InputStock';
import ManajemenGudang from '../pages/ManajemenGudang';
import Barang from '../pages/Barang';
import Stock from '../pages/Stock';
const DrawerRoutes =[

{path:'/App/HRD',name: 'HRD', component:HRD},
{path:'/App/User',name:'User', component:User},
{path:'/App/StockBarang',name: 'StockBarang', component:StockBarang},
{path:'/App/BeliBarang',name :'BeliBarang', component:BeliBarang},
{path:'/App/InputStock',name :'InputStock', component:InputStock},
{path:'/App/ManajemenGudang',nama : 'ManajemenGudang',component:ManajemenGudang},
{path:'/App/Barang',nama : 'Barang',component:Barang},
{path:'/App/Stock',nama : 'Stock',component:Stock}
]


export default DrawerRoutes;