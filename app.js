// Harmonic Gambit - Main Application Logic

// Language switching function
function switchLanguage(lang) {
	// Update body class
	document.body.className = 'lang-' + lang;
	
	// Update button states
	document.querySelectorAll('.lang-btn').forEach(btn => {
		btn.classList.remove('active');
	});
	document.getElementById('btn-' + lang).classList.add('active');
	
	// Update HTML lang attribute
	document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
	
	// Save preference to localStorage
	localStorage.setItem('preferredLanguage', lang);
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	// Check for saved language preference
	const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
	switchLanguage(savedLang);
	
	initializeCharts();
});

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
console.log('Game statistics:', STATISTICS);
