import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isPlayerOTurn, setIsPlayerOTurn] = useState(true);
  const [message, setMessage] = useState<string>('');
  const [gameOver, setGameOver] = useState(false);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsPlayerOTurn(true);
    setMessage('');
    setGameOver(false);
    setPlayerOMoves([]);
    setPlayerXMoves([]);
  };

  const handlePress = (index: number) => {
    if (board[index] !== '' || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = 'O';
    setBoard(newBoard);

    const newPlayerOMoves = [...playerOMoves, index];
    setPlayerOMoves(newPlayerOMoves);

    const winner = checkWinner(newPlayerOMoves);
    if (winner) {
      setMessage("Player O Wins!");
      setGameOver(true);
      Alert.alert("Game Over", "Player O Wins!");
      return;
    }

    if (newBoard.every(cell => cell !== '')) {
      setMessage('Game was a Draw.');
      setGameOver(true);
      Alert.alert("Game Over", "Game was a Draw.");
      return;
    }

    setIsPlayerOTurn(false);
    setTimeout(() => computerTurn(newBoard), 500);
  };

  const computerTurn = (currentBoard: string[]) => {
    const emptyCells = currentBoard.map((cell, idx) => (cell === '' ? idx : null)).filter(idx => idx !== null) as number[];
    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    const newBoard = [...currentBoard];
    newBoard[randomIndex] = 'X';
    setBoard(newBoard);

    const newPlayerXMoves = [...playerXMoves, randomIndex];
    setPlayerXMoves(newPlayerXMoves);

    const winner = checkWinner(newPlayerXMoves);
    if (winner) {
      setMessage("Player X Wins!");
      setGameOver(true);
      Alert.alert("Game Over", "Player X Wins!");
      return;
    }

    if (newBoard.every(cell => cell !== '')) {
      setMessage('Game was a Draw.');
      setGameOver(true);
      Alert.alert("Game Over", "Game was a Draw.");
      return;
    }

    setIsPlayerOTurn(true);
  };

  const checkWinner = (moves: number[]): boolean => {
    return winPatterns.some(pattern => pattern.every(index => moves.includes(index)));
  };

  const renderCell = (index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.cell, board[index] && styles.disabledCell]}
      onPress={() => handlePress(index)}
    >
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.turn}>
        {gameOver ? message : isPlayerOTurn ? "Player O's turn" : "Player X's turn"}
      </Text>
      <View style={styles.board}>{board.map((_, idx) => renderCell(idx))}</View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  turn: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  disabledCell: {
    backgroundColor: '#ddd',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicTacToe;
