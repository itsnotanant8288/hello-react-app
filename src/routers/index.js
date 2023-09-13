import React from 'react'
import { BrowserRouter,Routes,Route ,Router} from 'react-router-dom';
// import Home from '../modules/Home'
// import Sample from '../modules/Sample'
// import Example from '../modules/Example'
import SignUp from '../modules/SignUp'
// import Props from '../modules/Props'

const Index = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />}/>
      {/* <Route path="/sample" element={<Sample/>}/>
      <Route path='/example' element={<Example/>}/>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/Props' element={<Props/>}/> */}
    </Routes>
  </BrowserRouter>
  )
}

export default Index