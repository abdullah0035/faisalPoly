/* eslint-disable no-unused-vars */
// Routing.js - Updated with better route organization
import { Route, Routes, Navigate } from 'react-router-dom'
import PrivateRoutes from '../redux/auth/privateRoutes'
import PublicRoutes from '../redux/auth/publicRoutes'
import { useAuth } from '../redux/auth/useAuth'
import { useSelector } from 'react-redux'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard/dashboard'
import AddLabour from '../pages/laybour/addLabour'
import Salaries from '../pages/laybour/salaries'
import UpdateLabour from '../pages/laybour/updateLabour'
import LabourList from '../pages/laybour/labourList'
import AddSupplier from '../pages/supplier/addSupplier'
import UpdateSupplier from '../pages/supplier/updateSupplier'
import SupplierList from '../pages/supplier/supplierList'
import AddPurchaseOrder from '../pages/purchase/addPurchaseOrder'
import PurchaseList from '../pages/purchase/purchaseList'
import AddRawMaterial from '../pages/material/addMaterial'
import QualityCheckList from '../pages/quality/qualityCheckList'
import InventoryList from '../pages/inventory/inventoryList'
import StockMovementList from '../pages/inventory/stockMovementList'

// Root redirect component
const RootRedirect = () => {
  const auth = useAuth()
  const loginRedirect = useSelector(state => state.auth?.loginRedirect) ?? "/dashboard";
  console.log("the login redirect is ", loginRedirect);
  return <Navigate to={auth ? loginRedirect : '/'} />
}

const Routing = () => {
  return (
    <>
      <Routes>
        {/* Private Routes */}
        {/* <Route element={<PrivateRoutes />}>
        </Route> */}
        {/* Public Routes */}
        {/* <Route element={<PublicRoutes />}>
        </Route> */}
        {/* Fallback route - redirects to appropriate page based on auth */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
        <Route path='/labour/'>
            <Route path='add' element={<AddLabour />} />
            <Route path='update/:id' element={<UpdateLabour />} />
            <Route path='salaries' element={<Salaries />} />
            <Route path='list' element={<LabourList />} />
          </Route> 
          <Route path='/supplier/'>
            <Route path='add' element={<AddSupplier />} />
            <Route path='update/:id' element={<UpdateSupplier />} />
            <Route path='list' element={<SupplierList />} />
          </Route> 
          <Route path='/purchases/'>
            <Route path='add' element={<AddPurchaseOrder />} />
            <Route path='update/:id' element={<PurchaseList />} />
          </Route> 
          <Route path='/materials/'>
            <Route path='add' element={<AddRawMaterial />} />
            <Route path='list' element={<PurchaseList />} />
          </Route> 
          <Route path='/warehouse/'>
            <Route path='add' element={<AddRawMaterial />} />
            <Route path='list' element={<PurchaseList />} />
          </Route> 
          <Route path='/quality' element={<QualityCheckList/>}/>
          <Route path='/inventory' element={<InventoryList/>}/>
          <Route path='/stock-movement' element={<StockMovementList/>}/>
           
            {/* <Route path='add' element={<AddQualityCheck />} /> */}
            {/* <Route path='list' element={<PurchaseList />} /> */}
        <Route path='*' element={<RootRedirect />} />
      </Routes>
    </>
  )
}

export default Routing