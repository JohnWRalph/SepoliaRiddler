import './app.css'
import App from './App.svelte'
import Footer from './components/Footer.svelte'
import Navbar from './components/Navbar.svelte'

const app = new App({
  target: document.getElementById('app'),
})


export {app}
