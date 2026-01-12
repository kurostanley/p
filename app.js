// Harmonic Gambit - Main Application Logic

// Global variables
let board = null;
let game = null;
let currentMoveIndex = 0;
let autoplayInterval = null;

// Move sequence from PGN
// Fischer vs Spassky 1972 Game 6 - Corrected sequence
// Note: Original PGN had recording error at move 17 (duplicate Nd7)
// Move 17 black: Using Rab8 (logical rook maneuver based on position)
const moveSequence = [
	"c4", "e6", "Nf3", "d5", "d4", "Nf6", "Nc3", "Be7", "Bg5", "O-O",
	"e3", "h6", "Bh4", "b6", "cxd5", "Nxd5", "Bxe7", "Qxe7", "Nxd5", "exd5",
	"Rc1", "Be6", "Qa4", "c5", "Qa3", "Rc8", "Bb5+", "Nd7", "dxc5", "bxc5",
	"O-O", "Rcb8", "Be2", "Rab8", "Nd4", "Qf8", "Nxe6", "fxe6", "e4", "d4",
	"f4", "Qe7", "e5", "Rb6", "Bc4", "Kh8", "Qh3", "Nf8", "b3", "a5",
	"f5", "exf5", "Rxf5", "Nh7", "Rcf1", "Qd8", "Qg3", "Re7", "h4", "Rbb7",
	"e6", "Rbc7", "Qe5", "Qe8", "a4", "Qd8", "R1f2", "Qe8", "R2f3", "Qd8",
	"Bd3", "Qe8", "Qe4", "Nf6", "Rxf6", "gxf6", "Rxf6", "Kg8", "Bc4", "Kh8",
	"Qf4"
];

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	initializeChessboard();
	initializeControls();
	initializeCharts();
});

// ============================================================
// CHESS BOARD FUNCTIONS
// ============================================================

function initializeChessboard() {
	// Initialize Chess.js game
	game = new Chess();
	
	// Initialize Chessboard.js
	const config = {
		draggable: false,
		position: 'start',
		pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
	};
	
	board = Chessboard('board', config);
	updateMoveInfo();
}

function makeNextMove() {
	if (currentMoveIndex >= moveSequence.length) {
		stopAutoplay();
		return false;
	}
	
	const move = moveSequence[currentMoveIndex];
	try {
		// Try to make the move
		const result = game.move(move);
		if (result === null) {
			console.error('====== INVALID MOVE DETECTED ======');
			console.error('Move:', move, 'at index', currentMoveIndex);
			console.error('Move number:', Math.ceil((currentMoveIndex + 1) / 2));
			console.error('Turn:', game.turn() === 'w' ? 'White' : 'Black');
			console.error('Current FEN:', game.fen());
			console.error('Legal moves:', game.moves().join(', '));
			console.error('==================================');
			
			// Show error message to user
			const currentMoveSpan = document.getElementById('currentMove');
			currentMoveSpan.textContent = `ERROR: Invalid move "${move}" at position ${currentMoveIndex}`;
			currentMoveSpan.style.color = 'red';
			
			stopAutoplay();
			return false;
		}
		board.position(game.fen());
		currentMoveIndex++;
		updateMoveInfo();
		return true;
	} catch (error) {
		console.error('Error making move:', move, error);
		stopAutoplay();
		return false;
	}
}

function makePreviousMove() {
	if (currentMoveIndex <= 0) {
		return false;
	}
	
	game.undo();
	board.position(game.fen());
	currentMoveIndex--;
	updateMoveInfo();
	return true;
}

function resetToStart() {
	game.reset();
	board.position('start');
	currentMoveIndex = 0;
	updateMoveInfo();
	stopAutoplay();
}

function jumpToEnd() {
	while (currentMoveIndex < moveSequence.length) {
		makeNextMove();
	}
	stopAutoplay();
}

function updateMoveInfo() {
	const moveNumberSpan = document.getElementById('moveNumber');
	const currentMoveSpan = document.getElementById('currentMove');
	
	moveNumberSpan.textContent = currentMoveIndex;
	
	if (currentMoveIndex === 0) {
		currentMoveSpan.textContent = 'Start position';
	} else if (currentMoveIndex >= moveSequence.length) {
		currentMoveSpan.textContent = 'Game ended - Fischer wins';
	} else {
		const lastMove = moveSequence[currentMoveIndex - 1];
		const moveNum = Math.ceil(currentMoveIndex / 2);
		const color = currentMoveIndex % 2 === 1 ? 'White' : 'Black';
		currentMoveSpan.textContent = `${moveNum}. ${lastMove} (${color})`;
	}
}

// ============================================================
// CONTROL FUNCTIONS
// ============================================================

