import React, { useState } from 'react'
import apis from '../../api/api'
import './Input.css'

function Input() {
	let [input, setInput] = useState('')
	let [result, setResult] = useState('url')
	let [link, setLink] = useState('')

	let handleSubmit = (e) => {
		e.preventDefault()
		apis
			.postURL(input)
			.then((res) => {
				let data = res.data
				setResult(data)
				setLink(`http://localhost:4000/url/${data}`)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div>
			<div className="header">
				<h1 className="urlheading">
					<a className="headinganchor" href="/">
						ShortURL
					</a>
				</h1>
			</div>
			<div className="container">
				<div className="input">
					<input
						type="text"
						placeholder="Enter a URL"
						value={input}
						onChange={(e) => {
							setInput(e.target.value)
						}}
						required
					/>

					<button onClick={handleSubmit}>Shorten</button>
				</div>
				<div className="res">
					Shortened URL:&nbsp;
					<a href={link} className="url" target="_blank" rel="noreferrer">
						shorturl.com/{result}
					</a>
					<br />
					GitHub repository:&nbsp;
					<a
						href="http://localhost:4000/url/f1nt"
						className="url"
						target="_blank"
						rel="noreferrer"
					>
						shorturl.com/f1nt
					</a>
				</div>
			</div>
		</div>
	)
}

export default Input
