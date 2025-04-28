function arrayMin( array ) {

	if ( array.length === 0 ) return Infinity;

	let min = array[ 0 ];

	for ( let i = 1, l = array.length; i < l; ++ i ) {

		if ( array[ i ] < min ) min = array[ i ];

	}

	return min;

}

function arrayMax( array ) {

	if ( array.length === 0 ) return - Infinity;

	let max = array[ 0 ];

	for ( let i = 1, l = array.length; i < l; ++ i ) {

		if ( array[ i ] > max ) max = array[ i ];

	}

	return max;

}

function arrayNeedsUint32( array ) {

	// assumes larger values usually on last

	for ( let i = array.length - 1; i >= 0; -- i ) {

		if ( array[ i ] >= 65535 ) return true; // account for PRIMITIVE_RESTART_FIXED_INDEX, #24565

	}

	return false;

}

const TYPED_ARRAYS = {
	Int8Array: Int8Array,
	Uint8Array: Uint8Array,
	Uint8ClampedArray: Uint8ClampedArray,
	Int16Array: Int16Array,
	Uint16Array: Uint16Array,
	Int32Array: Int32Array,
	Uint32Array: Uint32Array,
	Float32Array: Float32Array,
	Float64Array: Float64Array
};

function getTypedArray( type, buffer ) {

	return new TYPED_ARRAYS[ type ]( buffer );

}

function createElementNS( name ) {

	return document.createElementNS( 'http://www.w3.org/1999/xhtml', name );

}

const styles = document.createElement('style');

styles.textContent = `
.disable-hdr .three\\.js-hdr-highlight {
	display: none;
}
.disable-hdr .three\\.js-hdr canvas[data-engine*="three.js"] {
	mix-blend-mode: initial !important;
	filter: initial !important;
}
`;

document.head.appendChild(styles);

function createDomElement(canvas) {
	const canvases = [];

	canvas.style.filter = 'invert(1)';

	const domElement = createElementNS( 'div');
	domElement.classList.add('three.js-hdr');

	domElement.appendChild(canvas);

	for (let i = 0; i < 3; i++) {
		const container = createElementNS("div");
		container.classList.add('three.js-hdr-highlight');
		container.style.pointerEvents = 'none';
		container.style.mixBlendMode = i === 0 ? 'exclusion' : i === 1 ? 'color-burn' : 'multiply';

		const canvas = createElementNS("canvas");
		canvas.style.inset = '0';
		canvas.style.position = 'absolute';

		if (i === 2) {
			canvas.style.opacity = 0.3;

			const div = createElementNS('div');
			div.style.position = 'absolute';
			div.style.inset = '0';
			div.style.background = 'white';
			container.append(div);
		}

		container.append(canvas);
		canvases.push(canvas);

		const video = createElementNS("video");
		container.append(video);

		video.muted = true;
		video.autoplay = true;
		video.playsInline = true;
		video.src =
			"data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAvG1kYXQAAAAfTgEFGkdWStxcTEM/lO/FETzRQ6gD7gAA7gIAA3EYgAAAAEgoAa8iNjAkszOL+e58c//cEe//0TT//scp1n/381P/RWP/zOW4QtxorfVogeh8nQDbQAAAAwAQMCcWUTAAAAMAAAMAAAMA84AAAAAVAgHQAyu+KT35E7gAADFgAAADABLQAAAAEgIB4AiS76MTkNbgAAF3AAAPSAAAABICAeAEn8+hBOTXYAADUgAAHRAAAAPibW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAKcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAw10cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAKcAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAACnAAAAAAABAAAAAAKFbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABdwAAAD6BVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAixtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAHsc3RibAAAARxzdHNkAAAAAAAAAAEAAAEMaHZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAHVodmNDAQIgAAAAsAAAAAAAPPAA/P36+gAACwOgAAEAGEABDAH//wIgAAADALAAAAMAAAMAPBXAkKEAAQAmQgEBAiAAAAMAsAAAAwAAAwA8oBQgQcCTDLYgV7kWVYC1CRAJAICiAAEACUQBwChkuNBTJAAAAApmaWVsAQAAAAATY29scm5jbHgACQAQAAkAAAAAEHBhc3AAAAABAAAAAQAAABRidHJ0AAAAAAAALPwAACz8AAAAKHN0dHMAAAAAAAAAAwAAAAIAAAPoAAAAAQAAAAEAAAABAAAD6AAAABRzdHNzAAAAAAAAAAEAAAABAAAAEHNkdHAAAAAAIBAQGAAAAChjdHRzAAAAAAAAAAMAAAABAAAAAAAAAAEAAAfQAAAAAgAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAQAAAABAAAAJHN0c3oAAAAAAAAAAAAAAAQAAABvAAAAGQAAABYAAAAWAAAAFHN0Y28AAAAAAAAAAQAAACwAAABhdWR0YQAAAFltZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACxpbHN0AAAAJKl0b28AAAAcZGF0YQAAAAEAAAAATGF2ZjYwLjMuMTAw";
		video.currentTime = 0;

		video.style.position = "absolute";
		video.style.inset = "0";
		video.style.background = "color(from #fff srgb 999 999 999)";
		video.style.objectFit = "cover";
		video.style.width = "100%";
		video.style.height = "100%";
		video.style.mixBlendMode = 'screen';

		domElement.append(container);
	}

	return { domElement, canvases };
}

/**
 * Creates a canvas element
 * @returns {HTMLCanvasElement}
 */
function createCanvasElement() {

	const canvas = createElementNS( 'canvas' );
	canvas.style.display = 'block';
	return canvas;

}

const _cache = {};

function warnOnce( message ) {

	if ( message in _cache ) return;

	_cache[ message ] = true;

	console.warn( message );

}

function probeAsync( gl, sync, interval ) {

	return new Promise( function ( resolve, reject ) {

		function probe() {

			switch ( gl.clientWaitSync( sync, gl.SYNC_FLUSH_COMMANDS_BIT, 0 ) ) {

				case gl.WAIT_FAILED:
					reject();
					break;

				case gl.TIMEOUT_EXPIRED:
					setTimeout( probe, interval );
					break;

				default:
					resolve();

			}

		}

		setTimeout( probe, interval );

	} );

}

function toNormalizedProjectionMatrix( projectionMatrix ) {

	const m = projectionMatrix.elements;

	// Convert [-1, 1] to [0, 1] projection matrix
	m[ 2 ] = 0.5 * m[ 2 ] + 0.5 * m[ 3 ];
	m[ 6 ] = 0.5 * m[ 6 ] + 0.5 * m[ 7 ];
	m[ 10 ] = 0.5 * m[ 10 ] + 0.5 * m[ 11 ];
	m[ 14 ] = 0.5 * m[ 14 ] + 0.5 * m[ 15 ];

}

function toReversedProjectionMatrix( projectionMatrix ) {

	const m = projectionMatrix.elements;
	const isPerspectiveMatrix = m[ 11 ] === - 1;

	// Reverse [0, 1] projection matrix
	if ( isPerspectiveMatrix ) {

		m[ 10 ] = - m[ 10 ] - 1;
		m[ 14 ] = - m[ 14 ];

	} else {

		m[ 10 ] = - m[ 10 ];
		m[ 14 ] = - m[ 14 ] + 1;

	}

}

export { arrayMin, arrayMax, arrayNeedsUint32, getTypedArray, createElementNS, createDomElement, createCanvasElement, warnOnce, probeAsync, toNormalizedProjectionMatrix, toReversedProjectionMatrix };
