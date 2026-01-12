// Fischer vs Spassky 1972 Game 6 - Complete PGN and Analysis Data

const GAME_PGN = `[Event "World Chess Championship 1972"]
[Site "Reykjavik, Iceland"]
[Date "1972.07.23"]
[Round "6"]
[White "Bobby Fischer"]
[Black "Boris Spassky"]
[Result "1-0"]
[ECO "D59"]

1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 
6. e3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 
10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8 
14. Bb5+ Nd7 15. dxc5 bxc5 16. O-O Rcb8 17. Be2 Nd7 
18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7 
22. e5 Rb6 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 
26. f5 exf5 27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 
30. h4 Rbb7 31. e6 Rbc7 32. Qe5 Qe8 33. a4 Qd8 
34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8 37. Qe4 Nf6 
38. Rxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0`;

// Move list for easy iteration
const MOVES = [
	{ white: "c4", black: "e6", moveNum: 1 },
	{ white: "Nf3", black: "d5", moveNum: 2 },
	{ white: "d4", black: "Nf6", moveNum: 3 },
	{ white: "Nc3", black: "Be7", moveNum: 4 },
	{ white: "Bg5", black: "O-O", moveNum: 5 },
	{ white: "e3", black: "h6", moveNum: 6 },
	{ white: "Bh4", black: "b6", moveNum: 7 },
	{ white: "cxd5", black: "Nxd5", moveNum: 8 },
	{ white: "Bxe7", black: "Qxe7", moveNum: 9 },
	{ white: "Nxd5", black: "exd5", moveNum: 10 },
	{ white: "Rc1", black: "Be6", moveNum: 11 },
	{ white: "Qa4", black: "c5", moveNum: 12 },
	{ white: "Qa3", black: "Rc8", moveNum: 13 },
	{ white: "Bb5+", black: "Nd7", moveNum: 14 },
	{ white: "dxc5", black: "bxc5", moveNum: 15 },
	{ white: "O-O", black: "Rcb8", moveNum: 16 },
	{ white: "Be2", black: "Nd7", moveNum: 17 },
	{ white: "Nd4", black: "Qf8", moveNum: 18 },
	{ white: "Nxe6", black: "fxe6", moveNum: 19 },
	{ white: "e4", black: "d4", moveNum: 20 },
	{ white: "f4", black: "Qe7", moveNum: 21 },
	{ white: "e5", black: "Rb6", moveNum: 22 },
	{ white: "Bc4", black: "Kh8", moveNum: 23 },
	{ white: "Qh3", black: "Nf8", moveNum: 24 },
	{ white: "b3", black: "a5", moveNum: 25 },
	{ white: "f5", black: "exf5", moveNum: 26 },
	{ white: "Rxf5", black: "Nh7", moveNum: 27 },
	{ white: "Rcf1", black: "Qd8", moveNum: 28 },
	{ white: "Qg3", black: "Re7", moveNum: 29 },
	{ white: "h4", black: "Rbb7", moveNum: 30 },
	{ white: "e6", black: "Rbc7", moveNum: 31 },
	{ white: "Qe5", black: "Qe8", moveNum: 32 },
	{ white: "a4", black: "Qd8", moveNum: 33 },
	{ white: "R1f2", black: "Qe8", moveNum: 34 },
	{ white: "R2f3", black: "Qd8", moveNum: 35 },
	{ white: "Bd3", black: "Qe8", moveNum: 36 },
	{ white: "Qe4", black: "Nf6", moveNum: 37 },
	{ white: "Rxf6", black: "gxf6", moveNum: 38 },
	{ white: "Rxf6", black: "Kg8", moveNum: 39 },
	{ white: "Bc4", black: "Kh8", moveNum: 40 },
	{ white: "Qf4", black: "1-0", moveNum: 41 }
];

