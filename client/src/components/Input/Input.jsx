import React, { useState } from 'react'
import UrlBox from './UrlBox'
import apis from '../../api/api'
// import { bloomFilterBool } from '../../bloomFilter/bloomFilter'
import './Input.scss'

function Input() {
	let [input, setInput] = useState('')
	let [result, setResult] = useState('url')
	let [link, setLink] = useState('')
	let [url, setUrl] = useState(null)

	let validateUrl = (value) => {
		return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
			value
		)
	}

	let handleSubmit = (e) => {
		if (input.length > 0 && validateUrl(input)) {
			e.preventDefault()
			apis
				.postURL(input)
				.then((res) => {
					let data = res.data
					setResult(data)
					setLink(`http://localhost:4000/url/${data}`)
					setUrl(true)
				})
				.catch((err) => {
					console.log(err)
				})
		} else {
			setUrl(false)
			alert('URL not found, please enter a valid URL.')
			setResult('url')
		}
	}

	return (
		<div>
			<div className="container">
				<div className="input">
					<input
						type="text"
						placeholder="Enter a URL"
						value={input}
						onChange={(e) => {
							setInput(e.target.value)
						}}
						className="input-field"
					/>
					<button className="submit" onClick={handleSubmit}>
						Shorten
					</button>
				</div>
				{url == null ? (
					<UrlBox class="res" result={result} link={link} />
				) : (
					<>
						{url ? (
							<UrlBox class="res-true" result={result} link={link} />
						) : (
							<UrlBox class="res-false" result={result} link={link} />
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default Input
