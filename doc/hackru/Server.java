package hackru;

import java.net.Socket;

import javax.swing.Action;
import javax.xml.crypto.Data;

public abstract class Server {
	public abstract void onConnection(Socket socket);

	public abstract void startGame();

	public abstract void endGame();

	public abstract void signalAction(Socket socket, Action action);

	public abstract void updateScore(Data result);

	public abstract void broadCastScore();

	public abstract void collectVotes();

	public abstract void processVotes();

	public abstract void changeSong();
}
