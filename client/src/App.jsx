import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import NotFound from "./pages/NotFound"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </div>
  )
}

export default App
