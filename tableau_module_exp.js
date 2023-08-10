if (typeof exports !== "undefined") {
	if (typeof module !== "undefined" && module.exports) {
	module.exports = bar
	}
	exports._ = bar
} else {
  globalThis["tableau"] = bar
}

function bar(x,callback=x=>x){

	function foo(m){
	let content = "<style>table{font-family:arial,sans-serif;border-collapse:collapse;}td,th{border:1px solid #dddddd;text-align:left;padding:8px;white-space:nowrap;}</style><table>"
	m = ( Object.prototype.toString.call(m) == "[object Object]" ) ? Object.values(m) : m
	content += ["<th></th>",...Object.keys(m[0]).map(x=>`<th>${x}</th>`)].join("")
	for ( let [i,x] of m.entries() ){
	  content += `<tr><td style="text-align:center">${i+1}</td>`
	  	if( Object.prototype.toString.call(x) == "[object Object]" )
	      for ( let [k,v] of Object.entries(x) ){
	        content += `<td>${v}</td>` // <span title="${v}">${callback(v,k)}</span>
	        }
	    else if( Object.prototype.toString.call(x) == "[object Array]" )
	      for ( let [k,v] of x.entries() )
	        content += `<td>${v}</td>` // <span title="${v}">${callback(v,k)}</span>
	    else
	      content += `<td>${v}</td>` // <span title="${x}">${callback(x,n)}</span>
	  content += "</tr>"
	}
	content += "</table>"
	return content
	}

	/*String.prototype.escapeHTML = function(){
		return this.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
	}*/

	return foo(x)

	/*function short(n){ 
	return x => x.length > n ? x.slice(0,n) + "..." : x
	}*/

}