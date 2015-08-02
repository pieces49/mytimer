angular.module( 'p49Timer', [] ).directive( 'p49Timer', [ '$compile', function ( $compile ) {

	StopWatcher = function () {};

	StopWatcher.prototype = {
		startTime: 0,
		running: false,
		elapsed: undefined,
		start: function () {
			this.startTime = +new Date();
			this.elapsedTime = undefined;
			this.running = true;
		},
		stop: function () {
			this.elapsed = ( +new Date() ) - this.startTime;
			this.running = false;
		},
		getElapsedTime: function () {
			if ( this.running ) {
				return ( +new Date() ) - this.startTime;
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

	var CONSTANT = {
		TICK_WIDTH: 10,
		TEXT_MARGIN: 20,
		CENTROID_RADIUS: 3,
		DEGREE_DIAL_MARGIN: 55,
		TRACKING_DIAL_MARGIN: 10,
		DEGREE_ANNOTATIONS_TEXT_SIZE: 18,
		DEGREE_OUTER_DIAL_MARGIN: 10,

		BASE_STYLE: '#6b46e5',
		TRANSPARENT_STYLE: 'rgba(0, 0, 0, 0)',
		WHITE_FILL_STYLE: 'rgba(255, 255, 255, 1)',
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

	var windowToCanvas = function ( canvas, x, y ) {
		var bbox = canvas.getBoundingClientRect();
		return {
			x: x - bbox.left * ( canvas.width / bbox.width ),
			y: y - bbox.top * ( canvas.height / bbox.height )
		};
	};

	return {
		restrict: 'EA',
		replace: false,
		scope: {
			duration: '=',
			isRunning: '=',
			end: '&'
		},
		template: '<canvas width="300" height="300">Browser dose not support canvas.</canvas>',
		link: function ( scope, el ) {

			var canvas = el.find( 'canvas' )[ 0 ];
			var ctx = canvas.getContext( '2d' );
			var timerSetting = scope.duration;

			var circle = {
				x: canvas.width / 2,
				y: canvas.height / 2,
				radius: 100
			};

			var timer = new StopWatcher();

			
			// 초침의 시작점을 잡아줄 중앙 점?
			var drawCentroid = function () {
				ctx.beginPath();
				ctx.save();
				ctx.strokeStyle = CONSTANT.BASE_STYLE;
				ctx.fillStyle = CONSTANT.BASE_STYLE;
				ctx.arc( circle.x, circle.y, CONSTANT.CENTROID_RADIUS, 0, Math.PI*2, false );
				ctx.stroke();
				ctx.fill();
				ctx.restore();
			};

			// 초침 렌더링
			var drawHand = function ( loc ) {
				var initialAngle = -Math.PI / 2 - ( Math.PI / 180 ) * ( timerSetting / 60 * 360 );
				var angle = initialAngle;
				var stopwatchElapsed = timer.getElapsedTime();
				var seconds, radius, endPt;

				// 진행된 시간이 존재할 때 해당 시간만큼 앵글을 지정
				if ( stopwatchElapsed ) {
					angle = -Math.PI / 2 - ( Math.PI / 180 ) * ( ( timerSetting - stopwatchElapsed / 1000 ) / 60 * 360 );
					seconds = parseFloat( timerSetting - stopwatchElapsed / 1000 ).toFixed( 2 );
				}

				radius = circle.radius + CONSTANT.TRACKING_DIAL_MARGIN;

				if ( loc.x >= circle.x ) {
					endPt = {
						x: circle.x + radius * Math.cos( angle ),
						y: circle.y + radius * Math.sin( angle )
					};
				} else {
					endPt = {
						x: circle.x - radius * Math.cos( angle ),
						y: circle.y - radius * Math.sin( angle )
					};
				}

				ctx.save();
				ctx.strokeStyle = CONSTANT.BASE_STYLE;
				ctx.fillStyle = CONSTANT.BASE_STYLE;
				ctx.lineWidth = 1;

				ctx.beginPath();
				ctx.moveTo( circle.x, circle.y );
				ctx.lineTo( endPt.x, endPt.y );
				ctx.stroke();

				ctx.beginPath();
				ctx.arc( endPt.x, endPt.y, 3, 0, Math.PI * 2, false );
				ctx.stroke();
				ctx.fillStyle = CONSTANT.WHITE_FILL_STYLE;
				ctx.fill();
				ctx.restore();
			};

			var drawTrackingDial = function () {

				ctx.save();
				ctx.strokeStyle = CONSTANT.BASE_STYLE;
				ctx.beginPath();
				ctx.arc( circle.x, circle.y, circle.radius, 0, Math.PI * 2, false );
				ctx.stroke();
				ctx.restore();

			};

			var drawDegreeOuterDial = function () {
				ctx.strokeStyle = CONSTANT.BASE_STYLE;
				ctx.fillStyle = CONSTANT.BASE_STYLE;
				ctx.fill();
				ctx.arc( circle.x, circle.y, circle.radius + CONSTANT.DEGREE_OUTER_DIAL_MARGIN, 0, Math.PI * 2, false );
			};

			var drawDegreeDialTicks = function () {
				var radius = circle.radius,
				ANGLE_MAX = 2 * Math.PI,
				ANGLE_DELTA = Math.PI / 64;

				ctx.save();

				for ( var angle = 0, cnt = 0; angle < ANGLE_MAX; angle += ANGLE_DELTA, ++cnt ) {
					ctx.beginPath();
					var tickWidth = CONSTANT.TICK_WIDTH;
					// 5의 배수일 경우
					if ( cnt % 4 !== 0 ) {
						tickWidth = tickWidth / 2;
					}

					ctx.moveTo( 
						circle.x + Math.cos( angle ) * ( radius - tickWidth ),
						circle.y + Math.sin( angle ) * ( radius - tickWidth )
					)

					ctx.lineTo(
						circle.x + Math.cos( angle ) * ( radius ),
						circle.y + Math.sin( angle ) * ( radius )
					)

					ctx.strokeStyle = CONSTANT.BASE_STYLE;
					ctx.stroke();
				}

				ctx.restore();
			};

			var drawDegreeAnnotations = function () {
				var radius = circle.radius + CONSTANT.TEXT_MARGIN;

				ctx.save();
				ctx.fillStyle = CONSTANT.BASE_STYLE;
				ctx.font = CONSTANT.DEGREE_ANNOTATIONS_TEXT_SIZE +'px Arial'; 

				for ( var angle = Math.PI / 2, i = 0; i < 60; angle += Math.PI / 6, i += 5 ) {
					ctx.beginPath();
					ctx.fillText(
						i,
						circle.x + Math.cos( angle ) * ( radius + 5 ),
						circle.y - Math.sin( angle ) * ( radius + 5 )
					);
				}

				ctx.restore();
			}

			var reDraw = function () {
				
				ctx.clearRect( 0, 0, canvas.width, canvas.height ); 
				drawDial();
			};

			var animate = function() {
				
				if ( timer.isRunning() && timer.getElapsedTime() > timerSetting * 1000 ) {
					timer.stop();
					scope.end( { message: false } );
					scope.$apply();
				} else if ( timer.isRunning() ) {
					reDraw();
					requestAnimationFrame( animate );
				}
			};

			// 다이얼 렌더링
			var drawDial = function () {

				var loc = {
					x: circle.x,
					y: circle.y
				};

				drawCentroid();
				drawHand( loc );

				drawTrackingDial();
				// drawDegreeOuterDial();

				ctx.fillStyle = CONSTANT.TRANSPARENT_STYLE;
				ctx.fill();
				
				ctx.beginPath();
				drawDegreeOuterDial();
				ctx.stroke();

				drawDegreeDialTicks();
				drawDegreeAnnotations();

			};
			
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';

			drawDial();

			scope.$watch( 'isRunning', function () {
				
				if ( scope.isRunning ) {

					timer.start();
					requestAnimationFrame( animate );

				} else {
					
					timer.stop();

				}

				timer.reset();
				
			} );


		}
	}
} ] );
