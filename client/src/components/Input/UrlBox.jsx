import React from 'react'
import './Input.scss'

function UrlBox(props) {
	return (
		<div className={props.class}>
			<a href={props.link} className="url" target="_blank" rel="noreferrer">
				http://localhost:4000/url/{props.result}
			</a>
		</div>
	)
}

export default UrlBox
