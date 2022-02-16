import React, { useState } from 'react'
import apis from '../../api/api'

function Input() {
	let [input, setInput] = useState('')
	let [result, setResult] = useState('yourURL')
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
			<h1>Short URL</h1>
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
				<a href={link} target="_blank" rel="noreferrer">
					shorturl.com/{result}
				</a>
			</div>
		</div>
	)
}

export default Input