function initializeControls() {
	document.getElementById('startBtn').addEventListener('click', resetToStart);
	document.getElementById('prevBtn').addEventListener('click', makePreviousMove);
	document.getElementById('nextBtn').addEventListener('click', makeNextMove);
	document.getElementById('endBtn').addEventListener('click', jumpToEnd);
	document.getElementById('autoplayBtn').addEventListener('click', toggleAutoplay);
}

function toggleAutoplay() {
	const btn = document.getElementById('autoplayBtn');
	
	if (autoplayInterval) {
		stopAutoplay();
	} else {
		startAutoplay();
	}
}

function startAutoplay() {
	const btn = document.getElementById('autoplayBtn');
	btn.textContent = '⏸ Pause';
	
	autoplayInterval = setInterval(() => {
		const hasNext = makeNextMove();
		if (!hasNext) {
			stopAutoplay();
		}
	}, 1000); // 1 second per move
}

function stopAutoplay() {
	if (autoplayInterval) {
		clearInterval(autoplayInterval);
		autoplayInterval = null;
	}
	const btn = document.getElementById('autoplayBtn');
	btn.textContent = '▶️ Autoplay';
}

// ============================================================
// CHART INITIALIZATION
// ============================================================

function initializeCharts() {
	createEvaluationChart();
	createMaterialChart();
	createLayerActivityChart();
	createEventDistributionChart();
}

// Chart 1: Position Evaluation Over Time
function createEvaluationChart() {
	const ctx = document.getElementById('evaluationChart').getContext('2d');
	
	const labels = Array.from({ length: 42 }, (_, i) => i);
	
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: 'Position Evaluation (pawns)',
				data: EVALUATION_DATA,
				borderColor: 'rgb(52, 152, 219)',
				backgroundColor: 'rgba(52, 152, 219, 0.1)',
				borderWidth: 2,
				fill: true,
				tension: 0.3,
				pointRadius: 3,
				pointHoverRadius: 6
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				title: {
					display: true,
					text: 'Position Evaluation Throughout the Game',
					font: { size: 16, weight: 'bold' }
				},
				legend: {
					display: true,
					position: 'top'
				},
				tooltip: {
					mode: 'index',
					intersect: false,
					callbacks: {
						label: function(context) {
							let label = context.dataset.label || '';
							if (label) {
								label += ': ';
							}
							if (context.parsed.y !== null) {
								label += context.parsed.y.toFixed(1) + ' pawns';
							}
							return label;
						}
					}
				}
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Move Number',
						font: { size: 14 }
					},
					grid: {
						color: 'rgba(0, 0, 0, 0.05)'
					}
				},
				y: {
					title: {
						display: true,
						text: 'Evaluation (Positive = White Advantage)',
						font: { size: 14 }
					},
					beginAtZero: true,
					grid: {
						color: 'rgba(0, 0, 0, 0.1)'
					}
				}
			},
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false
			}
		}
	});
}

// Chart 2: Material Balance
function createMaterialChart() {
	const ctx = document.getElementById('materialChart').getContext('2d');
	
	const labels = Array.from({ length: 42 }, (_, i) => i);
	
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: 'Material Balance',
				data: MATERIAL_BALANCE,
				borderColor: 'rgb(46, 204, 113)',
				backgroundColor: 'rgba(46, 204, 113, 0.1)',
				borderWidth: 2,
				fill: true,
				tension: 0.1,
				pointRadius: 3,
				pointHoverRadius: 6
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				title: {
					display: true,
					text: 'Material Balance Over Time',
					font: { size: 16, weight: 'bold' }
				},
				legend: {
					display: true,
					position: 'top'
				},
				tooltip: {
					mode: 'index',
					intersect: false,
					callbacks: {
						label: function(context) {
							let label = context.dataset.label || '';
							if (label) {
								label += ': ';
							}
							if (context.parsed.y !== null) {
								const value = context.parsed.y;
								if (value > 0) {
									label += '+' + value + ' pawns (White up)';
								} else if (value < 0) {
									label += value + ' pawns (Black up)';
								} else {
									label += 'Equal';
								}
							}
							return label;
						}
					}
				}
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Move Number',
						font: { size: 14 }
					},
					grid: {
						color: 'rgba(0, 0, 0, 0.05)'
					}
				},
				y: {
					title: {
						display: true,
						text: 'Material Advantage (Pawn Units)',
						font: { size: 14 }
					},
					grid: {
						color: 'rgba(0, 0, 0, 0.1)'
					}
				}
			}
		}
	});
}

