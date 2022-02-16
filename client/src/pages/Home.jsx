import React from 'react'
import Header from '../components/Header/Header'
import Input from '../components/Input/Input'
import Footer from '../components/Footer/Footer'
import './Home.scss'

function Home() {
	return (
		<div className="home-body">
			<Header />
			<Input />
			<Footer />
		</div>
	)
}

export default Home
