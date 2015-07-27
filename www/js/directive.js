angular.module( 'p49Timer', [] ).directive( 'p49Timer', [ '$compile', function ( $compile ) {

	StopWatcher = function () {};

	StopWatcher.prototype = {
		startTime: 0,
		running: false,
		elapsed: undefined,
		start: function () {
			this.startTime = new Date();
			this.elapsedTime = undefined;
			this.running = true;
		},
		stop: function () {
			this.elapsed = ( new Data() ) - this.startTime;
			this.running = false;
		},
		getElapsedTime: function () {
			if ( this.running ) {
				return ( new Date() ) - this.startTime;
			} else {
				return this.elapsed;
			}
		},
		isRunning: function () {
			return this.running;
		},
		reset: function () {
			this.elapsed = 0;
		}
	};

	var windowToCanvas = function ( canvas, x, y ) {
		var bbox = canvas.getBoundingClientRect();
		return {
			x: x - bbox.left * ( canvas.width / bbox.width ),
			y: y - bbox.top * ( canvas.height / bbox.height )
		};
	};

	var drawCentroid = function ( ctx, cst, circle ) {
		ctx.beginPath();
		ctx.save();
		ctx.strokeStyle = cst.CENTROID_STROKE_STYLE;
		ctx.fillStyle = cst.CENTROID_FILL_STYLE;
		ctx.arc( circle.x, circle.y, cst.CENTROID_RADIUS, 0, Math.PI*2, false );
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	};

	return {
		restrict: 'EA',
		replace: false,
		scope: {
			duration: '=',
			isPlay: '='
		},
		template: '<canvas></canvas>',
		link: function ( scope, el ) {

			scope.canvas = el.find( 'canvas' )[ 0 ];
			scope.ctx = scope.canvas.getContext( '2d' );

			var constant = {
				TICK_WIDTH: 15,
				TEXT_MARGIN: 135,
				CENTROID_RADIUS: 10,
				DEGREE_DIAL_MARGIN: 55,
				TRACKING_DIAL_MARGIN: 80,
				DEGREE_ANNOTATIONS_TEXT_SIZE: 18,
				DEGREE_OUTER_DIAL_MARGIN: 55,

				CENTROID_STROKE_STYLE: 'rgba(0, 0, 0, 0.5)',
				CENTROID_FILL_STYLE:'rgba(80, 190, 240, 0.6)',
				GUIDEWIRE_FILL_STYLE: 'rgba(85, 190, 240, 0.8)',
				TICK_LONG_STROKE_STYLE: 'rgba(100, 140, 230, 0.9)',
				TICK_SHORT_STROKE_STYLE: 'rgba(100, 140, 230, 0.7)',
				DEGREE_ANNOTATIONS_FILL_STYLE: 'rgba(0, 0, 230, 0.9)',
				TRACKING_DIAL_STROKING_STYLE: 'rgba(100, 140, 230, 0.5)',

				GUIDEWIRE_STROKE_STYLE: '#8ada55',
				GUIDEWIRE_FILL_STYLE: 'rgba(0, 0, 230, 0.9)'
			};

			var circle = {
				x: scope.canvas.width / 2,
				y: scope.canvas.height / 2,
				radius: 150
			};

			var timer = new StopWatcher();

			
			scope.$watch( 'isPlay', function () {
				console.log( 'watching' );
				if ( scope.isPlay ) {
					drawCentroid( scope.ctx, constant, circle );
					// P49Timer.start();
				} else {
					drawCentroid( scope.ctx, constant, circle );
					// P49Timer.stop();
				}
				
			} );


		}
	}
} ] );
