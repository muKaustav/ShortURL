import React from 'react'
import './Footer.scss'
import github from '../../assets/images/github.png'
import linkedin from '../../assets/images/linkedin.png'

function Footer() {
	return (
		<div className="footer">
			<div className="resume">
				<h1>Resume</h1>
			</div>
			<div className="item">
				<h1>Made with ❤️ by kauC</h1>
			</div>
			<div className="socials">
				<a href="https://github.com/muKaustav" target="_blank" rel="noreferrer">
					<img src={github} className="github" alt="" />
				</a>
				<a
					href="https://www.linkedin.com/in/kaustavmukhopadhyay/"
					target="_blank"
					rel="noreferrer"
				>
					<img src={linkedin} className="linkedin" alt="" />
				</a>
			</div>
		</div>
	)
}

export default Footer
