import _ from 'lodash';
import * as d3 from "d3";

const _h = 1000;
const _w = 1000; //Math.round(_h*16/9.);

const _black = "#050103";
const _yellow = "#FDDE06";
const _blue = "#0300AD";
const _red = "#E70503";
const _white = "#EAEFE9";

const _orange = "#FF7D00";
const _grey = "#15616D";

const n = 10;
const data = f => Array.from({ length: n }, (_, i) => [
    (2*Math.PI / n) * (i+1),
    f+Math.random()*f/1 + 30*Math.abs(Math.sin((1+i)*2*Math.PI/n))]);

const radialLineGenerator = d3.lineRadial().curve(d3.curveBasisClosed);

function addPath(svg, options) {
    svg.append("path")
	.style("fill", options.fill)
	.style("stroke", "none")
	.attr("d", options.d)
    	.attr("transform", `translate(${options.shiftWidth},${options.shiftHeight})`)
	.on("click", () => {
	    options.d = radialLineGenerator(data(100));
	    svg.attr("d", options.d)
	})
    return svg;
}

function component() {
    const svg = d3
	  .select("body")
	  .append("svg")
	  .attr("id", "canvas")
	  .attr("width", 1000)
	  .attr("height", 1000)
	  .style("border", "none")
	  .style("border-width", "1px")
	  .style("background-color", _white)

    // addPath(svg, {"fill": _red,
    // 		  "shiftWidth": _w/1,
    // 		  "shiftHeight": _h/2,
    // 		  "d": radialLineGenerator(data(150))});
    // addPath(svg, {"fill": _yellow,
    // 		  "shiftWidth": _w/4,
    // 		  "shiftHeight": _h/2,
    // 		  "d": radialLineGenerator(data(100))});
    // addPath(svg, {"fill": _blue,
    // 		  "shiftWidth": _w/2,
    // 		  "shiftHeight": _h/3,
    // 		  "d": radialLineGenerator(data(70))});
    // addPath(svg, {"fill": _black,
    // 		  "shiftWidth": 5*_w/6,
    // 		  "shiftHeight": _h/8,
    // 		  "d": radialLineGenerator(data(70))});

    addPath(svg, {"fill": _black,
		  "shiftWidth": _w/2,
		  "shiftHeight": _h/2,
		  "d": radialLineGenerator(data(280))});
    addPath(svg, {"fill": _red,
		  "shiftWidth": _w/2,
		  "shiftHeight": _h/2,
		  "d": radialLineGenerator(data(200))});
    addPath(svg, {"fill": _yellow,
		  "shiftWidth": _w/2,
		  "shiftHeight": _h/2,
		  "d": radialLineGenerator(data(150))});
    addPath(svg, {"fill": _blue,
		  "shiftWidth": _w/2,
		  "shiftHeight": _h/2,
		  "d": radialLineGenerator(data(100))});

    return svg;

}

export function downloadSVG() {
    let svg = document.getElementById("canvas");

    let serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
	source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
	source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    let url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

    const element = document.createElement("a");
    element.download = "blob.svg";
    element.href = url;
    element.click();
    element.remove();
}

const svg = component();
