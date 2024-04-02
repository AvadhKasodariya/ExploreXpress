import Footer from '../components/Footer'
import Header from '../components/Header'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export default function appLayout({ children }) {
    return <>
        <Header />
        {children}
        <Footer/>
    </>
}
