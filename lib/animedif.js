async function Animedif(data) {
    const fetch = require("node-fetch")
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Ojimi/anime-kawai-diffusion",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	)
	const result = await response.blob();
	let arrayBuffer = await result.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer, 'base64')
	return buffer
}

module.exports = { Animedif }