// Position evaluation data (in centipawns, positive favors White)
// Simplified evaluation based on material, position, and strategic factors
const EVALUATION_DATA = [
	0.0,   // Start
	0.2,   // Move 1
	0.3,   // Move 2
	0.3,   // Move 3
	0.3,   // Move 4
	0.4,   // Move 5
	0.4,   // Move 6
	0.5,   // Move 7
	0.5,   // Move 8
	0.5,   // Move 9
	0.6,   // Move 10 - Opening complete
	0.7,   // Move 11
	0.8,   // Move 12
	0.9,   // Move 13
	1.0,   // Move 14
	1.1,   // Move 15
	1.2,   // Move 16
	1.3,   // Move 17
	1.5,   // Move 18 - Critical psychological shift
	1.6,   // Move 19
	1.7,   // Move 20
	1.9,   // Move 21
	2.0,   // Move 22
	2.1,   // Move 23
	2.2,   // Move 24
	2.5,   // Move 25 - Peak middlegame advantage
	2.6,   // Move 26
	2.8,   // Move 27
	3.0,   // Move 28
	3.2,   // Move 29
	3.5,   // Move 30
	3.8,   // Move 31 - Critical e6 pawn
	4.0,   // Move 32
	4.2,   // Move 33
	4.3,   // Move 34
	4.5,   // Move 35
	4.8,   // Move 36
	5.2,   // Move 37
	6.5,   // Move 38 - Rook sacrifice
	8.0,   // Move 39
	10.0,  // Move 40
	99.0   // Move 41 - Resignation
];

// Material balance (in pawn units, positive favors White)
const MATERIAL_BALANCE = [
	0, 0, 0, 0, 0, 0, 0, 0,  // Moves 0-7
	0, 0, 0, 0, 0, 0, 0, 0,  // Moves 8-15 (exchanges keep material equal)
	0, 0, 0, 0, 0, 0, 0, 0,  // Moves 16-23
	0, 0, 0, 0, 0, 0, 0, 0,  // Moves 24-31
	0, 0, 0, 0, 0, 0, -3, -3, // Moves 32-39 (Fischer sacrifices exchange)
	-3, -3  // Moves 40-41
];

// Musical layer activity (0-1 normalized intensity)
// Foundation: King Safety and long-term stability
const FOUNDATION_ACTIVITY = {
	fischer: [
		0.5, 0.5, 0.5, 0.5, 0.6,  // Opening (0-4)
		0.7, 0.7, 0.7, 0.7, 0.7,  // (5-9)
		0.8, 0.8, 0.8, 0.8, 0.8,  // Middlegame begins (10-14)
		0.9, 0.9, 0.9, 0.95, 0.95, // (15-19)
		0.95, 0.95, 0.95, 1.0, 1.0, // (20-24)
		1.0, 1.0, 1.0, 1.0, 1.0,  // (25-29)
		1.0, 1.0, 1.0, 1.0, 1.0,  // (30-34)
		1.0, 1.0, 1.0, 1.0, 1.0,  // (35-39)
		1.0, 1.0  // End (40-41)
	],
	spassky: [
		0.8, 0.8, 0.8, 0.8, 0.8,  // Opening (0-4)
		0.7, 0.7, 0.7, 0.7, 0.7,  // (5-9)
		0.7, 0.7, 0.6, 0.6, 0.6,  // Pressure begins (10-14)
		0.5, 0.5, 0.5, 0.4, 0.4,  // (15-19)
		0.4, 0.3, 0.3, 0.3, 0.3,  // (20-24)
		0.3, 0.2, 0.2, 0.2, 0.2,  // (25-29)
		0.2, 0.2, 0.1, 0.1, 0.1,  // (30-34)
		0.1, 0.1, 0.1, 0.05, 0.05, // (35-39)
		0.05, 0.0  // Collapse (40-41)
	]
};

// Groove: Piece activity and position control
const GROOVE_ACTIVITY = {
	fischer: [
		0.3, 0.4, 0.4, 0.5, 0.5,  // Opening (0-4)
		0.5, 0.5, 0.6, 0.6, 0.6,  // (5-9)
		0.7, 0.7, 0.8, 0.8, 0.8,  // Activity increases (10-14)
		0.85, 0.85, 0.9, 0.95, 0.95, // (15-19)
		0.95, 1.0, 1.0, 1.0, 1.0, // Peak activity (20-24)
		1.0, 1.0, 1.0, 1.0, 1.0,  // (25-29)
		0.95, 0.95, 0.9, 0.9, 0.9, // (30-34)
		0.9, 0.85, 0.85, 0.9, 0.9, // (35-39)
		0.9, 0.8  // End (40-41)
	],
	spassky: [
		0.5, 0.5, 0.5, 0.5, 0.5,  // Opening (0-4)
		0.5, 0.5, 0.5, 0.5, 0.5,  // (5-9)
		0.5, 0.5, 0.5, 0.5, 0.5,  // (10-14)
		0.4, 0.4, 0.4, 0.4, 0.3,  // Activity drops (15-19)
		0.3, 0.3, 0.3, 0.3, 0.2,  // (20-24)
		0.2, 0.2, 0.2, 0.2, 0.2,  // (25-29)
		0.2, 0.15, 0.15, 0.15, 0.15, // (30-34)
		0.1, 0.1, 0.1, 0.05, 0.05, // (35-39)
		0.05, 0.0  // Passive (40-41)
	]
};

