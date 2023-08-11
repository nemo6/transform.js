let a_url  = x => `<a href="${x}">${short(63)(x)}</a>`
let a_span = x => `<span title="${x}">${short(63)(x)}</span>`

//

function short(n){ 
	return x => x.length > n ? x.slice(0,n) + "..." : x
}

// transform tuple/arr to html table

function transform(m){
let content = "<style>table{font-family:sans-serif;border-collapse:collapse;}td,th{border:1px solid #dddddd;padding:8px;white-space:nowrap;}</style><table>"
m = ( Object.prototype.toString.call(m) == "[object Object]" ) ? Object.values(m) : m
for ( let [n,v] of m.entries() ){
  content += "<tr>"
    content += `<td>${n+1}</td><td>${v}</td>`
  content += "</tr>"
}
content += "</table>"
return content
}

// or ( case array with object )

function transform(m){
let content = "<style>table{font-family:sans-serif;border-collapse:collapse;}td,th{border:1px solid #dddddd;padding:8px;white-space:nowrap;}</style><table>"
m = ( Object.prototype.toString.call(m) == "[object Object]" ) ? Object.values(m) : m
content += ["<th></th>",...Object.keys(m[0]).map(x=>`<th>${x}</th>`)].join("")
for ( let [n,x] of m.entries() ){
  content += "<tr>"
  content += `<td>${n+1}</td>`
    if( Object.prototype.toString.call(x) == "[object Object]" )
      for ( let v of Object.values(x) )
        content += `<td>${v}</td>`
    else if ( Object.prototype.toString.call(x) == "[object Array]" )
      for ( let v of x )
        content += `<td>${v}</td>`
    else
      content += `<td>${x}</td>`
  content += "</tr>"
}
content += "</table>"
return content
}

// or

function transform(m) {
let typeValue = x => switch(Object.prototype.toString.call(x)){ case "[object Array]":"array";case "[object Object]":"object";default:"value" }
let content = "<style>table{font-family:sans-serif;border-collapse:collapse;}td,th{border:1px solid #dddddd;padding:8px;white-space:nowrap;}</style><table>"
for ( let [n,x] of m.entries() ) {
  let select = ""
  content += "<tr>" // `<td>${n+1}</td>`
  if (typeValue(x) == "object")
    for ( let [k,v] of Object.entries(x) )
      content += `<td>${v}</td>`
  else if (typeValue(x) == "array")
    for ( let [k,v] of x.entries() ){
      content += `<td ${select} style="" >${v}</td>` }
  else if (typeValue(x) == "value")
    content += `<td>${x}</td>`
  content += "</tr>"
}
content += "</table>"
return content
}

// or

function transform(m){
let typeValue = x => switch(Object.prototype.toString.call(x)){ case "[object Array]":"array";case "[object Object]":"object";default:"value" }
let content = "<style>table{font-family:sans-serif;border-collapse:collapse;}td,th{border:1px solid #dddddd;padding:8px;white-space:nowrap;}</style><table>"
m = ( Object.prototype.toString.call(m) == "[object Object]" ) ? Object.values(m) : m
for ( let x of m ){
  content += "<tr>"
  if( typeValue(x) == "object" )
    for ( let v of Object.values(x) )
    content += `<td>${v}</td>`
  else if( typeValue(x) == "array" )
    for ( let v of x )
    content += `<td>${v}</td>`
  else if( typeValue(x) == "value" )
    content += `<td>${x}</td>`
  content += "</tr>"
}
content += "</table>"
return content
}

// or

function transform(y){
let content = "<table>"
let last = ""
for ( let x of y ){
    if( last != x[0])
    content += `<tr><td colspan="5" style="border:none;background-color:#dddddd;">&nbsp;<\/td></tr>`
    content += "<tr>"
        for ( let i in x )
          content += `<td style="white-space:nowrap;" >${x[i]}<\/td>`
    content += "</tr>"
    last = x[0]
}
content += "</table>"
return content
}

function btime(x){
	/* const dayjs = require("C:/Users/Miguel/AppData/Roaming/npm/node_modules/dayjs")
	require("C:/Users/Miguel/AppData/Roaming/npm/node_modules/dayjs/locale/fr")
	dayjs.locale("fr") */
	return dayjs(Math.trunc(x/1000+Date.UTC(1601,0,1))).format("dddd DD MMMM YYYY HH:mm:ss")
}

function escapeHTML(text) {
	return text.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
}

function escapeRegExp(text) {
	return text.replace(/[\/-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

function short(n){ 
	return x => x.length > n ? x.slice(0,n) + "..." : x
}

function updateEach(x,n,callback){
	return _.each( x, y => _.update( y, n, callback ) )
}

function updateFlow(x,ai,af){
	return _.each( x, y => { for( let k of Object.keys(ai) ) _.update( y, ai[k], _.flow(af[k]) ) } )
}

function hexEncode(x){
	return Buffer.from(x,"utf8").toString("hex")
}

function hexDecode(x){
	return Buffer.from(x,"hex").toString("utf8")
}

function server(x,n){
	const http = require("http")
	const PORT = 8080
	http.createServer(function (req, res) {
		res.writeHead(200,{"content-type":`text/${n};charset=utf8`})
		res.end(x)
	}).listen(PORT)
	console.log(`Running at port ${PORT}`)
}

// convert google timestamp to dayjs object

function foo(x){

	let convert_to_date = x => dayjs(Math.trunc(x/1000+Date.UTC(1601,0,1)))

	let a = convert_to_date(x.time)
	let b = dayjs()

	let c = b.diff(a)
	let d = dayjs.duration(c)

	return d.format("Y [année] M [mois] D [jours] H [heures] m [minutes] s [secondes]")

}
