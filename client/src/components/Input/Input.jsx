import React, { useState } from 'react'
import axios from 'axios'

function Input() {
	let [input, setInput] = useState('')
	let [result, setResult] = useState('yourURL')
	let [link, setLink] = useState('')

	let handleSubmit = (e) => {
		e.preventDefault()
		axios
			.post('/', { OriginalUrl: input })
			.then((res) => {
				setResult(res.data)
				setLink('http://node-server:8081/' + res.data)
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
