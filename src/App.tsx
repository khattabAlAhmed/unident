import { Route, Routes } from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SigninFrom'
import SignupForm from './_auth/forms/SignupForm'
import { Home, ChannelPage, FormPage, GroupPage, LibraryPage, ProfilePage, SettingsPage } from './_root/pages'
import { SelectBatch, SelectCity, SelectCountry, SelectMajor, SelectUniversity } from './_setup/selections'
import SetupLayout from './_setup/SetupLayout'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from './components/ui/toaster'



function App() {
  return (
    <main className='flex h-screen'>
      <Routes>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* Setup Routes */}
        <Route element={<SetupLayout />}>
          <Route path='/select-country' element={<SelectCountry />} />
          <Route path='/select-City' element={<SelectCity />} />
          <Route path='/select-University' element={<SelectUniversity />} />
          <Route path='/select-Major' element={<SelectMajor />} />
          <Route path='/select-Batch' element={<SelectBatch />} />
        </Route>

        {/* Root Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/group/:id' element={<GroupPage />} />
          <Route path='/channel/:id' element={<ChannelPage />} />
          <Route path='/form/:id' element={<FormPage />} />
          <Route path='/library/:id' element={<LibraryPage />} />
          <Route path='/settings/:id' element={<SettingsPage />} />
        </Route>

      </Routes>
      <Toaster />
    </main>
  )
}

export default App
