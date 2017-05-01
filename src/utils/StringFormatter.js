export const replaceQuotes = (str) => {
    return str.replace(/&#8217;/g,"'").replace(/&#8220;/g, '"').replace(/&#8221;/g,'"')
}
export const removeSpecialChars = (str) => {
    return str.replace(/&lt;p&gt;/g,'').replace(/&lt;\/p&gt;/g,'').replace(/(<([^>]+)>)/g,'')
}

export const htmlify = (str) => {
	let a = str.match(/(<([^>]+)>)/g)
	console.log(a)
}
