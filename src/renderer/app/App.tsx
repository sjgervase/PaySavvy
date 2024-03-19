import ViewContainer from '@components/Views/ViewContainer'
import NavBar from '@components/Navbar/NavBar'
// import { selectAllLoans } from '../context/loansSlice'
// import { useSelector } from 'react-redux'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // const test = useSelector(selectAllLoans)
  // console.log(test)

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 h-[40px]">
        <NavBar />
      </header>
      <main className="flex-grow overflow-y-hidden h-[calc(100vh-40px)]">
        <ViewContainer />
      </main>
    </div>
  )
}

export default App
