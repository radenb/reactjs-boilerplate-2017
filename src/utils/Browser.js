let mobileos
if (typeof window === 'object') {
	let device = navigator.userAgent.toLowerCase()
	mobileos = device.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i)
}
else {
	mobileos = null
}
export default mobileos