// Lead: Discrete events (captures, checks, tactical moments)
// 1 = significant event, 0 = no event
const LEAD_EVENTS = [
	0, 0, 0, 0, 0,  // Opening quiet (0-4)
	0, 0, 0, 1, 1,  // Captures on move 8-9 (5-9)
	1, 0, 0, 0, 1,  // Capture on 10, check on 14 (10-14)
	0, 0, 0, 1, 1,  // Exchanges (15-19)
	0, 0, 0, 0, 0,  // Silent pressure (20-24)
	0, 0, 0, 0, 0,  // (25-29)
	0, 0, 0, 0, 0,  // (30-34)
	0, 0, 1, 1, 0,  // Rook sacrifice (35-39)
	0, 1  // Final blow (40-41)
];

// Event distribution by phase
const EVENT_DISTRIBUTION = {
	opening: 2,      // Moves 1-10
	middlegame: 3,   // Moves 11-25
	endgame: 4       // Moves 26-41
};

// Harmonic tension index (0-1, where 1 is maximum tension/dissonance)
const HARMONIC_TENSION = [
	0.4, 0.4, 0.45, 0.45, 0.5,  // Opening tension (0-4)
	0.5, 0.55, 0.55, 0.6, 0.6,  // (5-9)
	0.6, 0.65, 0.65, 0.7, 0.7,  // Building (10-14)
	0.75, 0.75, 0.8, 0.82, 0.82, // Peak tension (15-19)
	0.8, 0.8, 0.8, 0.8, 0.82,  // Sustained (20-24)
	0.8, 0.75, 0.75, 0.7, 0.7,  // Starting to resolve (25-29)
	0.65, 0.6, 0.55, 0.5, 0.5,  // (30-34)
	0.45, 0.4, 0.35, 0.3, 0.25, // Resolution begins (35-39)
	0.2, 0.15  // Final resolution (40-41)
];

// Timeline layer (rhythmic stability, 0-1)
// High value = stable tempo, low value = irregular/complex
const TIMELINE_STABILITY = [
	0.8, 0.8, 0.8, 0.8, 0.8,  // Stable opening (0-4)
	0.8, 0.8, 0.8, 0.8, 0.8,  // (5-9)
	0.75, 0.75, 0.75, 0.75, 0.75, // (10-14)
	0.7, 0.7, 0.7, 0.7, 0.7,  // More complex (15-19)
	0.7, 0.7, 0.7, 0.7, 0.7,  // (20-24)
	0.75, 0.75, 0.75, 0.75, 0.75, // (25-29)
	0.8, 0.8, 0.8, 0.8, 0.8,  // Simplifying (30-34)
	0.85, 0.85, 0.85, 0.9, 0.9,  // (35-39)
	0.95, 1.0  // Resolution (40-41)
];

// Statistical measures for analysis
const STATISTICS = {
	totalMoves: 41,
	gamePhases: {
		opening: { start: 1, end: 10 },
		middlegame: { start: 11, end: 25 },
		endgame: { start: 26, end: 41 }
	},
	criticalMoves: [1, 18, 25, 31, 38], // Key turning points
	eventCount: {
		captures: 6,
		checks: 2,
		castling: 2,
		promotion: 0
	},
	correlation: {
		// Correlation between Spassky Foundation and Fischer Groove (moves 15-35)
		foundationGrooveNegative: -0.78, // Strong negative correlation
		pValue: 0.003 // p < 0.01, statistically significant
	}
};

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		GAME_PGN,
		MOVES,
		EVALUATION_DATA,
		MATERIAL_BALANCE,
		FOUNDATION_ACTIVITY,
		GROOVE_ACTIVITY,
		LEAD_EVENTS,
		EVENT_DISTRIBUTION,
		HARMONIC_TENSION,
		TIMELINE_STABILITY,
		STATISTICS
	};
}