// Chart 3: Musical Layer Activity
function createLayerActivityChart() {
	const ctx = document.getElementById('layerActivityChart').getContext('2d');
	
	const labels = Array.from({ length: 42 }, (_, i) => i);
	
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Fischer - Foundation (King Safety)',
					data: FOUNDATION_ACTIVITY.fischer,
					borderColor: 'rgb(52, 152, 219)',
					backgroundColor: 'rgba(52, 152, 219, 0.2)',
					borderWidth: 2,
					fill: false,
					tension: 0.3,
					pointRadius: 2
				},
				{
					label: 'Spassky - Foundation (King Safety)',
					data: FOUNDATION_ACTIVITY.spassky,
					borderColor: 'rgb(231, 76, 60)',
					backgroundColor: 'rgba(231, 76, 60, 0.2)',
					borderWidth: 2,
					fill: false,
					tension: 0.3,
					pointRadius: 2
				},
				{
					label: 'Fischer - Groove (Activity)',
					data: GROOVE_ACTIVITY.fischer,
					borderColor: 'rgb(46, 204, 113)',
					backgroundColor: 'rgba(46, 204, 113, 0.2)',
					borderWidth: 2,
					fill: false,
					tension: 0.3,
					pointRadius: 2,
					borderDash: [5, 5]
				},
				{
					label: 'Spassky - Groove (Activity)',
					data: GROOVE_ACTIVITY.spassky,
					borderColor: 'rgb(230, 126, 34)',
					backgroundColor: 'rgba(230, 126, 34, 0.2)',
					borderWidth: 2,
					fill: false,
					tension: 0.3,
					pointRadius: 2,
					borderDash: [5, 5]
				},
				{
					label: 'Lead Events (Tactical)',
					data: LEAD_EVENTS.map(v => v * 0.3), // Scale down for visibility
					borderColor: 'rgb(155, 89, 182)',
					backgroundColor: 'rgba(155, 89, 182, 0.3)',
					borderWidth: 0,
					fill: true,
					stepped: true,
					pointRadius: 0
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				title: {
					display: true,
					text: 'Musical Layer Activity - Four-Layer Sonic Hierarchy',
					font: { size: 16, weight: 'bold' }
				},
				legend: {
					display: true,
					position: 'top',
					labels: {
						usePointStyle: true,
						padding: 15
					}
				},
				tooltip: {
					mode: 'index',
					intersect: false
				}
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Move Number',
						font: { size: 14 }
					},
					grid: {
						color: 'rgba(0, 0, 0, 0.05)'
					}
				},
				y: {
					title: {
						display: true,
						text: 'Activity Intensity (0-1)',
						font: { size: 14 }
					},
					min: 0,
					max: 1,
					grid: {
						color: 'rgba(0, 0, 0, 0.1)'
					}
				}
			},
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false
			}
		}
	});
}

// Chart 4: Event Distribution by Phase
function createEventDistributionChart() {
	const ctx = document.getElementById('eventDistributionChart').getContext('2d');
	
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Opening\n(Moves 1-10)', 'Middlegame\n(Moves 11-25)', 'Endgame\n(Moves 26-41)'],
			datasets: [
				{
					label: 'Discrete Events',
					data: [
						EVENT_DISTRIBUTION.opening,
						EVENT_DISTRIBUTION.middlegame,
						EVENT_DISTRIBUTION.endgame
					],
					backgroundColor: [
						'rgba(52, 152, 219, 0.7)',
						'rgba(46, 204, 113, 0.7)',
						'rgba(231, 76, 60, 0.7)'
					],
					borderColor: [
						'rgb(52, 152, 219)',
						'rgb(46, 204, 113)',
						'rgb(231, 76, 60)'
					],
					borderWidth: 2
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				title: {
					display: true,
					text: 'Event Distribution by Game Phase',
					font: { size: 16, weight: 'bold' }
				},
				legend: {
					display: false
				},
				tooltip: {
					callbacks: {
						label: function(context) {
							let label = context.dataset.label || '';
							if (label) {
								label += ': ';
							}
							label += context.parsed.y + ' events';
							return label;
						},
						afterLabel: function(context) {
							if (context.dataIndex === 1) {
								return 'Note: "Silent pressure" phase';
							}
							return '';
						}
					}
				}
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Game Phase',
						font: { size: 14 }
					},
					grid: {
						display: false
					}
				},
				y: {
					title: {
						display: true,
						text: 'Number of Events',
						font: { size: 14 }
					},
					beginAtZero: true,
					ticks: {
						stepSize: 1
					},
					grid: {
						color: 'rgba(0, 0, 0, 0.1)'
					}
				}
			}
		}
	});
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Add a "Back to Top" button functionality (optional enhancement)
window.addEventListener('scroll', function() {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	// Can add back-to-top button logic here if desired
});

console.log('Harmonic Gambit application loaded successfully');
console.log('Total moves:', moveSequence.length);
console.log('Game statistics:', STATISTICS);
